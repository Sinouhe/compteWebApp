const configImport = require("../config");
const {success,error} = require('../biblio/function');


const userController = require('../controlers/user-controller')

/**************************
 * export des routes Auth *
 **************************/
module.exports = (auth) => {

    auth.post('/login', (req,res) => {
        if(req.body){
            userController.login(req,res);
        }else{
            res.json(error('données manquantes'));
        }
    })
    .post('/saveUser', (req,res) => {
        if(req.body){
            userController.create(req,res);
        }else{
            res.json(error('données manquantes'));
        }
    })
    .post('/getUserByEmail', (req,res) => {
        if(req.body.email){
            userController.getUserByEmail(req,res);
        }else{
            res.json(error('données manquantes'));
        }
    });

}