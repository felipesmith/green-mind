let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentsSchema = new Schema({
    title:      { type: String, required: true },
    username:   { type: String, required: true },
    comment:    { type: String, required: true },
    score:      { type: Number, required: true },
    imdbID:     { type: String, required: true }
});

let Comments = mongoose.model('Comments', commentsSchema);  

module.exports = Comments;