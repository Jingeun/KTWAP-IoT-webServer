var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.islogin == null || req.session.islogin == false){
		res.render('index', { title: 'Express' });
	}else{
		res.redirect("/main");
	}
  

});

module.exports = router;
