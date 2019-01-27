const userImport = require('../models/user');
const {success, error } = require('../biblio/function')
const jwt = require('jsonwebtoken');
const config = require("../config");

module.exports = {
    create(req,res){
        const nom = req.body._sNom;
        const prenom = req.body._sPrenom;
        const email = req.body._sEmail;
        const password = req.body._sPassword;
        if(nom && prenom && email && password){
            const user = new userImport({'nom': nom, 'prenom': prenom, 'email': email, 'password': password});
            user.save()
                .then(() => {
                    res.send(success('Compte créé.', user));
                })
                .catch((err) => {
                    // si erreur field unique
                    if (err.name === 'MongoError' && err.code === 11000) {
                        res.send(error('Cette adresse Email est déjà utilisée', user));
                      } else {
                        res.send(error(err.message, user));
                      } 
                })
        }else{
            res.send(error(`Information(s) manquante(s) nom : ${nom}, prénom: ${prenom}, email: ${email}.`));
        }
    },
    getUserByEmail(req, res){
        console.log(req.body)
        const email = req.body.email;
        const password = req.body.password
        if(password && email){
            userImport.findOne({email})
                .then((userResult) => {
                    if(userResult){
                        if (userResult.password === password) {
                            const token = jwt.sign({iss: config.rootAPI, 
                                                    email: userResult.email, 
                                                    prenom: userResult.prenom,
                                                    nom: userResult.nom}, config.secret );
                            res.json(success(token));
                        }else{
                            res.send(error('Mauvais mot de pase.'));    
                        }
                    }else{
                        res.send(error('Aucun utilisateur avec l\Email : ' + email));
                    }
                }).catch((err) => {
                    res.send(error(err.message));
                });
        }else{
            res.send(error(`Information(s) manquante(s) nom : email: ${email}, password: ${password}.`));
        }
    }
}