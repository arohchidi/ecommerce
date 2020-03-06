


var express = require('express');
var router = express.Router();
//var expressValidator = require('express-validator/check').check;
var mongoose = require('mongoose')
 var product = require('../models/Products')
 const User = require('../models/User')
 var Cart = require('../models/Cart')
 var Wishlist = require('../models/Wishlist')
 var Order = require('../models/Orders')
 var category = require('../models/Category')
 var csrf = require('csurf');
var csrfProtection = csrf();
 var passport =require('passport');
const {check, validationResult } = require('express-validator/check');
var bcrypt = require('bcrypt');
 //mongoose.connect('mongodb://localhost:27017/shopping')
 
 //redirect if not logged in
const redirectIfNotLoggedIn = (req,res,next) =>{
       User.findById(req.session.userId, (error, user)=>{
        
        if(error || !user){
           return res.redirect('/users/login')
        }
           next();
        
    })
}

//redirect if not logged in to checkout
const redirectIfNotLoggedInToCheckout = (req,res,next) =>{
       User.findById(req.session.userId, (error, user)=>{
        
        if(error || !user){
            req.flash('checkout', 'Please login to checkout')
           return res.redirect('/users/login')
        }
           next();
        
    })
}


 const multer = require('multer');
const path = require('path');

/**Storage Engine***/
const storageEngine = multer.diskStorage({
    destination: './public/images/',
    filename: function(req, file, fn){
        fn(null, file.fieldname + '-' + Date.now()+
          path.extname(file.originalname));
          
    }
});


/**init**/
const upload = multer({
    storage:storageEngine,
    limits:{fileSize:20000000},
    /*fileFilter:function(req,file,callback){
        validateFile(file, callback);
    }
    */
    
}).single('photo');


/* GET home page. */
router.get('/', function(req, res, next) {
   
       
             
         
  res.render('default/index', { title: 'iShop'});
         
     });



/* GET home page. */
router.get('/', function(req, res, next) {
    //fetch categories
     category.find(function(err,category){
  res.render('default/index', { title: 'iShop', category:category});
     })
});


router.get('/admin/signin', function(req, res, next) {
  res.render('user/signin', { title: 'iShop' });
});



/* Get User Account Page .*/
router.get('/users/my-account', function(req, res, next) {
    //get all user's order records 
   const orders = Order.find({user:req.session.userId},function(error,orders){
      
       var cart = new Cart(req.session.cart ? req.session.cart:{items:{}});
       User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
      
        res.render('users/my-account', { title: 'iShop || my-Account', loginSuccess:req.flash('loginSuccess'), orders:orders, products:cart.generateArray(), totalPrice:cart.totalPrice,totalQty:cart.totalQty,cart:cart, user:user});
      })
    })
      
 
});

/* Get User registration Page .*/
router.get('/users/register', function(req, res, next) {
  res.render('users/register', { title: 'iShop || registration',errors: req.flash('registrationErrors'),
passwordMismatch:req.flash('passwordMismatch'),
lengthError:req.flash('lengthError')
});
});

/**Get User Login page */
router.get('/users/login', function(req,res,next){
    res.render('users/login', {title: 'iShop || login', errors: req.flash('registrationErrors'), 
    accountSuccess:req.flash('info'),
   incorrectPassword:req.flash('incorrectPassword'),
   checkout:req.flash('checkout')});                          
                             
})

//edit account
router.post('/users/edit_account', function(req, res, next){
    var document = {
          
          
           username:req.body.username,
           email:req.body.email,
         
       };
    var id = req.body.id;
    console.log(id);
 
      var update = User.findByIdAndUpdate(id,{$set:req.body}, function(error, user){
           if(error){
               console.log(error);
               req.flash('editError', 'Something went wrong');
               return res.redirect('back'); 
           }
		   else{
			   req.flash('editSuccess', 'successful');
			  
			     return  res.render('users/my-account'); 
		   }
           
       
       });
})


/*
**
*** Admin Section****/


router.get('/admin/all_products', function(req,res,next){
    product.find(function(err, products){
      
            res.render('admin/all_products', {title: 'iShop || Admin || All  Products', products:products})
            
        })
    
})


