var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var DepartmentSchema = new Schema({
    
    name:{
    type:String,
       required:[true, 'Sub-category Name is Required']
},
   category_name:{type:String,
          required:[true,'Parent Name is required']
          },
   
    
    
   user:{type:Schema.Types.ObjectId, ref: 'Category'},
    
    });
module.exports = mongoose.model('Department', DepartmentSchema);