const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const router = require('./routes');

try {
    mongoose.connect(process.env.BD_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () =>
        console.log("Mongoose tá on")
    );

} catch (e) {
    console.log("Mongoose tá off" + e);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);


app.listen(process.env.SERVER_PORT, () => {
    console.log("Servidor está ouvindo?");
}
)