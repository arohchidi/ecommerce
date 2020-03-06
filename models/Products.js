var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProductSchema = new Schema({
    imagePath:{
    type:String,
    required:[true, 'Image Is Required']
    },
    title:{
    type:String,
       required:[true, 'Title is Required']
},
    description:{
        type:String,
        required:[true, 'Description is Required']
    },
    price:{
        type:Number,
        required:[true, 'Price is Required']
    },
    qty:{
        type:String,
       
    },
    sku:{
        type:String,
        
        
    },
    
    currency:{
        type:String,
        required:[true, 'Currency is Required']
    },
    tags:{
        
       type:Object,required:true
    },
    size:{
        type:String,
        required:false
    },
    color:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:[true, 'Category is Required']
    },
    listprice:{
        type:Number,
        
    }
  
    
    });
module.exports = mongoose.model('Products', ProductSchema);