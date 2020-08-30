const express  = require('express')
const router   = express.Router();
const passport = require('passport')

module.exports = (function() {   

    router.get('/', function(req, res){
	    res.render('index', { user: req.user });
	});
    
    router.get('/login/success', function(req, res){
	  //Return to page login
	 
		res.json({
		  success: true,
		  message: "user has successfully authenticated",
		  user: req.user,
		  cookies: req.cookies
		});
	  
	});
    
    router.get('/account', ensureAuthenticated, function(req, res){
	  res.render('account', { user: req.user });
	});

	router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

	router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login/failed' }),
	  function(req, res) {
		console.log(req.user)
	    res.redirect('/');
	  });

	router.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});
	router.get("/login/failed", (req, res) => {
		res.status(401).json({    
		  success: false,
		  message: "user failed to authenticate."
		});
	  });
    return router;    
})();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}