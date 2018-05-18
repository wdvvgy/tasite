import nodemailer from 'nodemailer';

const fromUri = 'sirius@lotte.net';

const transporter = nodemailer.createTransport({
    host: '10.131.3.245',
    port: 25,
    secure: false,

});

export { transporter, fromUri };