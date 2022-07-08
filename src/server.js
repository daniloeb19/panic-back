const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.listen(process.env.SERVER_PORT, () => {
    console.log("Servidor está ouvindo?");
    console.log(process.env.SERVER_PORT);
}
)