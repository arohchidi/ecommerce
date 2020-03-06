 var passport =require('passport');
 var User      = require('../models/User');
  var localStrategy  = require('passport-local').Strategy;
passport.serializeUser(function(user,done){
    done(null,user.id)
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err, user){
		 done(err,user);
    });
    
});

passport.use('local.signup', new localStrategy({
    usernameField:'email',
    passwordField:'password',
	
    
    passReqToCallBack:true
	
},function(req, email,password,done){
    User.findOne({'email':email}, function(err,user){
        
        if(err){
            return done(err);
        }
	
        //check if email is taken
        if(user){
            return done(null,false,{message:'Email is already in use'});
        }
        //if email is not taken
        var newUser =new  User()
        newUser.email = email;
        newUser.password =newUser.encryptPassword(password);
		 
        newUser.save(function(err,result){
			
            if(err){
            return done(err);
            }
            return done(null,newUser);
            
        });
    })
    
}));