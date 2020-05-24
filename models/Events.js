let mongoose = require('mongoose');
let Comments = require('./Comments.js');
let Schema = mongoose.Schema;

let eventsSchema = new Schema({
    title:      { type: String, required: true },
    description:   { type: String, required: true },
    location:    { type: String, required: true },
    date:     { type: Date, default: Date.now, required: true },
    createDate: { type: Date, default: Date.now,required: true },
    score:      { type: Number, default: 0, required: false },
    type:     { type: String, required: true },
    assistants: [{type: String , required: true }],//[String],
    comments: { type: Number, default: 0, required: false },
    image: { type: String, default:'https://greenmindbucket.s3.sa-east-1.amazonaws.com/image_1585670384567.png',required: true },
    /*comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments', default :[]}],*/
    owner: { type: String, required: true }
});

let Events = mongoose.model('Events', eventsSchema);

module.exports = Events;
