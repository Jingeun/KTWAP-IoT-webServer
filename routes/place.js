var express = require('express');
var mysql = require("mysql");
var router = express.Router();
var dbUserInfo = { user:'root', password:'pknuwapdb!'};
/* GET users listing. */
router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
	// console.log("get : ", req.method);
	

	
	if(req.session.islogin == true){
		var device_no = req.query.no;
		var conn 					= mysql.createConnection(dbUserInfo);
		var selectSql = "SELECT * FROM device_list WHERE dev_serial_no = '"+device_no+"';"
		conn.query("USE kt_wap;");
		conn.query(selectSql, function(error, result, fields){
			if(error){
				console.log("DB Query Error : ", error);
			}else{
				if(result.length > 0){
					var name = result[0].dev_name;
					var address1 = result[0].dev_addr1;
					var address2 = result[0].dev_addr2;
					var address3 = result[0].dev_addr3;
					var address4 = result[0].dev_addr4;

					var data  = { 
						id 				: req.session.member_id ,
						dev_no 			: device_no, 
						dev_name 		: name, 
						dev_address1 	: address1,
						dev_address2	: address2,
						dev_address3	: address3,
						dev_address4	: address4
					};
					res.render('place', data);
				}else{
					res.send("<script> alert('비정상적인 방법으로 접근하셨습니다.'); document.location.href='/main'; </script>");
				}
			}
		});
		conn.end();
	}else {
		res.redirect("/");
	}
});

router.post('/', function(req, res, next) {
  res.render('place');
});

module.exports = router;
