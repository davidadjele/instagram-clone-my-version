const mongoose = require('mongoose')
let Schema = mongoose.Schema

const UserPostSchema = new mongoose.Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        img:{type:String, require: true},
        desc:{type:String},
    }, 
    {timestamps:true}
);

module.exports = mongoose.model('UserPost', UserPostSchema)