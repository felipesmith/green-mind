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
let { allPosts,
    createPost,
    postsByUser, /*Revisar el concepto*/
    postsByType,
    postsByDate,
  updatePhoto} = require('../controllers/postsController');


router.get('/all', async function(req,res) {
    try {
        let posts = await allPosts();
        res.json(posts);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/create', async function(req,res) {
    try {
        let { title, description, createDate, score, type, owner, comments} = req.body;
        let created = await createPost(title, description, createDate, score, type, owner, comments);
        res.json(created);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/date/:createDate', async function(req, res) {
    try {
        let posts = await postsByDate(req.params.createDate);
        res.json(posts);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/type/:type', async function(req, res) {
    try {
        let posts = await postsByType(req.params.type);
        res.json(posts);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/post/:_id', async function(req, res) {
    try {
        let post = await searchPost(req.params._id);
        console.log(post);
        res.json(post);
    }
    catch (error) {
        console.log(error);
    }
});



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
    let status =  updatePhoto(req.body.post, `${s3.getSignedUrl('getObject', { Bucket: bucket, Key: targetPath }).split('?')[0]}`);
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
