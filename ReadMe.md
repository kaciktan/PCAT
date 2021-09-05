# PCAT
* [Çalışma Ortamı](#calisma-ortami-hazirlanmasi)
* [ExpressJS](#express-js)
* [Template Engine EJS ](#template-engine)
* [MongoDB](#mongodb)
* [Method Override](#method-override)
* [Heroku-MongoDb Atlas Canlı Ortam](#projeyi-canli-ortama-alma)

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
`Detay Sayfalarında statik dosyalar yüklenmez ise başına / işareti koymalıyız. Örnek : /css/style.css`
- Middleware : <br>
~~~javascript
//Örnek Loggler Middleware
const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
}
~~~
- File Upload : <br>
Resim Yüklemek için `npm i express-fileupload` modülünü kullanıyoruz.<br>
yrıca görsel göndermemiz için  encType="multipart/form-data" eklememiz gerekir. `app.use(fileUpload()); //file upload için middleware`  <br>


## Template Engine 
- Template Engine Yükleme : `npm i ejs`
- EJS views klasörüne bakmaktadır
- html dosya uzantılarını .ejs olarak değiştiririz.
- partial kullanımı mevcut _partialname 
- partial include `  <%- include('partials/_partialname') %> `
- linkler path olarak verilmeli. Örnek : `/about   /contact` app.js den requestler karşılanmalı.

## MongoDb
`https://www.mongodb.com/try/download/community` adresinden indirilebilir.<br>
`C:\Program Files\MongoDB\Server\5.0\bin` mongo terminal ekranı için sistem değişkeni olarak eklenmeli.<br>
- MongoDB Compass : Mongo için GUI<br>
`show dbs` Veritabanlarını Listeler<br>
`use deneme-test-db` Veritabanı Oluşturmak ve Kullanmak İçin<br>
Photos collection ve bu collection içerisindeki ilk dökümanımızı oluşturmak için:
~~~nosql
db.photos.insertOne(
  {title: "Photo 1", description: "Photo description lorem ipsum", qty:20}
)
~~~
`db.photos.find()`  dökümanı görebilmek için.<br>
`show collections` collectionları görmek için.<br>
Birden daha fazla döküman  oluşturmak için:
~~~nosql
db.photos.insertMany([
  {title: "Photo 2", description: "Photo 2 description", qty:50},
  {title: "Photo 3", description: "Photo 3 description", qty:150}
])
~~~
Belirli özelliklere sahip dökümanları sıralamak için 2 örnek:
~~~
db.photos.find({title: "Photo 1"})
db.photos.find({title: "Photo 1", qty:200})
~~~
Güncelleme yapmak için : 
~~~
db.photos.updateOne( {title: "Photo 1"}, { $set: {qty:222}} )
~~~
Silme yapmak için :
~~~
db.photos.deleteOne({qty: 50})
~~~
Eğer birden daha fazla döküman varsa ilki silinir. Birden fazla döküman silmek için, deleteMany() kullanılır.

## Mongoose

`npm i mongoose`
Mongoose için dökümantasyon : `https://mongoosejs.com/docs/guide.html`

## Method Override
Bilgileri "POST" request ile göndereceğiz ancak değişen bilgileri göndermek için  http PUT request kullanacağız.Tarayıcılar desteklemediği için PUT requesti simule edeceğiz.<br>
`npm i method-override` <br>
~~~javascript
// Middleware
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));
~~~

` form method="POST" action="/photos/<%= photo._id %>?_method=PUT" -> formu düzenliyoruz `

## PROJEYI CANLI ORTAMA ALMA
- Heroku sitesinden CLI indirip kuruyoruz.
- MongoDB Atlas'a kaydolup bir Cluster oluşturuyoruz.
- Cluster içerisinde kullanıcı adı ve şifremizi ayarlıyoruz.
- Uygulama içerisinden bağlanmak için Connect your application seçeneğine tıklıyoruz.
- app.js de mongodb connect alanını güncelliyoruz.
- package.json dosyasında nodemon u node olarak değiştiriyoruz.
- CMD de heroku login komutunu giriyoruz.
~~~
 > heroku login
 > cd my-project/
 > git init
 > heroku git:remote -a photocat-app
 > git add .
 > git commit -am "make it better" // branch main olduğundan heroku master branch e baktığından ayarlama yapmak lazım
 > git checkout master
 > git checkout -b main
 > git push heroku main // eğer main branch zaten seciliyse direkt olarak main branch yazılabilir.
 // remote u değiştirdiğimiz unutulmamalı düzenleme yapılacaksa git remote edilmeli yoksa herokuya gider 😉
~~~
- Mongo Atlas sitesinde Network Access sekmesine geliyoruz.
- Add Ip Accesss -> Allow Access Anywhere ekliyoruz...

#### Dokümanyasyon Sonu.. ❤

