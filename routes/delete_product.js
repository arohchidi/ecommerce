var express = require('express');
var router = express.Router();
var Products = require('../models/Products')
 
const checkIfAdmin = (req,res,next) =>{
       User.findById(req.session.userId, (error, user)=>{
        req.session.role = user.role;
           
        if(req.session.role != 'admin'){
            
             return res.redirect('/')
           
        }
          next();
          
        
    })
}
/**handle product deletion**/
router.post('/delete_product/:id',checkIfAdmin, function(req,res){
   
        Products.findByIdAndRemove(req.params.id, function(error){
            if(error){
                return res.redirect('/');
            }
            res.render('default/shop')
            
        })
            
       
   }) 







module.exports = router;