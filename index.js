/*** EXPRESS — SERVER SETUP ***/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));

require('dotenv').config();

/*** DATABASE ***/
const mongoose = require('mongoose');
const MONGODB_KEY = process.env.MONGODB_KEY;
mongoose.connect(MONGODB_KEY, { useNewUrlParser: true });

/*** DATA MODEL ***/
const shareSchema = new mongoose.Schema({ entry: String });
const Share = mongoose.model('Share', shareSchema);

/*** HANDLE USER SUBMISSIONS ***/
app.post("/share-submit", (req, res) => {
  const shareText = req.body.shareText;
  console.log(shareText);
  const newShare = new Share({ entry: shareText });
  newShare.save().then(savedShare => {
    res.json(savedShare.toJSON());
  })
});
``
/*** GET ALL USER SUBMISSIONS ***/
app.get("/all-submissions", (req, res) => {
  Share.find({}).then((submissions) => {
    res.json(submissions);
  })
});

/*** CONNECTION ***/
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("server running on port " + PORT));
