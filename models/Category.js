var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CategorySchema = new Schema({
    
    category_name:{
    type:String,
       required:[true, 'Category Name is Required']
}
    
    
   
    
    });
module.exports = mongoose.model('Category', CategorySchema);