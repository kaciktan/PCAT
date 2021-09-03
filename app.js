const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');

const Photo = require('./models/Photo');

const app = express();
const port = 80;


//Veritabanına bağlandık
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//TEMPLATE ENGINE
app.set("view engine","ejs");

//MIDDLEWARES 
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); // bodyparser yerine kullanılıyor -> urldeki datayı okuyor
app.use(express.json()); //urldeki datayı json a çeviriyor

//ROUTES
app.get('/', async(req,res)=>{
  const photos = await Photo.find({});
  res.render('index',{
    photos
  });
});

app.get('/about',(req,res)=>{
  res.render('about');
});


app.get('/add',(req,res)=>{
  res.render('add');
});

app.post('/photos', async (req,res)=>{
  await Photo.create(req.body);
  res.redirect('/');
});


app.listen(port,()=>{
    console.log(`Sunucu ${port} Portunda Başlatıldı..`);
});

// ÖRNEK MİDDLEWARE
// const myLogger = (req,res,next)=>{
//     console.log(req.url);
//     console.log("Middleware Log 1");
//     next();//Middleware pipeline a devam eder
// };
//app.use(myLogger);