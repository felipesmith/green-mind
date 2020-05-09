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

searchUserById = async (_id ) => {
    let user = await Users.find({_id}).sort({ '_id': -1 });
    console.log(user);
    return user;
}


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
  console.log("Este es el user actualiza2" +user);
  await user.save();
  return {username};
};

assistEvent = async (eventId, username) => {
    let user = await Users.findOne({username});
    console.log(user.events);
    console.log(user);
    user.events.push(eventId);
    await user.save();
    return { user };
};

followUser = async (username, _id) => {
  console.log(username);
  console.log(_id);
    let user = await Users.findOne({_id});
    let user2 = await Users.findOne({username});
    console.log(user);
    console.log(user.follows);
    console.log(user2);
    console.log(user2.followers);
    user.follows.push(username);
    await user.save();
    user2.followers.push(_id);
    await user.save();
    return {user};
};


module.exports =  { allUsers, createUser, logInUser, changePasswordUser, searchUser,assistEvent,updatePhoto,searchUserById };
