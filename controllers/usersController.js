let Users   = require("../models/Users");
let bcrypt  = require('bcryptjs');
let salt    = bcrypt.genSaltSync(10);

allUsers = async (req, res) => {
    let users = await Users.find({});
    return users;
};

createUser = async (username, userpass) => {
    let password = bcrypt.hashSync(userpass, salt);
    let user = Users({username, password});
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