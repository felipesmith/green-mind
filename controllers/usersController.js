let Users   = require("../models/Users");
let bcrypt  = require('bcryptjs');
let salt    = bcrypt.genSaltSync(10);
let multer = require("multer");


allUsers = async (req, res) => {
    let users = await Users.find({});
    return users;
};

let mongoose = require('mongoose');
createUser = async (username, userpass, age, gender, name, surname, location,createDate, plastic, glass, paperboard, aluminium, events,image) => {
    let password = bcrypt.hashSync(userpass, salt);
    /*let createDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');*/
    let user = Users({username, password, age, gender, name, surname, location, createDate, plastic, glass, paperboard, aluminium, events,image });
    await user.save();
    return { username };
};

logInUser = async (username, password) => {
    let user = await Users.findOne({username});
    return { User: bcrypt.compareSync(password, user.password) };
};

searchUser = async (username) => {
    let user = await Users.find({username}).sort({ '_id': -1 });
    console.log(user);
    return user;
}

searchUserById = async (userId) => {
    let user = await Users.find({ userId }).sort({ '_id': -1 });
    console.log(user);
    return user;
};


changePasswordUser = async (username, password) => {
    let user = await Users.findOne({username});
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    return { username };
};

updatePhoto = async(username,image)=>{
  let user = await Users.findOne({username});
  console.log("Esta es la imagen"+image);
  console.log("Este es el user" +user);
  user.image = image;
  await user.save();
  return {username};
};

assistEvent = async (eventId, username) => {
    let user = await Users.findOne({username})
    console.log(user.events);
    console.log(user);
    user.events.push(eventId);
    await user.save();
    return { user };
};


module.exports =  { allUsers, createUser, logInUser, changePasswordUser, searchUser,assistEvent,updatePhoto,searchUserById };