/*router.get('/admin/all_category/:category', function(req,res,next){
    product.find(function(err, products){
      
            res.render('admin/all_category', {title: 'iShop || Admin || All  Products', products:products})
            
        })
    
})
*/

/**handle product upload**/
router.post('/product/upload', function(req,res){
   upload(req, res, (error)=>{
       var fullPath = "images/"+req.file.filename;
       var document = {
           imagePath:fullPath,
           title:req.body.title,
           description:req.body.description,
           price:req.body.price,
            listprice:req.body.listprice,
           qty:req.body.qty,
           size:req.body.size,
           color:req.body.color,
           category:req.body.category,
           sku:req.body.sku,
           currency:req.body.currency,
           tags:req.body.tags
       };
       var photo = new product(document);
       console.log(photo)
       photo.save(function(error){
          if(error){
          const uploadErrors = (Object.keys(error.errors).map(key=>error.errors[key].message))
          
          //req.session.registrationErrors = registrationErrors
          req.flash('uploadErrors', uploadErrors)
          
          
          //persist the data 
          
          req.flash('data', req.body)
          return res.redirect('/admin/add_new_product')
      }
           req.flash('info', 'item added')
           res.redirect('/admin/add_new_product');
       });
       
   }) 
});


/** Handle user registration  **/

/*router.post('/user_account_creation', passport.authenticate('local.signup',{
	
    successRedirect:'/about',
    failureRedirect:'/shop',
    failureFlash:  true
    
}));
*/
const validateCreatePostMiddleware=(req,res,next) =>{
   if(!req.body.email || !req.body.password){
        
        
        return res.redirect('users/login')
      
    }
    next();
    
}


/*handle user registration request*/
router.post('/user_account_creation', function(req,res,next){
    //validate user input
    if(req.body.password != req.body.confirm_password){
             req.flash('passwordMismatch', 'Your password does not match');
             return res.redirect('/users/register');
         }
                
             if(req.body.password.length < 6 || req.body.confirm_password.length < 6){
            req.flash('lengthError', 'Your password should be at least minimum of 6 characters');
             return res.redirect('/users/register');
         }    
    //collect user inputs
               var document = {
          
           username:req.body.username,
           email:req.body.email,
           password:req.body.password
       }; 
    
            User.create(document, (error, user)=>{
                //check if password confirmation is the same with password
         
        //check for errors and if any redirect back
      if(error){
          const registrationErrors = (Object.keys(error.errors).map(key=>error.errors[key].message))
          
          //req.session.registrationErrors = registrationErrors
          req.flash('registrationErrors', registrationErrors)
          
          
          //persist the data 
          
          req.flash('data', req.body)
          return res.redirect('/users/register')
      }
          if(user){
              req.flash('info', 'Account successfully created');
              res.redirect('/users/login')   
          } 
     
})
    
})

/*Handle user login requests*/
router.post('/process_login',validateCreatePostMiddleware,function(req,res){
    const {email, password}  = req.body
   
   //try to find the user
   User.findOne({email}, (error, user)=>{
        if(error){
           
           //if no such email exists
            
         
          
          //persist the data 
          
         
          return res.redirect('/users/register')
       }
       //if user
       if(user){
           //compare user
           bcrypt.compare(password, user.password, (error, same)=>{
               //same returns True or False
               if(same){
                   req.session.userId = user._id
                   req.session.role = user.role;
                   if(req.session.role == 'admin'){
                      req.flash('loginSuccess', 'Welcome admin, you are now logged in');
                  return res.redirect('/admin/dashboard') 
                   }
                   else{
                       req.flash('loginSuccess', 'Logged In');
                  return res.redirect('/users/my-account')
                   }
                    
               }
               else{
                   req.flash('incorrectPassword', 'Password Is Incorrect');
                  return  res.redirect('/users/login')
               }
           })
       }
       
   })
    
})


/**handle product deletion**/
router.post('/delete_product/:id', function(req,res){
   
        product.findByIdAndRemove(req.params.id, function(error){
            if(error){
                return res.redirect('back');
            }
             req.flash('deletionSuccess', 'item has been deleted')
            return res.redirect('/admin/all_products')
            
        })
            
       
   }) 

