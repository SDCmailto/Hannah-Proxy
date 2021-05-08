const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/booking';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function() {
  console.log('success connecting to mongo in seed.js');
});

// const initSchema = new mongoose.Schema({
//   campId: Number,
//   price_per_night: Number,
//   guests: Number,
//   how_far_out: Number,
//   weeknight_discount: Number,
//   instant_book: Boolean,
//   request_to_book: Boolean
// });

const availabilitySchema = new mongoose.Schema({
  year: Number,
  month: Number,
  booked_days: [Number]
});

const booking_infoSchema = new mongoose.Schema({
  booking_id: Number,
  year: Number,
  month: Number,
  check_in_date: String,
  check_out_date: String,
  number_nights: Number,
  number_guests: Number,
  average_price: Number,
  cleaning_fee: Number,
  weeknight_discount: Number,
  subTotal: Number
});

const booking_schema = new mongoose.Schema({
  availability: availabilitySchema,
  booking_info: booking_infoSchema
});

const Booking = mongoose.model('Booking', booking_schema);

const seedDatabase = async () => {
  await Booking.find().exec()
    .then(async (result) => {
      console.log('result: ', result);
      if (result.length > 0) {
        await db.dropCollection('overviews')
          .then(result => {
            console.log('overviews dropped ', result);
          });
      }
    })
    .catch((error) => {
      console.log('error: ', error)
    });
    for (let i = 0; i <= 99; i++) {
      if (i === 0) { //create initial data obj for Twisselman Ranch
        const twisselman_glamping_by_the_pond = {
          campId: 0,
          booking_id: 0,
          month: 6,
          year: 2021,
          check_in_date = '2021-06-07T14:48:00.000Z',
          check_out_date = '2021-06-10T14:48:00.000Z',
          number_nights: 3,
          number_guests: 2,
          price_per_night: 165,
          how_many_months_out_booking_can_be_made: 6,
          weeknight_discount: 8, //%
          instant_book: true,
          request_to_book: false,
          cleaning_fee: 15,
          subTotal: 411
        }

  //methods that create fake data:
  monthMaker = function() {
    let months = [5, 6, 7, 8];
    let month = months[Math.floor(Math.random() * months.length)];
    return month;
  };
  monthDays = function(month) {
    let days = [];
    if (month !== 6) {
      days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    } else {
      days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    }
    return days;
  }
  unavailableDays = function(array) {
    let unavailable = [];
    let unavail1 = array[Math.floor(Math.random() * array.length)];
    let range1 = (unavail1 + 1);
    unavailable.push([unavail1, range1]);
    let unavail2 = array[Math.floor(Math.random() * array.length)];
    let range2 = (unavail2 + 2);
    unavailable.push([unavail2, range2]);
    let unavail3 = array[Math.floor(Math.random() * array.length)];
    let range3 = (unavail3 + 3);
    unavailable.push([unavail3, range3]);
    return unavailable;
  };
  rangeMaker = function() {
    let daysRange = [1, 2, 3, 4, 5, 6, 7];
    let numbDays = daysRange[Math.floor(Math.random() * daysRange.length)];
    return numbDays;
  };
  startDay = function(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  avgPrice = function(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  discountMaker = function() {
    let discounts = [5, 10, 15, 20];
    let discount = discounts[Math.floor(Math.random() * discounts.length)];
    return discount;
  };
  booleanMaker = function() {
    let bools = [true, false];
    let bool = bools[Math.floor(Math.random() * bools.length)];
    return bool;
  };
  far = function() {
    let farOutOptions = [30, 60, 90];
    let farOut = farOutOptions[Math.floor(Math.random() * farOutOptions.length)];
    return farOut;
  };

};


makeData = function() {
  for (let i = 0; i <= 99; i++) {
    if (i === 0) { //create initial data obj at index 0
    // campId: Number,
    // price_per_night: Number,
    // guests: Number,
    // how_far_out: Number,
    // weeknight_discount: Number,
    // instant_book: Boolean,
    // request_to_book: Boolean
    }
    let init = {};
    let availability = {};
    let booking_info = {};
    let price = avgPrice(75, 325);
    let numb = rangeMaker();
    let month = monthMaker();
    let days = monthDays(month);
    let unavailable = unavailableDays(days);
    init.campId = i;
    init.price_per_night = price;
    init.guests = rangeMaker();
    init.how_far_out = far();
    init.weeknight_discount = discountMaker();
    init.instant_book = booleanMaker();
    init.request_to_book = !booleanMaker();
    availability.year = 2021;
    availability.month = month;
    availability.booked_days = unavailable;
    booking_info.booking_id = i;
    booking_info.year = 2021,
    booking_info.month = month;
    booking_info.check_in_date = startDay(23, 1);
    booking_info.check_out_date = (startDay(23, 1) + rangeMaker());
    booking_info.number_nights = rangeMaker();
    booking_info.number_guests = rangeMaker();
    booking_info.average_price = price;
    booking_info.cleaning_fee = (price / 10);
    booking_info.weeknight_discount = discountMaker();
    booking_info.subTotal = (price * numb);
    inits.push(init);
    availabilities.push(availability);
    booking_infos.push(booking_info);
  }
}

makeData();

module.exports = Booking;

module.exports.seedDatabase = function(cb) {
  for (let i = 0; i <= inits.length; i++) {
    for (let j = 0; j <= availabilities.length; j++) {
      for (let k = 0; k <= booking_infos.length; k++) {
        Booking.create([{init_data: inits[i]}, {availability: availabilities[j]}], booking_infos[k], () => {
          console.log(`success creating seed document ${k}`);
        })
      }
    }
  }
  let mssg = `complete seeding db`;
  cb(mssg);
};

module.exports = { seed }
