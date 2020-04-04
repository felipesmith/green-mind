let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentsSchema = new Schema({
    title:      { type: String, required: true },
    username:   { type: String, required: true },
    comment:    { type: String, required: true },
    score:      { type: Number, required: true },
    date:     { type: Date, default: Date.now, required: true },
    eventId: { type: String, default:'', required: false },
    postId: { type: String, default:'',required: false },
    userId:{ type: String, default:'',required: true }
});

let Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
