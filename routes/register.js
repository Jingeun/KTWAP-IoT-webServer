var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbUserInfo = { user:'root', password:'pknuwapdb!'};

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(req.session.islogin == true){
		res.render('register', { title: '하수종말 처리 관리', id: req.session.member_id});        
	}else {
		res.redirect("/");
	}
  
});

router.post('/execute', function(req, res, next) {
	if(req.session.islogin == true){
		var conn 					= mysql.createConnection(dbUserInfo);
		var dev_serial 				= req.body.dev_serial;
		var place_name				= req.body.place_name;
		var address1				= req.body.address1;
		var address2				= req.body.address2;
		var address3				= req.body.address3;
		var address_detail			= req.body.address_detail;
		var insertSql = "INSERT INTO device_list values(0, '"+dev_serial+"', '"+place_name+"', '"+address1+"', '"+address2+"', '"+address3+"', '"+address_detail+"')";
		conn.query("USE kt_wap;");
		conn.query(insertSql, function(error){
			if(error){
				console.log("디바이스 등록 에러 : ", error);
				res.send("<script>alert('등록에 실패 하였습니다!');document.location.href='http://ktwap.kro.kr/';</script>");
				//res.render('register', { title: '하수종말 처리 관리', id: req.session.member_id});        		
			}else{
				res.redirect("/main");		
			}
		});
		conn.end();
	}else {
		res.redirect("/");
	}
	
	
  
});

module.exports = router;
