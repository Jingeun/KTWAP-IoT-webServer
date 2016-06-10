var express = require('express');
var router = express.Router();
var mysql = require('mysql');				// 디비 모듈 가져오기

var dbUserInfo = { user:'root', password:'pknuwapdb!'};


/* GET home page. */
router.get('/', function(req, res, next) {
 // res.send(req);
  if(req.session.islogin == true){
    responseMain(req,res);
  }else{
  	res.redirect('http://ktwap.kro.kr');
  }
});


router.post('/', function(req, res, next) {
  // POST값 가져오기 
  var user_id = req.body.id;
  var user_pwd = req.body.pwd;
  var conn = mysql.createConnection(dbUserInfo);
 // console.log("SESSION : ", req.session);
  // DB 쿼리 
  conn.query('USE kt_wap');
  var sql = "SELECT * FROM member WHERE member_id = '"+user_id+"' AND member_pwd = PASSWORD('"+user_pwd+"')";
  // 쿼리 실행 
  conn.query(sql, function(error, result, fields){
  		//구문 오류일 경우
  		if(error){
  			console.log("쿼리 문장에 오류가 있습니다.");
  		}else{
  			if(result.length > 0){
  				req.session.islogin = true;
          req.session.member_id = result[0].member_id;
          responseMain(req, res);
  			}else{
  				console.log("로그인 실패!");
  				//
  				//res.send("<html><body><script type='javascript'> alert('아이디 또는 비밀번호가 틀렸습니다.'); </script></body></html>");
  				res.redirect('http://ktwap.kro.kr');
  			}
  		}
  });
  conn.end();
});


function responseMain(req,res){
    var conn = mysql.createConnection(dbUserInfo);
    conn.query('USE kt_wap');
    var devList_SQL = "SELECT * FROM device_list";
    var dev_list;
    conn.query(devList_SQL, function(error, result, fields){
      console.log("디바이스 조회");
      if(error){
        console.log("디바이스 조회 쿼리 오류 ");
      }else{
        console.log("디바이스 조회 결과 : ", result);
        dev_list = result;
        res.render('main', { title: '하수종말 처리 관리', id: req.session.member_id, list: dev_list});        
      }
    });
    conn.end();
}
module.exports = router;
