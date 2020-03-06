


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
  var Subcategory = require('../models/Subcategory')
 var csrf = require('csurf');
var csrfProtection = csrf();
 var passport =require('passport');
const {check, validationResult } = require('express-validator/check');
var bcrypt = require('bcrypt');
 //mongoose.connect('mongodb://localhost:27017/shopping')
 
 //redirect if not logged in
const redirectIfAdminLoggedIn = (req,res,next) =>{
       User.findById(req.session.userId, (error, user)=>{
        req.session.role= user.role;
           
        if(req.session.role != 'admin'){
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





//get admin dashboard


router.get('/dashboard', redirectIfAdminLoggedIn, function(req,res,next){
    //get daily sales 
    Order.count({'createdAt':{$lt:new Date(),$gte:new Date(new Date().setDate(new Date().getDate()-1))}},function(error,dailysale){
        //get weekly sales
    Order.count({'createdAt':{$lt:new Date(),$gte:new Date(new Date().setDate(new Date().getDate()-7))}},function(error,weeklysale){ 
        
        //monthly sales
            Order.count({'createdAt':{$lt:new Date(),$gte:new Date(new Date().setDate(new Date().getDate()-31))}},function(error,monthlysale){ 
        
                
                
                 Order.find({'createdAt':{$lt:new Date(),$gte:new Date(new Date().setDate(new Date().getDate()-7))}}).sort({'cart.totalPrice': 'ascending'}).limit(7).exec(function(error,customersOfTheMonth){
         console.log(customersOfTheMonth)
     
    
                
                
                //daily revenue
                //monthly sales
          /* Order.aggregate([
          {$unwind: "$cart"},
            
                {
                $group:{_id:{
                    //year:{$year:"$createdAt"},
                    //month:{$month:"$createdAt"},
                   // day:{$dayOfMonth:"$createdAt"}
                    day:{$createdAt:{$lt:new Date(),$gte:new Date(new Date().setDate(new Date().getDate()-31))}}
                },
                   count:{"$sum":"$cart.totalPrice"}    
                       
                       }
                }
            
     ]).exec(function(error,result){
               
          console.log(result);*/
         User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
                
            res.render('admin/dashboard', {title: 'iShop || Admin || Dashboard', user:user,dailysale:dailysale,weeklysale:weeklysale,monthlysale:monthlysale,loginSuccess:req.flash('loginSuccess'),customersOfTheMonth:customersOfTheMonth})
             })
                 })
            
    })
    })
            
        })
})
    




router.get('/all_products', function(req,res,next){
    product.find(function(err, products){
      User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
            res.render('admin/all_products', {title: 'iShop || Admin || All  Products', products:products,user:user,deletionSuccess:req.flash('deletionSuccess')})
            
        })
    })
    
})

//add new products

router.get('/add_new_product', function(req,res,next){
              
            User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
            res.render('admin/add_new_product', {title: 'iShop || Admin || Add  Product',errors:req.flash('uploadError'),info:req.flash('info'),user:user})
            
        })
})
    
//add new products

router.get('/category', function(req,res,next){
    
      category.find({},function(error,categories){
          
     User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
           
             res.render('admin/category', {title: 'iShop || Admin || Add  Category',errors:req.flash('uploadError'),info:req.flash('info'),categories:categories,user:user})
        })

 })
})

router.get('/admin/all_category/:category', function(req,res,next){
    product.find(function(err, products){
           
        
        User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
            res.render('admin/all_category', {title: 'iShop || Admin || All  Products', products:products,user:user})
            
        })
    
})
    
})

//all users
router.get('/customers', function(req,res,next){
   User.find(function(err, customers){
      User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
            res.render('admin/customers', {title: 'iShop || Admin || All  Users', customers:customers,user:user,deletionSuccess:req.flash('deletionSuccess')})
            
        })
    
})
})


//all orders
router.get('/all_orders', function(req,res,next){
   Order.find({status: 'NotDelivered'}).sort({'_id': 'descending'}).exec(function(err, orders){
      console.log(orders);
       
       User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
            res.render('admin/all_orders', {title: 'iShop || Admin || All  Orders', orders:orders,user:user,info:req.flash('info')})
            
        })
   })
    
})



//upload category
/**handle product upload**/
router.post('/upload_category', function(req,res){
   
       var document = {
           
           
           category_name:req.body.category_name
       };
       var photo = new category(document);
       console.log(photo)
       photo.save(function(error){
          if(error){
          const uploadErrors = (Object.keys(error.errors).map(key=>error.errors[key].message))
          
          //req.session.registrationErrors = registrationErrors
          req.flash('uploadErrors', uploadErrors)
          
          
          //persist the data 
          
          req.flash('info', req.body)
          return res.redirect('/admin/category')
      }
           req.flash('info', 'category created')
           res.redirect('/admin/category');
       });
       
   });




/**handle product upload**/
router.post('/upload_subcategory', function(req,res){
   
       var document = {
           
           name:req.body.name,
           category_name:req.body.category_name
       };
       var photo = new Subcategory(document);
       console.log(photo)
       photo.save(function(error){
          if(error){
          const uploadErrors = (Object.keys(error.errors).map(key=>error.errors[key].message))
          
          //req.session.registrationErrors = registrationErrors
          req.flash('uploadErrors', uploadErrors)
          
          
          //persist the data 
          
          req.flash('info', req.body)
          return res.redirect('/admin/category')
      }
           req.flash('info', 'subcategory created')
           res.redirect('/admin/category');
       });
       
   });






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
          
          req.flash('info', req.body)
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


//approve a delivery
/**handle product deletion**/
router.post('/approve_delivery', function(req,res){
   var id = req.body.id
       Order.findByIdAndUpdate(id,{status:'Delivered'}, function(error){
            if(error){
                return res.redirect('back');
            }
             req.flash('info', 'done')
            return res.redirect('/admin/all_orders')
            
        })
            
       
   }) 






module.exports = router;
