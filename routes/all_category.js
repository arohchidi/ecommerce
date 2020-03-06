
 
        
/*var express = require('express');
var router = express.Router();
const Products = require('../models/Products')
/* GET home page. */
/*router.get('/:id', function(req, res, next) {
    const Products =  Products.findById(req.params.id, function(error, Products){
            console.log(Products);
  res.render('default/product-details', { title: 'iShop || Product Details', Products:Products });
});
});
*/

var express = require('express');
var router = express.Router();
var products = require('../models/Products')




router.get('/:category?', function(req,res,next){
    products.find({category:req.params.category},function(err, products){
      
            res.render('default/all_category', {title: 'iShop || Admin || All  Products', products:products})
            
        })
    
})


module.exports = router;// JavaScript Document