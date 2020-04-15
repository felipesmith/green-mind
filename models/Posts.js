let mongoose = require('mongoose');
var Comments = require('./Comments.js');

let Schema = mongoose.Schema;

let postsSchema = new Schema({
    title:      { type: String, required: true },
    description:   { type: String, required: true },
    createDate:     { type: Date, default: Date.now, required: true },
    score:    { type: Number,default: 0, required: false },
    type:     { type: String, required: true },
    owner:     { type: String, required: true },
    image: { type: String, default:'https://greenmindbucket.s3.sa-east-1.amazonaws.com/image_1585670384567.png',required: true },
    comments: [String]
    //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }]
});

let Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
