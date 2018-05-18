import nodemailer from 'nodemailer';
require('dotenv').config();
const { SMTP_URI: uri, SMTP_PORT: port } = process.env;

const transporter = nodemailer.createTransport({
    host: uri,
    port: port,
    secure: false
});

export { transporter };