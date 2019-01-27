const configImport = require("../config");
const {success,error} = require('../biblio/function');


const userController = require('../controlers/user-controller')

/*******************
 * FakeUserForTest *
 *******************/
const fakeUser = {email: 'sm@test.fr', password: 'aze'};



/**************************
 * export des routes Auth *
 **************************/
module.exports = (auth) => {

    auth.post('/login', (req,res) => {
        if(req.body){
            userController.getUserByEmail(req,res);
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
    });

}