const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/booking';
mongoose.Promise = global.Promise;
const { seed } = require('./seed.js');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const bookingDb = mongoose.connection;

bookingDb.on('error', console.error.bind(console, 'connection error:'));
bookingDb.once('connected', function() {
  console.log('success connecting to mongo faulkner luvs you');
});

const seeder = async () => {
  await Booking.find().exec()
  .then(data => {
    console.log('data: ', data);
    while (data.length <= 99) {
      seed();
    }
  })
  .catch((err) => {
    throw err;
  });
};

const Booking = mongoose.model('Booking');

module.exports.bookingDb = bookingDb;
