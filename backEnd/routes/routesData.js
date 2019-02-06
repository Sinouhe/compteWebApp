const {success,error} = require('../biblio/function');
const typeDepense = require('../controlers/typeDepense-controller');
const depenseFixe = require('../controlers/depenseFixe-controller')

/**************************
 * export des routes data *
 **************************/
module.exports = (data) => {

    // Routes pour data
    
    data.get('/typeDepense/all', (req, res) => {
        typeDepense.getAll(req, res);
    })
    .post('/typeDepense/modifyOne', (req, res) => {
        if(req.body){
            typeDepense.modifyOne(req, res);
        }else{
            res.json(error('données manquantes'));
        }
    })
    .post('/typeDepense/addOne', (req, res) => {
        if(req.body){
            typeDepense.addOne(req, res);
        }else{
            res.json(error('données manquantes'));
        }
    })
    .post('/depenseFixe/addOne', (req, res) => {
        if(req.body){
            depenseFixe.addOne(req, res);
        }else{
            res.json(error('données manquantes'));
        }
    })
    .post('/depenseFixe/modifyOne', (req, res) => {
        if(req.body){
            depenseFixe.modifyOne(req, res);
        }else{
            res.json(error('données manquantes'));
        }
    })
    .get('/depenseFixe/all', (req, res) => {
        depenseFixe.getAll(req, res);
    })
    

}