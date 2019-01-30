const mongoose = require('mongoose');
const schema = mongoose.Schema;

const typeDepenseSchema = new schema({
    nom: {
        type: String,
        required: [true, 'Le nom est requis']
    },
    description: {
        type: String
    }
});

module.exports = typeDepense = mongoose.model('typeDepense',typeDepenseSchema,'TypeDepense_COLL');