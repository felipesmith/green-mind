let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    location: { type: String, required: true },
    createDate: { type: Date, default: Date.now,required: true },
    plastic:      { type: Number, default:0, required: true },
    glass:   { type: Number, default:0, required: true },
    paperboard:    { type: Number, default:0, required: true },
    aluminium:     { type: Number, default:0, required: true },
    events: [{type: String , unique: true }],
    followers:[{type: String, unique: true}],
    follows:[{type: String, unique: true}],
    image: { type: String, default:'https://greenmindbucket.s3.sa-east-1.amazonaws.com/image_1585670384567.png',required: true }
});

let Users = mongoose.model('Users', userSchema);

module.exports = Users;