//retrieve shopping cart
router.get('/users/shopping_cart', function(req,res){
   
       //check if cart is not set in session
    if(!req.session.cart){
        return res.render('users/shopping_cart', {products:null,title:'ishop || My cart',})
    }
          var cart = new Cart(req.session.cart);
       res.render('users/shopping_cart', {title:'ishop || My cart', products:cart.generateArray(), totalPrice:cart.totalPrice,info:req.flash('info'),deletionSuccess:req.flash('deletionSuccess')});
    
    
       
   }) 

//reduce item quantity
router.get('/reduce/:id', function(req,res){
    
      var productId = req.params.id;
    console.log(productId);
        var cart = new Cart(req.session.cart ? req.session.cart:{items:{}});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    req.flash('deletionSuccess', 'Item was successfully removed');
    res.redirect('back');
     
})

//remove item from cart
router.get('/remove/:id', function(req,res){
    
      var productId = req.params.id;
    
        var cart = new Cart(req.session.cart ? req.session.cart:{items:{}});
    cart.removeItem(productId);
    req.session.cart = cart;
    req.flash('deletionSuccess', 'Item was successfully removed');
    res.redirect('back');
     
})


//remove item from wishlist
router.get('/remove_item/:id', function(req,res){
    
      var productId = req.params.id;
    
        var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist:{items:{}});
    wishlist.removeItem(productId);
    req.session.wishlist = wishlist;
     req.flash('deletionSuccess', 'Item was successfully removed');
    res.redirect('back');
     
})

//get shopping cart
//retrieve shopping cart
router.get('/users/checkout', redirectIfNotLoggedInToCheckout, function(req,res, next){

       //check if cart is not set in session
    
        var productId = req.params.id;
    if(req.session.cart == 0 || '' || null){
        return res.redirect('/');
    }
      User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
     
        var cart = new Cart(req.session.cart ? req.session.cart:{items:{}});
       res.render('users/checkout', {title:'iShop || Checkout',products:cart.generateArray(), totalPrice:cart.totalPrice,user:user});
    
      })
       
   }) 





//complete order
router.post('/users/complete_order', function(req,res,next){
   
    User.findOneAndUpdate({_id:req.body.id},{$set:{totalAmount:req.body.totalAmount}}, function(error,user){
        if(error){
            console.log(error);
        }
    })
    var cart = new Cart(req.session.cart);
    if(req.session.cart == 0 || ''){
        return res.redirect('back');
    }
    //create unique order id
    var orderId = Math.floor(1000000000 + Math.random()  * 9000000000);
    
    //get delivery date
    var deliveryDate = new Date();
    var numberOfDaysToAdd = 6;
    deliveryDate.setDate(deliveryDate.getDate() + numberOfDaysToAdd);
    
    var dd = deliveryDate.getDate();
    var mm = deliveryDate.getMonth() + 1;
    var y = deliveryDate.getFullYear();
    var someFormattedDate = dd + '/'+ mm +'/' + y;
    
   var order = new Order({
       user:req.session.userId,
       cart:cart,
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       country:req.body.country,
       address:req.body.address,
       town:req.body.town,
       state:req.body.state,
       phone:req.body.phone,
       orderId:orderId,
       paymentMethod:req.body.paymentMethod,
       deliveryDate:someFormattedDate
       
       
   });
 
    order.save(function(error,order){
        req.flash('success', 'Your order has been placed');
      console.log(req.body.id);
    
       // return res.redirect('/my-account', {title:'iShop || My account'})
        //Order.find({user:req.session.userId}).populate('user').sort({'_id': -1}).limit(1).exec(function(error,user){
    Order.find({user:req.session.userId}).populate('user').sort({'_id': 'descending'}).limit(1).exec(function(error,user){
        var cart = new Cart(req.session.cart);
       console.log(user)
       req.session.cart = 0;
      return  res.render('users/complete_order',{user:user, title: 'iShop',totalPrice:cart.totalPrice,products:cart.generateArray()});
        
   })
    })
    
   
    
});

router.get('/users/complete_order', function(req,res){
    
    return res.redirect('back')
    
})



/**handle product deletion**/
router.get('/admin/delete_user/:id', function(req,res){
   
        User.findByIdAndRemove(req.params.id, function(error){
            if(error){
                return res.redirect('/');
            }
            req.flash('deletionSuccess', 'User has been deleted')
            return res.redirect('/admin/customers')
            
        })
            
       
   }) 
