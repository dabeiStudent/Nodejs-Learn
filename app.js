require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const path = require('path');
import configViewengine from './config/viewengine';
import initWebsite from './routes/web'

//Connect to DB 
const connect2DB = require('./routes/connect2DB');
connect2DB();
//Create schema
const user = require('./models/user');
const post = require('./models/post');


//Import json & body-parser de doc du lieu /POST
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use('/api/auth', authRouter);

configViewengine(app);
initWebsite(app);

const PORT = process.env.PORT || 1000
app.listen(PORT, () => console.log(`Server started on ${PORT}`));