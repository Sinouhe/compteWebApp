const typeDepenseImport = require('../models/typeDepense');
const {success, error } = require('../biblio/function')

module.exports = {
    getAll(req, res) {
        typeDepenseImport.find({})
            .then((typesDepensesRes) => {
                res.send(success('liste des type de dpense ',typesDepensesRes));    
            }).catch((err) => {
                res.send(error(err.message));
            });
    },
    addOne(req,res){
        console.log(req.body)
        const nom = req.body.sNom;
        const description = req.body.sDescription;
        if(nom){
            const typeDepense = new typeDepenseImport({sNom: nom, sDescription: description});
            typeDepense.save()
                .then(() => {
                    res.send(success('typeDepense créé.', typeDepense));
                })
                .catch((err) => {
                    // si erreur field unique
                    if (err.name === 'MongoError' && err.code === 11000) {
                        res.send(error('Ce nom est déjà utilisée', typeDepense));
                      } else {
                        res.send(error(err.message, typeDepense));
                      } 
                })
        }else{
            res.send(error(`Information(s) manquante(s) nom : ${nom}, description: ${description}.`));
        }
    },
    modifyOne(req,res){
        console.log(req.body)
        const nom = req.body.sNom;
        const description = req.body.sDescription;
        const id = req.body._id;
        if(nom && id){
            typeDepenseImport.update({_id: id}, { $set: { sNom: nom, sDescription: description }})
                .then(() => {
                    res.send(success('typeDepense mis à jour.', typeDepense));
                })
                .catch((err) => {
                    res.send(error(err.message, typeDepense));
                })
        }else{
            res.send(error(`Information(s) manquante(s) nom : ${nom}, description: ${description}, id: ${id}.`));
        }
    },


}