let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let postsSchema = new Schema({
    title:      { type: String, required: true },
    description:   { type: String, required: true },
    date:     { type: Date, default: Date.now, required: true },
    score:    { type: Number, required: true },
    type:     { type: String, required: true },
    owner:     { type: String, required: true }
});

let Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
