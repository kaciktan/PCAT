const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Veritabanına bağlandık
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Photo Schema oluşturduk
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

// PhotoSchema ve 'Photo' stringini kullanarak model oluşturduk.
const Photo = mongoose.model('Photo', PhotoSchema);

//Dökümanı oluşturduk
// Photo.create({
//     title: 'Photo Title 1',
//     description: 'Photo description 1 lorem ipsum'
// });

// Photo.find({}, (err, data) => {
//   console.log(data);
// });

// //update photo
// const id = '6079f04e5916c524d4bdcb74';
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 111 updated',
//     description: 'Photo description 111 updated',
//   },
//   {
//       new: true
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

//delete a photo
const id = '613239ec6dab7327f6b2df67';

Photo.findByIdAndDelete(id, (err, data) => {
  console.log('Photo is removed..');
});