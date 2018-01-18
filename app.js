var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var webRouter = require('./web_router')
var app = express();

//web_router.js中管理
app.use('/', webRouter);

// app.get('/',function(req,res){
//     res.send("sssss");
// });

http.listen(3000,function(){
    console.log("server started");
})

// 在线用户
let onlineUsers = {};
// 用户数
let onlineUsersCount = 0;

io.on('connection', function(socket) {
    console.log('user connected');

    socket.on('login', function(obj) {
        socket.name = obj.userId;
        if(!onlineUsers.hasOwnProperty(obj.userId)) {
            onlineUsers[obj.userId] = obj.userName;
            onlineUsersCount += 1;
        }
        // 发给所有客户端
        io.emit('login', {onlineUsers: onlineUsers, onlineUsersCount: onlineUsersCount, user: obj});
        console.log(obj.userName + "  加入了聊天室");
    });

     socket.on('disconnect', function(){
        // 将退出的用户从在线列表中删除
        let obj = null;
        if(onlineUsers.hasOwnProperty(socket.name)) {
            obj = {userId: socket.name, userName: onlineUsers[socket.name]}
            delete onlineUsers[socket.name];
            onlineUsersCount -= 1;
            console.log(obj.userName + '退出了聊天室');
        }
        io.emit('logout', {onlineUsers: onlineUsers, onlineUsersCount: onlineUsersCount, user: obj});
     });

     socket.on('chatMessage', function() {
     	io.emit('chatMessage', {onlineUsers: onlineUsers, onlineUsersCount: onlineUsersCount});
     });

     socket.on('sendMessage',function(obj){
        console.log(obj);
        io.emit('sendMessage', {onlineUsers: onlineUsers, onlineUsersCount: onlineUsersCount, content: obj.content,userName: obj.userName}); 
     });
});
