require('dotenv').config({ path: './config.env' });
const express = require("express");
const mongoose = require('mongoose');
const searchRouter = require('./routes/searchRoute')

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.send('Welcome. Use \\search?q="query" to query DB.');
});

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection success.'))
  .catch((err) => console.log(err)
);

app.use('/search', searchRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('DB disconnected.');
});