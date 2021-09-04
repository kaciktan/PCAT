const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const Photo = require('./models/Photo');
const PhotoController = require('./contollers/photoControllers');
const PageController = require('./contollers/pageController');

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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', PhotoController.getAllPhotos);
app.get('/photo/:id', PhotoController.getPhoto);
app.post('/photos', PhotoController.createPhoto);
app.put('/photos/:id', PhotoController.updatePhoto);
app.delete('/photos/:id', PhotoController.deletePhoto);


app.get('/about',PageController.getAboutPage);
app.get('/add', PageController.getAddPage);
app.get('/photos/edit/:id', PageController.getEditPage);



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
