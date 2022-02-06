
const chat_init = (rows) => {
  
      var result = [];
      for(var i=0; i<rows.length; i++){
        result.push(<li key={i}><div className="msg">{rows[i].msg}</div><div className="nickname">{rows[i].id}</div><div className="time">{rows[i].msgtime}</div></li>);
      }
    
      if(rows.length == 0){
        result.push(<li key={i} style={{boxShadow:"0px 0px 0px #ffffff"}}>댓글이 없습니다.</li>);
      }
 
    return result;
      
};

export default chat_init;