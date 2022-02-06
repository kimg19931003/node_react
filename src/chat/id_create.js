function id_create(){
      var arr = new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','w','y','z');
      var num_arr = new Array('1','2','3','4','5','6','7','8','9','0');
      var id_temp = "손님";

      for(var i=0; i<4; i++){
        var ran = Math.floor(Math.random()*10);
        id_temp = id_temp + arr[ran];
      }

      for(var i=0; i<4; i++){
        var ran = Math.floor(Math.random()*10);
        id_temp = id_temp + num_arr[ran]; 
      }
 
    return id_temp;     
}


export default id_create;