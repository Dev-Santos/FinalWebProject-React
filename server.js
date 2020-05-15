const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { auth } = require('express-openid-connect');


const app = express();
const port = process.env.PORT || 8080;

//Connection file
const connection = require("./model/connection");

//Authentication
// const config = {
//     required: false,
//     auth0Logout: true,
//     appSession: {
//       secret: 'a long, randomly-generated string stored in env'
//     },
//     baseURL: 'http://localhost:3000',
//     clientID: 'rAx6bbn8iJCLbszbFyjCLjLVJUSm78TU',
//     issuerBaseURL: 'https://dev-santos.auth0.com'
// };

//Routes
const routes = require('./routes/api');
// app.use(auth(config));

//Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//HTTP request logger
app.use(morgan('tiny'));

app.use('/api', routes);

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(req.isAuthenticated() ? 'Logged in' : 'Logged out');
// });


app.use(bodyParser.urlencoded({
    extended: true
}));


app.listen(port, console.log(`Server started on port: ${port}`));

