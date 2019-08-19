let router = require('express').Router();
let {allUsers,
    createUser,
    logInUser,
    changePasswordUser} = require('../controllers/usersController');

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
        
        let created = await createUser(req.body.username, req.body.password, req.body.age, req.body.gender, req.body.name, req.body.surname);
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

router.post('/update', async function(req, res) {
    try {
        let status = await changePasswordUser(req.body.username, req.body.password);
        res.json(status);
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;
