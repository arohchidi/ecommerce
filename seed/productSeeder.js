/*var Product = require('../models/Products')
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping')
var products = [
    new Product({
    imagePath:'../public/img/product/product1.jpg',
    title: 'Awesome Chair',
    description:'Made in Thailand Using Bamboo tree',
    price: 309
}),
    new Product({
    imagePath:'../public/img/product/product2.jpg',
    title: 'Black CPU',
    description:'CPU raadaa',
    price:2000
}),
    
    ];
var done = 0;

 for(var i = 0; i< product.length; i++){
     product[i].save(function(err, result){
         done++;
         if(done === product.length){
            exit();
         }
     });
     
 }

function exit(){
    mongoose.disconnect();
}

*/