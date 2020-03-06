
 
        
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
var Products = require('../models/Products')
var Cart = require('../models/Cart')
var Wishlist = require('../models/Wishlist')
var User = require('../models/User')
/* GET individual product listing page. */
router.get('/:id', function(req, res, next){
    
             Products.findById({_id:req.params.id}, function(error, product){
           //get the individual product title,
                 var sameTitle = product.title;
                 var sameTag = product.tags;
                 var sameCategory = product.category;
                 
                 Products.find({$or: [{title:{$regex:sameTitle,$options:'i'}},{tags:{$regex:sameTitle,$options:'i'}}]})
                 .sort({'_id': 'descending'})
                 .limit(12)
                 .exec(function(err, similarProducts) {
                console.log(similarProducts);
  res.render('default/product-details', { title: 'iShop || Product Details', Products:product,similarProducts:similarProducts });
            
        })
             })
      
      
         
      

})



/* GET home page. */
router.post('/add_to_cart/:id', function(req, res, next){
    
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart:{items:{}});
    Products.findById(productId, function(error, product){
        if(error){
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
    if(product){
        req.flash('info', 'Cart updated');
        return  res.redirect('/users/shopping_cart');
    }
       
    })
            
        });

 //redirect if not logged in
const redirectIfNotLoggedIn = (req,res,next) =>{
       User.findById(req.session.userId, (error, user)=>{
        
        if(error || !user){
           return res.redirect('/')
        }
           next();
        
    })
}

/* GET wishlist page. */
router.post('/add_to_wishlist/:id',redirectIfNotLoggedIn,  function(req, res, next){
    
        var productId = req.params.id;
    console.log(productId);
        var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist:{items:{}});
    Products.findById(productId, function(error, product){
        if(error){
            return res.redirect('/');
        }
       wishlist.addToWishlist(product, product.id);
        req.session.wishlist = wishlist;
    if(product){
       
        req.flash('info', 'item was added to your wishlist');
        return  res.redirect('/users/wishlist');
    }
       
    })
            
        });
      
      




module.exports = router;