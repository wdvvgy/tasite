import express from 'express';
import bodyParser from 'body-parser';
import api from './api';
import mongoose from 'mongoose';
require('dotenv').config();
const {
    PORT: port,
    MONGO_URI: mongoURI,
    JWT_SECRET: jwtSecret
} = process.env;

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });

app.use('/api', api);

app.listen(port, () => {
    console.log('Express listening on port', port);
});