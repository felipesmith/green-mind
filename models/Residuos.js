let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let residuosSchema = new Schema({
    plastic:      { type: Number, default:0, required: true },
    glass:   { type: Number, default:0, required: true },
    paperboard:    { type: Number, default:0, required: true },
    aluminium:     { type: Number, default:0, required: true },
    eventID:      { type: String, required: true },
    userID:     { type: String, required: true }
});

let Residuos = mongoose.model('Residuos', residuosSchema);

module.exports = Residuos;
