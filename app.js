var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var mysql = require("mysql");


var routes = require('./routes/index');
var users = require('./routes/users');
var main = require('./routes/main');
var logout = require('./routes/logout');
var place = require('./routes/place');
var register = require('./routes/register');

var app = express();
var userDBInfo = {
  user:'root',
  password:'pknuwapdb!'
};
var db = mysql.createConnection(userDBInfo);
handleDisconnect(db);

function handleDisconnect(client) {
  client.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;


    console.error('> Re-connecting lost MySQL connection: ' + error.stack);

    // NOTE: This assignment is to a variable from an outer scope; this is extremely important
    // If this said `client =` it wouldn't do what you want. The assignment here is implicitly changed
    // to `global.mysqlClient =` in node.
    db = mysql.createConnection(userDBInfo);
    handleDisconnect(db);
    db.connect();
  });
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Session
app.use(session({
  secret: 'KT WAP PROJECT',
  resave: false,
  saveUninitialized: true
}));

app.use('/', routes);
app.use('/users', users);
app.use('/main', main);
app.use('/logout', logout);
app.use('/place', place);
app.use('/register', register);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;

var io = socketio.listen(9900);
var dateFormat = require("dateformat");
console.log("============= START WEB SOCKET SERVER!! ================");
io.sockets.on('connection', function(socket){
  console.log("HelloWorld");

  // 디바이스 이벤트 처리 
  socket.on("device", function(device){
    //디바이스를 연결 하기전 존재하는 디바이스인지 검사
    console.log("HI DEVICE "+device.ID);
    db.query("USE kt_wap;");
    var sql = "SELECT * FROM device_list WHERE dev_serial_no = '"+device.ID+"';";

    db.query(sql, function(error, results, fields){
      if(error){
        console.log("==== 디바이스 검색 쿼리 오류 ====");
      }else{      
        // 관리 대상의 디바이스라면 정상 진행 
        if(results.length > 0){     

          socket.room = device.ID;

          io.sockets.emit('device_on_list', {device_id : socket.room});
          socket.join(device.ID);
          console.log("ok device allow. I listen to your Information");
         // socket.emit("allow", {});

          /*
            이곳에 각종 이벤트 정의
          */
           // 디바이스로부터 처리할 프로토콜 정의 
           
           // 장비로부터 센서 측정값을 받았을때
          socket.on("detail_info", function(device){
            console.log("디바이스로부터 데이터를 받았단다 ");
            // ID,  temp, h2s, co, etc1, etc2, etc3
            db.query("USE kt_wap;");
            var id = device.device.ID;
            var temp = device.device.TEMP;
            var h2s = device.device.H2S;
            var co = device.device.CH4;
            var etc1 = device.device.ETC1;
            var etc2 = device.device.ETC2;
            var etc3 = device.device.ETC3;
            //var ... N
            var currDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            var insertSql = "INSERT INTO device_data_log values( 0, '"+id+"', "+temp+", "+h2s+", "+co+", '"+currDate+"');";
            console.log("query : ", insertSql);
            var getMaxLimit = "SELECT * FROM limit_value_log ORDER BY set_time DESC LIMIT 1;";

            db.query(insertSql, function(error){
              if(error){
                console.log("디바이스 - 데이터 입력 쿼리 오류");
              }
            });

            db.query(getMaxLimit, function(error, results, fields){
              if(error){
                console.log("디바이스 - 기준치 검색 쿼리 오류");
              }else{
                // 필요한 변수 
                var std           = results[0];
                var stH2s_level   = 0;
                var stH2s_name    = "Normal";
                var stTemp_level   = 0;
                var stTemp_name    = "Normal";
                var stCo_level   = 0;
                var stCo_name    = "Normal";

                //기준치 
                var temp_warning  = std.temp_warning;
                var temp_danger   = std.temp_danger;
                var h2s_warning   = std.h2s_warning;
                var h2s_danger    = std.h2s_danger;
                var co_warning    = std.co_warning;
                var co_danger     = std.co_danger; 

                // 1 정상 2 경고 3 위험 
                // 각 센서들의 상태 측정

                //온도 상태 점검
                if(temp >= temp_danger){
                  // 온도 위험
                  stTemp_level = 3;
                  stTemp_name = "Danger";
                }else if(temp >= temp_warning){
                  // 온도 경고
                  stTemp_level = 2;
                  stTemp_name = "Warning";
                }else {
                  //온도 정상 
                  stTemp_level = 1;
                  stTemp_name = "Normal";
                }

                // 황화수소 상태 점검 
                if(h2s >= h2s_danger){
                  // 황화수소 위험
                  stH2s_level = 3;
                  stH2s_name = "Danger";
                }else if(h2s >= h2s_warning){
                  // 황화수소 경고
                  stH2s_level = 2;
                  stH2s_name = "Warning";
                }else {
                  //황화수소 정상 
                  stH2s_level = 1;
                  stH2s_name = "Normal";
                }

                // 메탄 상태 점검
                if(co >= co_danger){
                  // ch4 위험
                  stCo_level = 3;
                  stCo_name = "Danger";
                }else if(co >= co_warning){
                  // ch4 경고
                  stCo_level = 2;
                  stCo_name = "Warning";
                }else {
                  //ch4 정상 
                  stCo_level = 1;
                  stCo_name = "Normal";
                }

                db.query("USE kt_wap;");
                //state_no, dev_serial_no, state_name_no, state_date

                // 장비들의 측정값을 삽입하는 쿼리
                var ins_state = "INSERT INTO device_state_log values(0, '"+id+"', "+stH2s_level+", '"+currDate+"');";

                db.query(ins_state, function(error){
                  if(error){ console.log("디바이스 - 상태 삽입 쿼리 오류");}
                  else {
                    var response = {
                      dev_name        : id,
                      dev_temp        : temp,
                      dev_h2s         : h2s,
                      dev_co          : co,
                      dev_stCo_name   : stCo_name,
                      dev_stTemp_name : stTemp_name,
                      dev_stH2s_name  : stH2s_name
                    };
                    console.log("Send Room Name : ", socket.room);
                    io.sockets.in(socket.room).emit("detail_device_info", response);
                    io.sockets.emit("device_state", response);
                  }
                });
              }
            });

            
          });


          socket.on("recv_display", function(device){
            // console.log("base64 : ", device.base64);
            var date = new Date();
            device.date = date.toLocaleTimeString()
            io.sockets.in(socket.room).emit("real_time_image", device);
          });
          
          //디바이스로 부터 전원이 ON이 되어있음을 받았음
          socket.on("Req", function(){
            console.log("device Name : ", socket.room);
            io.sockets.emit("device_on_list", { device_id : socket.room});
          });
          

        }
      }
    });
  });


  // 브라우저 처리
  socket.on("browser", function(browser){

    console.log("ok browser, what kind page?");
    socket.emit("allow",null);

    // 브라우저 현재 페이지가 /main 이다 
    socket.on("main", function(data){
      console.log("ok main");

      // 브라우저가 현재 장비들의 전원 ON/ OFF 여부를 알기위하여 
      // 장비들에게 전원 ON/OFF 상태 요청
      io.sockets.emit("Active", {});

      // 각 센서 임계값 설정 요청
      socket.on("req_limit_value", function(data){
        var temp_war = Number(data.temp_warning);
        var temp_dan = Number(data.temp_danger);
        var h2s_war = Number(data.h2s_warning);
        var h2s_dan = Number(data.h2s_danger);
        var co_war = Number(data.co_warning);
        var co_dan = Number(data.co_danger);
        var currDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

        // 임계값 삽입 쿼리
        var insertSql = "INSERT INTO limit_value_log values(0, "+temp_war+", "+temp_dan+", "+h2s_war+", "+h2s_dan+", "+co_war+", "+co_dan+", '"+currDate+"');";
        
        db.query("USE kt_wap;");
        db.query(insertSql, function(error){
          if(error){
            console.log("기준치 삽입 쿼리 오류 : ", error);
          }else{
            socket.emit('res_limit_value', {});
          }
        });
      });
    });

    // 브라우저 현재 페이지가 /place 이다
    socket.on("detail", function(browser){
        socket.room = browser.place_no;
        socket.join(socket.room);
        console.log("ok detail Room Name : ", socket.room);

    });
  });


  // 클라이언트가 연결이 해제 되었을때
  socket.on("disconnect", function(){
    console.log("꺼짐 : ", socket.room);
    io.sockets.emit("device_off_list", {device_id : socket.room});
    socket.leave(socket.room);
    console.log("========DISCONNECTED!!!======");
  });
});


setInterval( function() {
  console.log("===== DB CONNECTION PULL EXECUTE!!! ======");
  db.query("USE kt_wap;");
}, 3600000);
