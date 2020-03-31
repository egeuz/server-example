/*** EXPRESS — SERVER SETUP ***/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));

/*** DATABASE ***/
const mongoose = require('mongoose');
const MONGODB_KEY = "mongodb+srv://ege:ege@cluster0-qavwt.mongodb.net/test?retryWrites=true&w=majority";
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

/*** GET ALL USER SUBMISSIONS ***/
app.get("/all-submissions", (req, res) => {
  Share.find({}).then((submissions) => {
    res.json(submissions);
  })
});

/*** CONNECTION ***/
const PORT = 3000;
app.listen(PORT, () => console.log("server running on port " + PORT));
