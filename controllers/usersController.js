let Users   = require("../models/Users");
let bcrypt  = require('bcryptjs');
let salt    = bcrypt.genSaltSync(10);

allUsers = async (req, res) => {
    let users = await Users.find({});
    return users;
};

createUser = async (username, userpass, age, gender, name, surname, location,createDate ) => {
    let password = bcrypt.hashSync(userpass, salt);
    /*let createDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');*/
    let user = Users({username, password, age, gender, name, surname, location, createDate});
    await user.save();
    return { username };
};

logInUser = async (username, password) => {
    let user = await Users.findOne({username});
    return { User: bcrypt.compareSync(password, user.password) };
};

changePasswordUser = async (username, password) => {
    let user = await Users.findOne({username});
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    return { username };
};

module.exports =  { allUsers, createUser, logInUser, changePasswordUser };
