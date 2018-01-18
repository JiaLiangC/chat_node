var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    gender: {type: String,enum: ['m','f','x']},
    bio: String,
    status: Boolean
});

var User = mongoose.model('User',UserSchema);
UserSchema.methods.validatePassword = function(pwd){
    console.log('validate pwd');
};
module.exports = User;