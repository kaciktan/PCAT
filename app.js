const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const Photo = require('./models/Photo');

const app = express();
const port = 80;

//Veritabanına bağlandık
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // bodyparser yerine kullanılıyor -> urldeki datayı okuyor
app.use(express.json()); //urldeki datayı json a çeviriyor
app.use(fileUpload()); //file upload için middleware dahil ediyoruz.
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photo/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id',async (req,res)=>{
  const photo= await Photo.findById(req.params.id);
  res.render('edit',{photo});
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save()

  res.redirect(`/photo/${req.params.id}`)
});

app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
});



app.listen(port, () => {
  console.log(`Sunucu ${port} Portunda Başlatıldı..`);
});

// ÖRNEK MİDDLEWARE
// const myLogger = (req,res,next)=>{
//     console.log(req.url);
//     console.log("Middleware Log 1");
//     next();//Middleware pipeline a devam eder
// };
//app.use(myLogger);
