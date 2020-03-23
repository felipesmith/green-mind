let router = require('express').Router();
let multer = require('multer');
let path = require('path');
let Resize = require('../Resize');
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


router.post('/post', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, '/public/images');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});

module.exports = router;
