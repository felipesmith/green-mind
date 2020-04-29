let router = require('express').Router();
let multer = require('multer');
const bucket = 'greenmindbucket';
let fs = require("fs");
require('dotenv').config();
const upload = multer({
  dest: "app/temp"
});
let path = require('path');
const AWS = require('aws-sdk');
//const envJson = require('../process.env');
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});
let { allEvents,
    createEvent,
    eventsByUser, /*Revisar el concepto*/
    eventsByType,
    eventsByLocation,
    eventsByDate,
  updatePhoto} = require('../controllers/eventsController');


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
        let { title, description, location, date,createDate, score, type, assistants, comments, owner} = req.body;
        let created = await createEvent(title, description, location, date,createDate, score, type, assistants,comments, owner);
        res.json(created);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/date/:date', async function(req, res) {
    try {
        let events = await eventsByDate(req.params.date);
        res.json(events);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/type/:type', async function(req, res) {
    try {
        let events = await eventsByType(req.params.type);
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

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

router.post(
  "/images/upload",
  upload.any(),
  (req, res) => {

    const tempPath = req.files[0].path;
    //const tempPath = req.body.formData.file.path;
    // const targetPath = path.join(__dirname, "../uploads/image.png");
      const targetPath = `image_${new Date().getTime()}.png`;
      s3.putObject({
  Bucket: bucket,
  Body: fs.readFileSync(tempPath),
  Key: targetPath
})
  .promise()
  .then(response => {

    console.log(response);
    console.log(
      `The URL is ${s3.getSignedUrl('getObject', { Bucket: bucket, Key: targetPath }).split('?')[0]}`
    );
    console.log(req.body.event);
    let status =  updatePhoto(req.body.event, `${s3.getSignedUrl('getObject', { Bucket: bucket, Key: targetPath }).split('?')[0]}`);
    res
      .status(200)
      .contentType("text/plain")
      .json(status)
      .end();
  })
  .catch(err => {
    console.log('failed:', err)
  })
  }
);






module.exports = router;
