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
    createDate: { type: Date, default: Date.now,required: true }
});

let Users = mongoose.model('Users', userSchema);

module.exports = Users;
