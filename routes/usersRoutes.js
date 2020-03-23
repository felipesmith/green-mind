let router = require('express').Router();
let multer = require('multer');
const upload = multer({
  dest: "app/temp"
});
let path = require('path');
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

router.post(
  "/images/upload",
  upload.single("profile_image"),
  (req, res) => {
    const tempPath = req.file.path;
    // const targetPath = path.join(__dirname, "../uploads/image.png");
      const targetPath = "app/uploads/image.png";
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);



module.exports = router;
