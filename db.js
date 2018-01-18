//引用配置文件中的信息
var config = require('config')(__dirname);

//引入mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var db = mongoose.connect(config.mongodb);

db.on('connected',function(){
    console.log('mongo connection open on: ', + config.mongodb);
});

db.on('error', console.error.bind(console, 'connection error:'));