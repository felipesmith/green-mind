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
        let { title, description, location, date, score, type} = req.body;
        let created = await createEvent(title, description, location, date, score, type, assistants);
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

module.exports = router;
