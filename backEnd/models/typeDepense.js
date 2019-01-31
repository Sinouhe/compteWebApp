const mongoose = require('mongoose');
const schema = mongoose.Schema;

const typeDepenseSchema = new schema({
    sNom: {
        type: String,
        required: [true, 'Le nom est requis'],
        unique: true,
        dropDups: true
    },
    sDescription: {
        type: String
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = typeDepense = mongoose.model('typeDepense',typeDepenseSchema,'TypeDepense_COLL');