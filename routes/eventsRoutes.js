let router = require('express').Router();

let { allEvents,
    createEvent,
    eventsByUser, /*Revisar el concepto*/
    eventsByType,
    eventsByLocation,
    eventsByDate} = require('../controllers/eventsController');


router.get('/all', async function(req,res) {
    try {
        let events = await allEvents();
        res.json(events);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/create', async function(req,res) {
    try {
        let { title, description, location, date, score, type, assistants, comments, owner} = req.body;
        let created = await createEvent(title, description, location, date, score, type, assistants,comments, owner);
        res.json(created);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/date/:date', async function(req, res) {
    try {
        let events = await commentsByTitle(req.params.date);
        res.json(events);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/type/:type', async function(req, res) {
    try {
        let events = await commentsByType(req.params.type);
        res.json(events);
    }
    catch (error) {
        console.log(error);
    }
});


router.get('/location/:location', async function(req, res) {
    try {
        let events = await commentsByLocation(req.params.location);
        res.json(events);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/event/:_id', async function(req, res) {
    try {
        let event = await searchEvent(req.params._id);
        console.log(event);
        res.json(event);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/assistants', async function(req, res) {
    try {
        let status = await assistUser(req.body.userId, req.body._id);
        res.json(status);
    }
    catch (error) {
        console.log(error);
    }
});






module.exports = router;
