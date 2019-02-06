const mongoose = require('mongoose');
const schema = mongoose.Schema;

const depenseFixeParDateSchema = new schema({
    nMois: {
        type: Number,
        required: [true, 'Le mois est requis'],
    },
    sAnnee: {
        type: Number,
        required: [true, 'L\'année est requise'],
    },
    odepenseFixe: {
        type: schema.Types.ObjectId,
        ref: 'depenseFixe',
        required: [true, 'La dépense est requise']
    },
    bPaye: {
        type: Boolean,
        default: false
    }
});

depenseFixeParDateSchema.index({nMois: 1, sAnnee: 1, odepenseFixe: 1}, {unique: true});

module.exports = typeDepense = mongoose.model('depenseFixeParDate',depenseFixeParDateSchema,'depenseFixeParDate_COLL');