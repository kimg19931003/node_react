const express = require('express');
const router = express.Router();
const mysql = require("mysql"); // mysql 모듈 사용

var db = mysql.createConnection({
	host: 'portfolio.ceet7aliyhfo.ap-northeast-2.rds.amazonaws.com',
	port: 3306,
	user: 'kim',
	password: 'dkdlfjsl',
	database: 'portfolio',
	connectionLimit: 20
});





router.get('/portfolio', (req, res)=>{
    
   
        db.query("select * from chat", function(err,rows,fields){
            if(err){
                console.log("실패");
                res.send({msg:"fail"})
            }else{
                console.log("성공");
                //db.end();
                res.send({rows:rows});

            };
        });
 
});

module.exports = router;