const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morganImport = require ('morgan');
const jwt = require('jsonwebtoken');
const config = require("./config");
const routes = require('./routes/routesAuth');

/*************
 * MiddleWare *
 **************/
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(morganImport('dev'));

const auth = express.Router();

routes(auth);

//app.use('/api',api);
app.use(`${config.rootAPI}/auth`,auth);

const port = config.port;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});