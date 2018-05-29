import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Book = new Schema({
    email: String,
    date: Date,
    name: String,
    url: String,
    price: Number
});

export default mongoose.model('book', Book);