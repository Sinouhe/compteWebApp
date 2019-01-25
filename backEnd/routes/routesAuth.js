const configImport = require("../config");
const {success,error} = require('../biblio/function');
const jwt = require('jsonwebtoken');
const config = require("../config");


/*******************
 * FakeUserForTest *
 *******************/
const fakeUser = {email: 'sm@test.fr', password: 'aze'};



/**************************
 * export des routes Auth *
 **************************/
module.exports = (auth) => {

    auth.post('/login', (req,res) => {
        console.log(req.body);
        if(req.body){
            const email = req.body.email.toLowerCase().trim();
            const password = req.body.password.toLowerCase().trim();
            console.log(req.body)
            if(email === fakeUser.email && password === fakeUser.password){
                delete req.body.password;
                const token = jwt.sign({iss: config.rootAPI , role: 'admin', email: email, name: 'Sinouhé_FakeUser'}, config.secret );
                res.json(success(token));
            }else{
                res.json(error('identifiants incorrects'));
            }
        }else{
            res.json(error('données manquantes'));
        }
    })

}