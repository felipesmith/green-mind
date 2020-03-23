let router = require('express').Router();
let multer = require('multer');
const bucket = 'greenmindbucket';
let fs = require("fs");
const upload = multer({
  dest: "app/temp"
});
let path = require('path');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: 'AKIARWULITKAUL5X7XTC',
  secretAccessKey: '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'
});
let {allUsers,
    createUser,
    logInUser,
    changePasswordUser
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

        let created = await createUser(req.body.username, req.body.password, req.body.age, req.body.gender, req.body.name, req.body.surname, req.body.location, req.body.createDate, req.body.plastic, req.body.glass, req.body.paperboard, req.body.aluminium, req.body.events );
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

router.post(
  "/images/upload",
  upload.single("profile_image"),
  (req, res) => {
    const tempPath = req.file.path;
    // const targetPath = path.join(__dirname, "../uploads/image.png");
      const targetPath = "image_${new Date().getTime()}.png";
      this.s3.putObject({
  Bucket: this.bucket,
  Body: fs.readFileSync(tempPath),
  Key: targetPath
})
  .promise()
  .then(response => {
    console.log(response);
    console.log(
      `The URL is ${s3.getSignedUrl('getObject', { Bucket: this.bucket, Key: targetPath })}`
    )
    res
      .status(200)
      .contentType("text/plain")
      .end();
  })
  .catch(err => {
    console.log('failed:', err)
  })
    // if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    //   fs.rename(tempPath, targetPath, err => {
    //     if (err) return handleError(err, res);
    //
        // res
        //   .status(200)
        //   .contentType("text/plain")
        //   .end();
    //   });
    // } else {
    //   fs.unlink(tempPath, err => {
    //     if (err) return handleError(err, res);
    //
    //     res
    //       .status(403)
    //       .contentType("text/plain")
    //       .end("Only .png files are allowed!");
    //   });
    // }
  }
);



module.exports = router;
