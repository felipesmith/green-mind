let Events = require("../models/Events");

allEvents = async () => {
    let events = await Events.find({}).sort({'_id': -1});
    return events;
};

createEvent = async (title, description, location, date, score, type) => {
    let new_event = Events({ title, description, location, date, score, type });
    await new_event.save();
    return { title, description, location, date, score, type };
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

module.exports =  {allEvents, createEvent, eventsByUser, eventsByType, eventsByLocation, eventsByDate};
