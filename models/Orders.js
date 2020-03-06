



var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var OrderSchema = new Schema({
   user:{type:Schema.Types.ObjectId, ref: 'User'},
    cart:{type:Object,required:true},
    firstname:{type:String,required:true},
    lastname: {type:String,required:true},
    country:  {type:String,required:true},
    address:{type:String,required:true},
    town:   {type:String,required:true},
    createdAt:{type:Date,
    default: new Date()
                 },
    phone:{type:String,required:true},
    
    state:{type:String, required:true},
    paymentMethod:{type:String},
    orderId:{type:String},
    deliveryDate:{type:String},
    status:{
        type:String,
        default:'Not Delivered'
    }
  
    });
module.exports = mongoose.model('Order', OrderSchema);