const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

try {
     mongoose.connect(process.env.BD_LINK,{
        useNewUrlParser: true,
    useUnifiedTopology: true },() => 
    console.log("Mongoose tá on")
    );

  } catch (e) {
    console.log("Mongoose tá off"+e);
  }



app.listen(process.env.SERVER_PORT, () => {
    console.log("Servidor está ouvindo?");
}
)