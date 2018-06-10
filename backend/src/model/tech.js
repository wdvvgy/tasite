import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Tech = new Schema({
    email: String,
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

export default mongoose.model('tech', Tech);