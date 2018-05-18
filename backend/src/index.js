import express from 'express';
import bodyParser from 'body-parser';
import api from './api';
import mongoose from 'mongoose';
import { uri } from './config/db';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.set('jwt-secret', 'secretKEYforPROJECT');

mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });

app.use('/api', api);

app.listen(port, () => {
    console.log('Express listening on port', port);
});