# PCAT
* [Çalışma Ortamı](#calisma-ortami-hazirlanmasi)
* [ExpressJS](#express-js)
* [Template Engine EJS ](#template-engine)
* [MongoDB](#mongodb)

## CALISMA ORTAMI HAZIRLANMASI
- NPM Yükleme:
- `npm init -y` | -y => Default options
- Prettier Yükleme :  
`npm install prettier -D --save-exact`<br>
.prettierc File : 
~~~json
{
  "tabWidth": 2,
  "useTabs": false,
  "semi":true,
  "singleQuote": true,
  "trailingComma": "es5"
}
~~~
- .gitignore Dosyası Oluşturma:<br>
`https://www.toptal.com/developers/gitignore/api/node`

- ExpressJS Yükleme :<br>
`npm i express --save`

-  Nodemon Yükleme (Sunucuyu tekrar çalıştırmadan değişikliklerin algılanmasını sağlıyor):<br>
`npm i --save-dev nodemon`<br>

--save-dev flagı yardımıyla nodemon modülünün bir devDependency olduğunu belirtiyoruz. <br>
İndirme işlemi tamamlandıktan sonra package.json dosyasında scripts claiminie  yeni bir start claim ekliyoruz.
~~~json
  "scripts": {
    "start": "nodemon app.js" 
  },
~~~

## Express Js
- Statik Dosyalar  :<br>
~~~javascript 
app.use(express.static('public')); //public klasöründeki dosyalar static
~~~
- Middleware : <br>
~~~javascript
//Örnek Loggler Middleware
const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
}
~~~

## Template Engine 
- Template Engine Yükleme : `npm i ejs`
- EJS views klasörüne bakmaktadır
- html dosya uzantılarını .ejs olarak değiştiririz.
- partial kullanımı mevcut _partialname 
- partial include `  <%- include('partials/_partialname') %> `
- linkler path olarak verilmeli. Örnek : `/about   /contact` app.js den requestler karşılanmalı.

## MongoDb
`https://www.mongodb.com/try/download/community` adresinden indirilebilir.<br>
`C:\Program Files\MongoDB\Server\5.0\bin` mongo terminal ekranı için çevre değişkeni olarak eklenmeli.<br>
- MongoDB Compass : Mongo için GUI


