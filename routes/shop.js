var express = require('express');
var router = express.Router();
var Products = require('../models/Products')
/* GET home page. */
/*router.get('/', function(req, res, next){
    
        Products.find(function(err, products){
           
             res.render('default/shop', { title: 'iShop || All Products' , products:products, updated:req.flash('info')});
            
        });
      
      
         
      
})
*/



router.get('/page=:page', function(req,res,next){
    
    var perPage = 3
    
    var  page = req.params.page || 1;
var category = req.query.category;
console.log(category);
//var page =  1
    Products
        .find({category:category})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
        console.log(products);
          var counter =  Products.count({category:category}).exec(function(err, count) {
                if (err) return next(err)
                console.log(err);
                res.render('default/shop', {title:'iShop || All Products',
                   
                 products:products, updated:req.flash('info'),
                    current: page,
                    pages: Math.ceil(count / perPage),
                    category:category,
                    count:count
                    
                })
            })
        })
})


router.get('/filter_products:page', function(req,res,next){
    
   res.render('default/filter_products');
})


module.exports = router;