const { nanoid } = require("nanoid");
const mongoose = require('mongoose');
const TopicsModel  = require('../models/topicsModel');
const QuestionModel  = require('./../models/questionModel');
const questions = require('./questions.json');
const topics = require('./topics.json');
const args = process.argv.slice(2)
const DB = args[0];

try{

  async function run() {

    let tl1s = [];
    let tl2s = [];
    let tl3s = [];
    let questionObjects = [];

    for (const topic of topics) {
      let obj1, obj2, obj3;
      const tl1 = topic.tl1;
      const tl2 = topic.tl2;
      const tl3 = topic.tl3;
      const tl1AlreadyExist = tl1s.find((x) => x.name == tl1.toLowerCase().trim());
      if (!tl1AlreadyExist) {
        obj1 = {
          _id: nanoid(12),
          name: tl1.toLowerCase().trim(),
          level: 1,
          parentId: null,
        };
        tl1s.push(obj1);
      } else {
        obj1 = tl1AlreadyExist;
      }
      const tl2AlreadyExist = tl2s.find((x) => x.name == tl2.toLowerCase().trim());
      if (!tl2AlreadyExist) {
        obj2 = {
          _id: nanoid(12),
          name: tl2.toLowerCase().trim(),
          level: 2,
          parentId: mongoose.Types.ObjectId(obj1._id),
        };
        tl2s.push(obj2);
      } else {
        obj2 = tl2AlreadyExist;
      }
      const tl3AlreadyExist = tl3s.find((x) => x.name == tl3.toLowerCase().trim());
      if (!tl3AlreadyExist) {
        obj3 = {
          _id: nanoid(12),
          name: tl3.toLowerCase().trim(),
          level: 3,
          parentId: mongoose.Types.ObjectId(obj2._id),
        };
        tl3s.push(obj3);
      } else {
        obj3 = tl3AlreadyExist;
      }
    }

    topicsObj = [...tl1s, ...tl2s, ...tl3s];

    for (const question of questions) {
      let obj4, aval;
      let questionKeys = ['A1','A2','A3','A4','A5'];
      obj4 = {
          number: question.QV,
          annotations: []
      }

      for(const element of questionKeys){
          if(question[element] && question[element] !== ''){
              aval = topicsObj.find((x) => x.name == question[element].toLowerCase().trim());
              if( typeof aval !== undefined) obj4.annotations.push(mongoose.Types.ObjectId(aval._id));
          } else {
              break;
          }
      }
      questionObjects.push(obj4);
  
    }

    await mongoose
      .connect(DB, {
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('DB connection success.')
        TopicsModel.insertMany(topicsObj, (err, data)=>{
          if(err){
            console.log(err.message);
          }else{
            console.log('Insert Success');
            console.log('Total Items: '+data.length);
            // mongoose.disconnect();
          }
        });

        QuestionModel.insertMany(questionObjects, (err, data)=>{
          if(err){
            console.log(err.message);
          }else{
            console.log('Insert Success');
            console.log('Total Items: '+data.length);
            mongoose.disconnect();
          }
        });
      })
      .catch((err) => console.log(err)
    );
    
  }


  run().catch((err) => {console.log(err); process.exit(1)});
} catch(err){
  console.log(err);
}