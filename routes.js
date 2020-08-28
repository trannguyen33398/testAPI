const express  = require('express')
const router   = express.Router();
const passport = require('passport')

module.exports = (function() {   

    router.get('/', function(req, res){
		res.json({ user: user });
	});
    
    router.get('/login', function(req, res){
		res.json({msg: "login failed"});
	});
    
    router.get('/account', ensureAuthenticated, function(req, res){
	  res.render('account', { user: req.user });
	  console.log(req.user)
	});

	router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

	router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });

	router.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

    return router;    
})();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}