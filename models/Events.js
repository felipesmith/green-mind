let mongoose = require('mongoose');
var Comments = require('./Comments.js');

let Schema = mongoose.Schema;

let eventsSchema = new Schema({
    title:      { type: String, required: true },
    description:   { type: String, required: true },
    location:    { type: String, required: true },
    date:     { type: Date, default: Date.now, required: true },
    score:      { type: Number, default: 0, required: false },
    type:     { type: String, required: true },
    assistants: [String],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    owner: { type: String, required: true }
});

let Events = mongoose.model('Events', eventsSchema);

module.exports = Events;
