const express = require('express');
const path = require('path');
const app = express();
const port = 80;

const myLogger = (req,res,next)=>{
    console.log(req.url);
    console.log("Middleware Log 1");
    next();//Middleware pipeline a devam eder
};

//app.use(myLogger);
app.use(express.static('public'));

app.get('/',(req,res)=>{
  // res.sendFile(path.resolve(__dirname,'about.html'))
});

app.listen(port,()=>{
    console.log(`Sunucu ${port} Portunda Başlatıldı..`);
});
