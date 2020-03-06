var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var category = require('./models/Category')

var product = require('./models/Products')
var session   = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
const {check, validationResult } = require('express-validator/check');
var MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost:27017/shopping');
require('./config/passport');

const User = require('./models/User')
//redirect if not logged in


/**** Register Basic Routes ******/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getAdminAllCategory = require('./routes/all_category');
var getEditProduct = require('./routes/edit_product');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var shopRouter     = require('./routes/shop');
var myAccountRouter     = require('./routes/index');
var userRegistrationRouter     = require('./routes/index');
var productUploadRouter     = require('./routes/index');
var productDetailsRouter     = require('./routes/product-details');
var processUserRegistrationRouter     = require('./routes/index');
var UserLoginRouter     = require('./routes/index');
var processUserLoginRouter     = require('./routes/index');
 var addToCartRouter     = require('./routes/product-details');
 var addToWishlistRouter     = require('./routes/product-details');
var shoppingCartRouter     = require('./routes/index');
var reduceItemByOneRouter     = require('./routes/index');
var removeItemRouter     = require('./routes/index');
var removeItemFromWishlistRouter     = require('./routes/index');
var checkoutRouter      = require('./routes/index');
var completeOrderRouter      = require('./routes/index');
var getcompleteOrderRouter      = require('./routes/index');
var editAccountRouter      = require('./routes/index');
var deleteUserAccountRouter      = require('./routes/index');
var getfilterProductPageRouter      = require('./routes/index');
var filterProductRouter      = require('./routes/index');
var searchProductRouter      = require('./routes/index');

var getsearchProductPageRouter      = require('./routes/index');
var searchfilterProductRouter      = require('./routes/index');

var getWishlistRouter      = require('./routes/index');
var logoutRouter      = require('./routes/index');

/**** Route registration Ends ****/


/**** Admin Routes***
 *** Handles all Admin Info***/
 var adminRouter = require('./routes/admin')

 var getAdminDashboard = require('./routes/admin');
 var getAdminAddNewProduct = require('./routes/admin');
 var getAdminAllProducts = require('./routes/admin');
var getAdminAllCategory = require('./routes/all_category');
var getEditProduct = require('./routes/edit_product');
var processEditProduct = require('./routes/edit_product');
var processDeleteProduct = require('./routes/index');
var allCustomersRouter      = require('./routes/admin');
var uploadCategoryRouter      = require('./routes/admin');
var categoryRouter      = require('./routes/admin');
var allOrdersRouter      = require('./routes/admin');
var approveOrderRouter      = require('./routes/admin');
 /******End Admin Routing*****/

const validateCreatePostMiddleware=(req,res,next) =>{
    if(!req.body.email || !req.body.password){
        return res.render('users/login')
      
    }
    next();
    
}








var app = express();
/*const  checkIfLoggedInUserIsAdmin = (req,res,next) =>{
       User.findById(req.session.userId, (error, user)=>{
        req.session.role = user.role;
        if(req.session.role == 'admin'){
            next();
        
        }
             return res.redirect('/login') 
        
    })
}
*/
/*app.use("/admin/*", checkIfLoggedInUserIsAdmin, function(req,res,next){
         next();
     })
     */
// view engine setup
app.set('views', [path.join(__dirname, 'views'),
       path.join(__dirname, 'views/admin')
       
       ]);
app.set('view engine', 'ejs');
//use bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(check());

app.use(session({
    secret:'@iamstan007',
     resave:false,
   saveUninitialized:false,
    store:new MongoStore({
        mongooseConnection:mongoose.connection
    }),
    cookie:{maxAge: 180*60*1000}
}));
app.use(flash());


app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    res.locals.session = req.session;
     res.locals.messages = req.flash;
    next();
})


//create a gloabl variable
app.use(function(req,res,next){
     category.find(function(err,category){
      global.category = category;  
      next();
   });
});


//get all female products

app.use(function(req,res,next){
     //get all products for women
         product.find({category:'Women Clothing'}).sort({'_id': 'descending'}).limit(5).exec(function(err,women){
             global.women = women;
             next();
})
})




//get all male products

app.use(function(req,res,next){
     //get all products for men
         product.find({category:'Men Clothing'}).sort({'_id': 'descending'}).limit(5).exec(function(err,men){
             global.men = men;
             next();
})
})

//get all electronics
app.use(function(req,res,next){
     //get all products for men
         product.find({category:'Electronics'}).sort({'_id': 'descending'}).limit(6).exec(function(err,electronics){
             global.electronics = electronics;
             next();
})
})


//get all Home & Office Furnitures
app.use(function(req,res,next){
     //get all products for men
         product.find({category:'Home and Office Furniture'}).sort({'_id': 'descending'}).limit(5).exec(function(err,furniture){
             global.furniture = furniture;
             next();
})
})

//check if user is logged in
 //redirect if not logged in
app.use(function(req,res,next){
       User.findById(req.session.userId, (error, user)=>{
        
           global.user = user;
           next();
        
    })
})



app.use('/admin',  adminRouter)
/**** Register admin *******/
app.use('/dashboard', getAdminDashboard);
app.use('/add_new_product', getAdminAddNewProduct);
app.use('/all_products', getAdminAllProducts);
app.use('/all_category', getAdminAllCategory);
app.use('/edit_product', getEditProduct);
app.use('/edit_product', processEditProduct);
app.use('/delete_product', processDeleteProduct)
app.use('/customers', allCustomersRouter)
app.use('/category', categoryRouter)
app.use('/upload_category', uploadCategoryRouter)
app.use('/all_orders', allOrdersRouter)
app.use('/approve_delivery', approveOrderRouter)
/**end register admin***/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/shop', shopRouter);
app.use('/my-account', myAccountRouter);
app.use('/register', userRegistrationRouter);
app.use('/product/upload', productUploadRouter);
app.use('/product-details', productDetailsRouter);
app.use('/user_account_creation', processUserRegistrationRouter);
app.use('/login', UserLoginRouter);
app.use('/process_login',validateCreatePostMiddleware, processUserLoginRouter);
app.use('/add_to_cart',  addToCartRouter);
app.use('/shopping_cart', shoppingCartRouter);
app.use('/reduce',  reduceItemByOneRouter);
app.use('/remove',  removeItemRouter);
app.use('/remove_item', removeItemFromWishlistRouter)
app.use('/checkout',  checkoutRouter);
app.use('/complete_order', completeOrderRouter)
app.use('/my-account', editAccountRouter)
app.use('/delete_user', deleteUserAccountRouter)
app.use('/filter_products', getfilterProductPageRouter)
app.use('/filter_products', filterProductRouter)
app.use('/search_filter', getsearchProductPageRouter )
app.use('/search_filter', searchfilterProductRouter)
app.use('/add_to_wishlist',addToWishlistRouter)
app.use('/wishlist', getWishlistRouter)
app.use('/complete_order', getcompleteOrderRouter)
app.use('/search',searchProductRouter)
app.use('/logout',   logoutRouter);
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});
*/
//handle error 404

app.use(function(req,res){
  res.status(400);
    res.render('default/404',{title: 'iShop || Error 404'})
});
//handle error 500 in production
/*app.use(function(error,req,res,next){
    res.status(500);
    res.render('default/500')
})
*/

// error handler in development
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
