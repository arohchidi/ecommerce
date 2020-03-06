var express = require('express');
var router = express.Router();
var Products = require('../models/Products')
 var User = require('../models/User')
 
 const multer = require('multer');
const path = require('path');
const checkIfAdmin = (req,res,next) =>{
       User.findById(req.session.userId, (error, user)=>{
        req.session.role = user.role;
           
        if(req.session.role != 'admin'){
            
             return res.redirect('/')
           
        }
          next();
          
        
    })
}


/* GET home page. */
router.get('/:id', checkIfAdmin, function(req, res, next){
    
      const products =  Products.findById(req.params.id, function(error, products){
              
       User.find({_id:req.session.userId}, function(error, user){
             console.log(user)
        res.render('default/edit_product', {title: 'Admin  || Edit Product', products:products,user:user, uploadError:req.flash('uploadError'),
		 editSuccess:req.flash('editSuccess')});
       
        })
      
      })
      
})


 
 
 

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



/**handle product upload**/
router.post('/edit_product/:id', checkIfAdmin, function(req,res){
   upload(req, res, (error)=>{
       var fullPath = "images/"+req.file.filename;
       var document = {
           imagePath:fullPath,
           title:req.body.title,
           description:req.body.description,
           price:req.body.price,
           qty:req.body.qty,
           size:req.body.size,
           color:req.body.color,
           category:req.body.category,
           sku:req.body.sku,
           currency:req.body.currency,
           tags:req.body.tags
       };
       
       var update = Products.findByIdAndUpdate(req.params.id,{$set:req.body}, function(error, products){
           if(error){
               req.flash('uploadError', 'something went wrong');
               return res.redirect('back'); 
           }
		   else{
			   req.flash('editSuccess', 'product was edited successfully');
			  
			     return  res.redirect('back'); 
		   }
           
       
       });
           
            
       
   }) 
});




/**handle product deletion**/
/*router.post('/delete_product/:id', checkIfAdmin,function(req,res){
   console.log(req.params.id);
        Products.findByIdAndRemove(req.params.id, function(error){
            if(error){
                return res.redirect('back');
            }
             req.flash('deletionSuccess', 'item has been deleted');
           return  res.redirect('back'); 
            
        })
            
       
   }) 
   */

module.exports = router;