let router = require('express').Router();

let { allResiduos,
    createResiduo,
    residuosByUser,
    residuosByEvent} = require('../controllers/residuosController');


router.get('/all', async function(req,res) {
    try {
        let residuos = await allResiduos();
        res.json(residuos);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/create', async function(req,res) {
    try {
        let {plastic, glass, paperboard, aluminium, eventID, userID} = req.body;
        let created = await createresiduo(plastic, glass, paperboard, aluminium, eventID, userID);
        res.json(created);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/user/:user', async function(req, res) {
    try {
        let residuos = await commentsByUser(req.params.user);
        res.json(residuos);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/event/:event', async function(req, res) {
    try {
        let residuos = await commentsByType(req.params.event);
        res.json(residuos);
    }
    catch (error) {
        console.log(error);
    }
});



module.exports = router;
