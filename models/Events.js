let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let eventsSchema = new Schema({
    title:      { type: String, required: true },
    description:   { type: String, required: true },
    location:    { type: String, required: true },
    date:     { type: Date, required: true },
    score:      { type: Number, required: true },
    type:     { type: String, required: true }
});

let Events = mongoose.model('Events', eventsSchema);

module.exports = Events;
