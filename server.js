const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 8080;

//Connection file
const connection = require("./model/connection");

//Routes
const routes = require('./routes/api');

// mongoose.connection.on('connected', () => {
//     console.log('Mongooose is connected!!');
// });

//Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//HTTP request logger
app.use(morgan('tiny'));

app.use('/api', routes);


app.use(bodyParser.urlencoded({
    extended: true
}));


app.listen(port, console.log(`Server started on port: ${port}`));

