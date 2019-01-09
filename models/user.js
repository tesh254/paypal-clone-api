const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    phoneNumber:{
        type:String,
        required:true
    }
});

userSchema.set('toJSON', { virtuals: true})

module.exports = mongoose.model('User', userSchema);
