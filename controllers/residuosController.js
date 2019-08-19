let Residuos   = require("../models/Residuos");

allResiduos = async (req, res) => {
    let residuos = await Residuos.find({});
    return residuos;
};

createResiduo = async (plastic, glass, paperboard, aluminium, eventID, userID ) => {
    let residuo = Residuos({plastic, glass, paperboard, aluminium, eventID, userID });
    await user.save();
    return { username };
};


residuosByUser = async (userID) => {
    let residuos = await Posts.find({userID}).sort({ '_id': -1 });
    return residuos;
}

residuosByEvent = async (event) => {
    let residuos = await Posts.find({eventID}).sort({ '_id': -1 });
    return residuos;
}



module.exports =  { allResiduos, createResiduo, residuosByUser, residuosByEvent };
