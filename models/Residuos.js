let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let residuosSchema = new Schema({
    plastic:      { type: String, required: true },
    glass:   { type: String, required: true },
    paperboard:    { type: String, required: true },
    aluminium:     { type: String, required: true },
    eventID:      { type: String, required: true },
    userID:     { type: String, required: true }
});

let Residuos = mongoose.model('Residuos', residuosSchema);

module.exports = Residuos;
