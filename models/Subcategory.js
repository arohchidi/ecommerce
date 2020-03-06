var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SubCategorySchema = new Schema({
    
    name:{
    type:String,
       required:[true, 'Sub-category Name is Required']
},
   category_name:{type:String,
          required:[true,'Parent Name is required']
          },
   sub:{type:Schema.Types.ObjectId, ref: 'Subcategory'},
    
    
   
    
    });
module.exports = mongoose.model('Subcategory', SubCategorySchema);