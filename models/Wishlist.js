module.exports = function Wishlist(oldCart){
  this.items = oldCart.items || {};
    this.totalQty =  oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    
    
   
    
    //add item to wishlist
    
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