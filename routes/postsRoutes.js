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
        let { title, description, date, score, type, owner} = req.body;
        let created = await createPost(title, description, date, score, type,owner);
        res.json(created);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/date/:date', async function(req, res) {
    try {
        let posts = await commentsByTitle(req.params.date);
        res.json(posts);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/type/:type', async function(req, res) {
    try {
        let posts = await commentsByType(req.params.type);
        res.json(posts);
    }
    catch (error) {
        console.log(error);
    }
});



module.exports = router;
