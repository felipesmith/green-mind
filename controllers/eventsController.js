let Events = require("../models/Events");
let multer = require("multer");
let mongoose = require('mongoose');

allEvents = async () => {
    let events = await Events.find({}).sort({'_id': -1});
    return events;
};

createEvent = async (title, description, location, date, createDate, score, type, assistants, comments, owner) => {
    let new_event = Events({ title, description, location, date,createDate, score, type, assistants, comments, owner});
    await new_event.save();
    return { new_event};
};

eventsByUser = async (username) => {
    let events = await Events.find({username}).sort({ '_id': -1 });
    return events;
}

eventsByType = async (type) => {
    let events = await Events.find({type}).sort({ '_id': -1 });
    return events;
}

eventsByLocation = async (location) => {
    let events = await Events.find({location}).sort({ '_id': -1 });
    return events;
}

eventsByDate = async (date) => {
    let events = await Events.find({date}).sort({ '_id': -1 });
    return events;
}

searchEvent = async (_id ) => {
    let event = await Events.find({_id}).sort({ '_id': -1 });
    console.log(event);
    return event;
}

updatePhoto = async(_id,image)=>{
  console.log(_id);
  let event = await Events.findOne({_id});
  console.log("Esta es la imagen"+image);
  console.log("Este es el evento" +event);
  event.image = image;
  console.log("Este es el post actualiza3" +event);
  await event.save();
  return {event};
};

assistUser = async (userId, _id) => {
    let event = await Events.findOne({_id})
    console.log(event.assistants);
    console.log(event);
    event.assistants.push(userId);
    await event.save();
    return { event };
};


rankEvents = (events) => {
    let total_score = 0;
    let votes = 0;

    events.forEach(event => {
        total_score += event.score;
        votes++;
    });

    let rating = (votes) ? Math.round(total_score/votes) : null;

    return { rating , votes };
};

module.exports =  {allEvents, createEvent, eventsByUser, eventsByType, eventsByLocation, eventsByDate,searchEvent,assistUser,updatePhoto};
