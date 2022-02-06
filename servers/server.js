const express = require('express');
const app = express();
const moment = require("moment");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;
const route = require('./routes/index');
const mysql = require("mysql"); // mysql 모듈 사용



var db;

function handleDisconnect() { 
	/*
  db.connect(function(err) {            
    if(err) {                            
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                   
  });                            
	*/
	
	db = mysql.createConnection({
		host: 'portfolio.ceet7aliyhfo.ap-northeast-2.rds.amazonaws.com',
		port: 3306,
		user: 'kim',
		password: 'dkdlfjsl',
		database: 'portfolio',
		connectionLimit: 20
	});
	
	
	
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      return handleDisconnect();                      
    }
    else if(err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR'){
      return handleDisconnect();       	
    }
    else {                                    
      throw err;                               
    }   
  });
}


handleDisconnect();


app.use(cors());

app.use(bodyParser.json());
app.use('/api', route); 

var http = app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
});



const io = require('socket.io')(http, {
	cors: {
		origin :"*",
        credentials :true,
        methods:["GET","POST"]
    }
});





var chat_num = 0;

db.query('select * from chat_num', function (err, rows, fields) {

	if(err){
		console.log(err);
	}else{
		if(rows.length > 0){
			chat_num = rows[0].chat_num != "" ? rows[0].chat_num : 0;
		
		}
	}
});


io.on('connection', (socket) => {


	socket.on('disconnect', () => {

		
		db.query('select * from chat_num', function (err, rows, fields) {

			if(err){
				console.log(err);
			}else{
				if(rows.length > 0){ 
					
					
					console.log('user disconnected' + socket.id);
					console.log("disconnect");
					
					var chat_num = rows[0].chat_num;

					if(chat_num != 0){
						chat_num = chat_num - 1;
					}
					console.log("disconnect :"+chat_num);
					
					
					
					db.query('update chat_num set chat_num = ?', [chat_num], function (err, rows1, fields) {
					
						if (err) {
							console.log(err);
						}
						else {
							console.log("disconnect_update :"+chat_num);
							io.to("admin").emit('chat_num_update', chat_num);
							
						}
					});
					
					
				}
			}
		});




	});



	/////////////////// 채팅방을 떠날때 //////////////////////

	socket.on('leaveRoom', (to, id) => {
		console.log("leaveRoom");
		socket.leave(to);
	});


	/////////////////// 채팅방을 떠날때 //////////////////////



	/////////////////// 채팅방에 입장할때 //////////////////////

	socket.on('joinRoom', (to, id) => {
		
		console.log("joinRoom"+to);
				console.log(chat_num);
		
		socket.join(to, () => {
			
			
		});
	});


	/////////////////// 채팅방에 입장할때 //////////////////////


	////////////////// 주기적 채팅방 인원 업데이트 ///////////////

	socket.on('chat_num_update', (to, chat_num) => {
		
		console.log("chat_num_update");
		
				/*
			while (chat_flag) {
				chat_flag = chat(id).flag;
				id = chat(id).id;
			}
				*/
				
					
				
			db.query('select * from chat_num', function (err, rows1, fields) {

				if(err){
					console.log(err);
				}else{
					if(rows1.length > 0){
						chat_num = rows1[0].chat_num;
						console.log(chat_num+" 1번");
						chat_num = chat_num + 1;
						
							db.query('update chat_num set chat_num = ?', [chat_num], function (err, rows2, fields) {
								if (err) {
									console.log(err);
								}
								else {
									db.query('select * from chat_num', function (err, rows3, fields) {
				
										if(err){
											console.log(err);
										}else{
											if(rows3.length > 0){
												chat_num = rows3[0].chat_num != "" ? rows3[0].chat_num : 0;
												
												console.log(chat_num+" 2번");
												io.to(to).emit('chat_num_update', chat_num);
											}
										}
									});
								}
							});
					}
				}
			});


	});


	////////////////// 주기적 채팅방 인원 업데이트 ///////////////


	//////////////////// 메세지 입력할때 //////////////////////////

	var chat_flag = false;

	socket.on('chat message', (item) => {
	
		console.log("chat message");

		var ip = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;


		var m = moment();
		var msgtime = m.format("YYYY년MM월DD일 HH:mm:ss dddd");


		db.query('insert into chat(msg, state, msgtime, ip, tochat, machine, id) values(?,?,?,?,?,?,?)', [item.msg, item.state, msgtime, ip, item.to, item.machine, item.id], function (err, rows, fields) {

			if (err) {
				console.log(err);
				
			}
			else {
				//io.to(item.to).emit('chat message', item.to, item.id, item.msg, msgtime, item.machine);
				
				db.query('select * from chat', function (err, rows, fields) {
					if (err) {
						console.log(err);
					}
					else {
					    console.log("sended"+item.to);
						io.to(item.to).emit('chat message', rows);
					}
				});
			 
			}


		});
	});
});








//////////////////// 함수 기능 모음 ////////////////////////



//////////////  chat id 가 겹치는지를 확인 
function chat(id) {


	var arr = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'y', 'z');
	var num_arr = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
	var id_temp = "손님";

	for (i = 0; i < 4; i++) {
		var ran = Math.floor(Math.random() * 10);

		id_temp = id_temp + arr[ran];
	}


	for (i = 0; i < 4; i++) {
		var ran = Math.floor(Math.random() * 10);

		id_temp = id_temp + num_arr[ran];
	}

	var id = id_temp



	db.query('select * from chat where id = ?', [id], function (err, rows, fields) {   //////// db 에 저장된 랜덤 id 대조

		if (err) {
			console.log(err);
		}
		else {
			if (rows.length != 0) {

				var value = { id: id, flag: true };
				return value;

			} else {

				var value = { id: id, flag: false };
				return value;

			}

		}


	});



}
