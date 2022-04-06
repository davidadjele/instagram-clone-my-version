const mongoose = require('mongoose')
let Schema = mongoose.Schema
const userSchema = new mongoose.Schema(
    {
        username: {type:String, required:true, unique:true},
        name: {type:String,default:''},
        email: {type:String, required:true, unique:true},
        password: {type:String, required:true},
        numberOfFollowers: [{type: Schema.Types.ObjectId, ref: 'User'}],
        numberOfFollowing: [{type: Schema.Types.ObjectId, ref: 'User'}],
        bio:{type:String,default:''},
        location:{type:String,default:''},
        profileImage:{ data: Buffer, contentType: String },
        gender:{type:String,default:''},
        isAdmin: {
            type:Boolean,
            default:false
        }
    }, 
    {timestamps:true}
);

module.exports = mongoose.model('User', userSchema)