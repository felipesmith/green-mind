let router = require('express').Router();

let { allPosts,
    createPost,
    postsByUser, /*Revisar el concepto*/
    postsByType,
    postsByDate} = require('../controllers/postsController');


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



module.exports = router;
