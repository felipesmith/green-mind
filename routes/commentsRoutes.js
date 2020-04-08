let router = require('express').Router();

let { allComments,
    createComment,
    commentsByTitle,
    commentsByImdbID,
    commentsByUser } = require('../controllers/commentsController');

let {
  searchUser
} = require ('../controllers/usersController');

router.get('/all', async function(req,res) {
    try {
        let comments = await allComments();
        res.json(comments);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/create', async function(req,res) {
    try {
        let { title, username, comment, score, date, eventId, postId, userId} = req.body;
        let created = await createComment(title, username, comment, score, date, eventId, postId, userId);
        res.json(created);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/title/:title', async function(req, res) {
    try {
        let comment = await commentsByTitle(req.params.title);
        res.json(comment);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/eventsId/:eventId', async function(req, res) {
    try {
        let comment = await commentsByEventId(req.params.eventId);
        res.json(comment);
    }
    catch (error) {
        console.log(error);
    }
});


router.get('/postsId/:postId', async function(req, res) {
    try {
        let comment = await commentsByPostId(req.params.postId);
        res.json(comment);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/user/:username', async function(req, res) {
    try {
        let comments = await commentsByUser(req.params.username);
        res.json(comments);
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;
