# PCAT
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




