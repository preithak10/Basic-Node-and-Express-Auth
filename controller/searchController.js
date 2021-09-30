const Topics = require("./../models/topicsModel");
const Questions = require("./../models/questionModel");

function sanitizeInput(inputValue) {

  return inputValue
    .toLowerCase()
    .replace(/[\s]{2,}|['"]+/g, "")
    .trim();
}



exports.search = async (req, res, next) => {

  try {

    if (!req.query.q || req.query.q === '""') {

      return res.status(400).send("Search value q is required");

    }

    let results = "No relevant data found!";
    
    const topicValue = sanitizeInput(req.query.q);

    const docs = await Topics.findOne({ name: topicValue }, "_id");

    if (docs) {

      results = await Questions.find({ annotations: docs.id },"number").distinct("number");

    }

    res.status(200).json({
        status: 'Success',
        data: results
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
        message: 'Error'
    });
  }

};