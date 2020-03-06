module.exports = function Cart(oldCart){
  this.items = oldCart.items || {};
    this.totalQty =  oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    
    
    //add item to cart 
    this.add=function(item,id){
        var storedItems =  this.items[id];
        if(!storedItems){
            storedItems = this.items[id] = {item:item,qty:0,price:0}
        }
        storedItems.qty++;
        storedItems.price = storedItems.item.price * storedItems.qty;
        this.totalQty++;
        this.totalPrice += storedItems.item.price;
    };
    
    
    
    //add item to wishlist
    //add item to cart 
    this.addToWishlist=function(item,id){
        var storedItems =  this.items[id];
        if(!storedItems){
            storedItems = this.items[id] = {item:item,qty:0,price:0}
        }
        storedItems.qty++;
        storedItems.price = storedItems.item.price * storedItems.qty;
        this.totalQty++;
        this.totalPrice += storedItems.item.price;
    };
    
    
    //reduce item by one
    this.reduceByOne = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
        //delete item if qty is < <= 0
        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
        
    }
    //remove item 
    this.removeItem = function(id){
     this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price; 
        delete this.items[id];
    };
    
    this.generateArray = function(){
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
            
        }
         return arr;
    }
   
    
};