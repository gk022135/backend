//01


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SinLog = require('./Routes/SinLog'); 

require('./Models/db');  

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


app.use('/qr-code-system', SinLog);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
