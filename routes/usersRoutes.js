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
let {allUsers,
    createUser,
    logInUser,
    changePasswordUser,
    updatePhoto
    } = require('../controllers/usersController');

router.get('/all', async function(req, res) {
    try {
        let Users = await allUsers();
        res.json(Users);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/create', async function(req,res) {
    try {

        let created = await createUser(req.body.username, req.body.password, req.body.age, req.body.gender, req.body.name, req.body.surname, req.body.location, req.body.createDate, req.body.plastic, req.body.glass, req.body.paperboard, req.body.aluminium, req.body.events,req.body.image );
        res.json(created);
    }
    catch (error) {
        console.log(error);
    }
});


router.post('/login', async function(req, res) {
    try {
        let status = await logInUser(req.body.username, req.body.password);
        res.json(status);
        console.log(__dirname);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/user/:user', async function(req, res) {
    try {
        let user = await searchUser(req.params.user);
        console.log(user);
        res.json(user);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/assist', async function(req, res) {
    try {
        let status = await assistEvent(req.body.eventId, req.body.username);
        res.json(status);
    }
    catch (error) {
        console.log(error);
    }
});


router.post('/update', async function(req, res) {
    try {
        let status = await changePasswordUser(req.body.username, req.body.password);
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
// router.post(
//   "/images/upload",
//   upload.single("profile_image"),
//   async function(req, res){
//     const tempPath = req.file.path;
//     // const targetPath = path.join(__dirname, "../uploads/image.png");
//       const targetPath = `image_${new Date().getTime()}.png`;
//       s3.putObject({
//   Bucket: bucket,
//   Body: fs.readFileSync(tempPath),
//   Key: targetPath
// })
//   .promise()
//   .then(response => {
//     console.log(response);
//     console.log(
//       `The URL is ${s3.getSignedUrl('getObject', { Bucket: bucket, Key: targetPath })}`
//     )
//     let status =   changePasswordUser(req.body.username, `${s3.getSignedUrl('getObject', { Bucket: bucket, Key: targetPath })}`);
//     res
//       .status(200)
//       .contentType("text/plain")
//       .json(status)
//       .end();
//   })
//   .catch(err => {
//     console.log('failed:', err)
//   })
//   }
// );
router.post(
  "/images/upload",
  upload.single("profile_image"),
  (req, res) => {
    const tempPath = req.file.path;
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
      `The URL is ${s3.getSignedUrl('getObject', { Bucket: bucket, Key: targetPath })}`
    )
    let status =  updatePhoto(req.body.username, `${s3.getSignedUrl('getObject', { Bucket: bucket, Key: targetPath })}`);
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
