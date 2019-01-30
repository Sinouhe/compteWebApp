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
        const nom = req.body.nom;
        const description = req.body.description;
        if(nom){
            const typeDepense = new typeDepenseImport({nom, description});
            typeDepense.save()
                .then(() => {
                    res.send(success('typeDepense créé.', typeDepense));
                })
                .catch((err) => {
                    res.send(error(err.message, typeDepense));
                });
        }else{
            res.send(error(`Information(s) manquante(s) nom : ${nom}, description: ${description}.`));
        }
    },


}