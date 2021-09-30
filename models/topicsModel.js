const mongoose = require('mongoose');

const topicsSchema = new mongoose.Schema({
    name:{
        type: String,
        index: true
    },
    level:{
        type: Number
    },
    parentId:{
        type:String
    }
});

// topicsSchema.index({name: 1});


const Topics = mongoose.model('Topics', topicsSchema);

module.exports = Topics;