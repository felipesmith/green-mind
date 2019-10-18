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
    events: [String]
});

let Users = mongoose.model('Users', userSchema);

module.exports = Users;
