import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Auth = new Schema({
    email: String,
    pw: String,
    created: { type: Date, default: Date.now },
    authorized: { type: Boolean, default: false },
    token: ''
});

// generates hash
Auth.methods.generateHash = function(pw) {
    return bcrypt.hashSync(pw, 8);
};

// compares the password
Auth.methods.validateHash = function(pw) {
    return bcrypt.compareSync(pw, this.pw);
};

export default mongoose.model('auth', Auth);