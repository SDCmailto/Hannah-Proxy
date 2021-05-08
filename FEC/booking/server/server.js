const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const PORT = 3002;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/booking', (req, res) => {
  // const seed = function() {
  //   return new Promise((resolve, reject) => {
  //     db.seedDatabase((data) => {
  //       resolve(data);
  //     });
  //   });
  // };
  // seed()
  //   .then((mssg) => {
  //     console.log('mssg: ', mssg);
  //     db.find((err, data) => {
  //       if (err) {
  //         res.status(201).send();
  //       } else {
  //         let stringifiedSeed = JSON.stringify(data);
  //         res.send(stringifiedSeed);
  //       }
  //     });
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });
});

app.listen(PORT, () => {
  console.log(`Success at http://localhost:${PORT}/booking faulkner loves you`);
});

//need this data from Overview upon initialization:
// campId: Number,
// price_per_night: Number,
// guests: Number,
// how_far_out: Number,
// weeknight_discount: Number,
// instant_book: Boolean,
// request_to_book: Boolean