//filter products

router.get('/filter_products/:page', function(req,res,next){
   /*declare result per page */
    var perPage = 3
    var  page = req.params.page || 1;
    
    /*get user's filter variables */
    var query_param = req.query.query;
    var order_param = req.query.order;
      var category = req.query.category;
    /* pass to user's search variables  sort  function */
    var sort = {}
    sort[query_param] = order_param;
      console.log(query_param);
      console.log(order_param);
    
    /* Run DB query */
    product
        .find({category:category})
        .sort(sort)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
        console.log(products);
            product.count({category:category}).exec(function(err, count) {
                if (err) return next(err)
                console.log(err);
                res.render('default/filter_products', {title:'iShop || All Products',
                   
                 products:products, updated:req.flash('info'),
                    current: page,
                    pages: Math.ceil(count / perPage),
                  query_param: query_param,
                   order_param:order_param ,
                    category:category,
                 count:count
                })
            })
        })
})


//search for  products

router.get('/search/:page', function(req,res,next){
   /*declare result per page */
    var perPage = 3
    var  page = req.params.page || 1;
    
    /*get user's filter variables */
   
    var query_input = req.query.search_query;
      console.log(query_input);
   
    
    /* Run DB query */
    product
        .find({ $or: [{title:{$regex:query_input,$options:'i'}},{tags:{$regex:query_input,$options:'i'}},{category:{$regex:query_input,$options:'i'}}]})
        .sort({'_id': 'descending'})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
        console.log(products);
            product.count({ $or: [{title:{$regex:query_input,$options:'i'}},{tags:{$regex:query_input,$options:'i'}},{category:{$regex:query_input,$options:'i'}}]}).exec(function(err, count) {
                if (err) return next(err)
                console.log(count);
                res.render('default/search', {title:'iShop || All Products',
                   
                 products:products, updated:req.flash('info'),
                    current: page,
                    pages: Math.ceil(count / perPage),
                   search_query: query_input,
                  
                   
                 count:count
                })
            })
        })
})


//filter products

router.get('/search_filter/:page', function(req,res,next){
   /*declare result per page */
    var perPage = 3
    var  page = req.params.page || 1;
    
    /*get user's filter variables */
    var query_param = req.query.query;
    var order_param = req.query.order;
    var query_input = req.query.search_query;
    /* pass to user's search variables  sort  function */
    var sort = {}
    sort[query_param] = order_param;
      console.log(query_param);
      console.log(order_param);
    
    /* Run DB query */
    product
       .find({ $or: [{title:{$regex:query_input,$options:'i'}},{tags:{$regex:query_input,$options:'i'}},{category:{$regex:query_input,$options:'i'}}]})
        .sort(sort)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
        console.log(products);
            product.count({ $or: [{title:{$regex:query_input,$options:'i'}},{tags:{$regex:query_input,$options:'i'}},{category:{$regex:query_input,$options:'i'}}]}).exec(function(err, count) {
                if (err) return next(err)
                console.log(err);
                res.render('default/search_filter', {title:'iShop || All Products',
                   
                 products:products, updated:req.flash('info'),
                    current: page,
                    pages: Math.ceil(count / perPage),
                  query_param: query_param,
                   order_param:order_param,
                   search_query: query_input,
                    
                 count:count
                })
            })
        })
})



//retrieve wishlist
router.get('/users/wishlist', redirectIfNotLoggedIn, function(req,res){
   
       //check if cart is not set in session
    if(!req.session.wishlist){
        return res.redirect('/')
    }
          var wishlist = new Wishlist(req.session.wishlist);
       res.render('users/wishlist', {title:'iShop || My Wishlist', products:wishlist.generateArray(), totalPrice:wishlist.totalPrice,info:req.flash('info'),deletionSuccess:req.flash('deletionSuccess')});
    
    
       
   })

router.get('/logout', function(req,res,next){
    req.session.destroy(()=>{
        res.redirect('/users/login')
                        
        })
})
//return page not found page
router.get('/', function(req, res, next) {
  res.render('default/404', { title: 'iShop || Error 404' });
});




module.exports = router;
