const depenseFixeParDateImport = require('../models/depenseFixeParDate');
const {success, error } = require('../biblio/function');
const userImport = require('../models/user');
const depenseFixeImport = require('../models/depenseFixe');


module.exports = {
    createNew(req, res) {
        console.log(req.query)
        const sUserId = req.query.userId;
        const nMois = req.query._nMois
        const nAnnee = req.query._nAnnee
        if (sUserId && nMois && nAnnee) {
            userImport.findById(userId)
                .then((userResult) => {
                    if (userResult) {
                        depenseFixeImport.find({oUser: userResult})
                            .then((typesDepenseFixeRes) => {
                                let tasks = [];
                                let tabObjetCree = [];
                                for (var depenseFixe in typesDepenseFixeRes) {
                                   oDepenseFixeParDateImport = new depenseFixeParDateImport({ nMois: nMois,
                                                                                              nAnnee: nAnnee,
                                                                                              odepenseFixe: depenseFixe
                                                                                            })
                                    tasks.push(oDepenseFixeParDateImport.save());
                                    tabObjetCree.push(oDepenseFixeParDateImport);

                                }
                                Promise.all(tasks)
                                    .then(() => {
                                        res.send(success('génération effectuée', tabObjetCree));
                                    })
                                    .catch((err) => {
                                        // si erreur field unique
                                        if (err.name === 'MongoError' && err.code === 11000) {
                                            res.send(error('Cette dépense est en doublon', oDepenseFixeParDateImport));
                                        } else {
                                            res.send(error(err.message, depenseFixe));
                                        } 
                                    })
                            }).catch((err) => {
                                res.send(error(err.message));
                            });
                    } else {
                        res.send(error(`utilisteur non trouvé user Id : ${userId}`));
                    }
                })
                .catch((err) => {
                    res.send(error(err.message, ''));
                 
                })
        }else{
            res.send(error(`Information(s) manquante(s) user Id : ${sUserId} mois : ${nMois} annee : ${nAnnee}`));
        }
    }
}
