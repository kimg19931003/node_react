const express = require('express');
const router = express.Router();
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

router.get('/portfolio', (req, res)=>{
    
   
        db.query("select * from chat", function(err,rows,fields){
            if(err){
                console.log("실패");
                res.send({msg:"fail"})
            }else{
                console.log("성공");
                res.send({rows:rows});

            };
        });
 
});

module.exports = router;