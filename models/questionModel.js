const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    number:{
        type: Number
    },
    annotations:{
        type: [String],
        index: true
    }
});


const Questions = mongoose.model('Questions', questionsSchema);

module.exports = Questions;