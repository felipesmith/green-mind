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

unassistEvent = async (eventId, username) => {
    let user = await Users.findOne({username});
    console.log(user.events);
    console.log(user);
    let index = user.events.indexOf(eventId);
    if (index > -1) {
      user.events.splice(index, 1);
    }
    await user.save();
    return { user };
};

followUser = async (user, owner) => {
    console.log(user);
    console.log(owner);
    let username = user;
    let user1 = await Users.findOne({username});
    username = owner;
    let user2 = await Users.findOne({username});
    console.log(user2);
    console.log(user2.followers);
    console.log(user1);
    console.log(user1.follows);
    user1.follows.push(user2.username);
    await user1.save();
    user2.followers.push(user1.username);
    await user2.save();
    return {user1};
};

unfollowUser = async (user, owner) => {
    console.log(user);
    console.log(owner);
    let username = user;
    let user1 = await Users.findOne({username});
    username = owner;
    let user2 = await Users.findOne({username});
    console.log(user2);
    console.log(user2.followers);
    console.log(user1);
    console.log(user1.follows);
    let index = user1.follows.indexOf(user2.username);
    if (index > -1) {
      user1.follows.splice(index, 1);
    }
    await user1.save();
    index = user2.followers.indexOf(user1.username);
    if (index > -1) {
      user2.followers.splice(index, 1);
    }
    await user2.save();
    console.log(user2.followers);
    console.log(user1.follows);
    return {user1};
};


module.exports =  { allUsers, createUser, logInUser, changePasswordUser, searchUser,assistEvent,updatePhoto,searchUserById };
