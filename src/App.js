import React, { useEffect }  from 'react';
import io from "socket.io-client"; 
import axios from 'axios';
//import {Helmet,  HelmetProvider} from "react-helmet-async";
//import useScript from './hooks/useScript';
import appendScript from './scriptadd/appendScript';
import './App.css';


function id_ran(){
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

const socket = io.connect("http://3.36.172.8:3001");  //백엔드 서버 포트를3001와 socket연결 
const state = "0";
var chat_num;
const id = id_ran();
const to = "admin";



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows:[],
            id: null,
            msg: null,
            to : null,
            state : null,
            machine : null
        };
        
        console.log("cons");
         
        
    }
    
    
    
    sendMsg = (e) => {
        e.preventDefault();
        
        var pcDevice = "win16|win32|win64|mac|macintel";
        var machine;

        // 접속한 디바이스 환경
        if (navigator.platform) {
          if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
            machine = "mobile";
          } else {
            machine = "pc";
          }
        }

        if (document.querySelector(".chat_text").value == "" || document.querySelector(".chat_text").value.length <= 0) {

        } else {        
            socket.emit("chat message", {		//"send message"라는 이벤트 발생 (1)
                id: id,
                msg: document.querySelector('.chat_text').value,
                to : to,
                state : state,
                machine : machine
            });
            document.querySelector('.chat_text').value = '';
            
            console.log(to);
            
            this.setState({
                id: id,
                msg: document.querySelector('.chat_text').value,
                to : to,
                state : state,
                machine : machine
            });

        }
    };
    
    
    sendenterMsg = (e) => {
        e.preventDefault();
        if (e.keyCode == 13) {
        
            var pcDevice = "win16|win32|win64|mac|macintel";
            var machine;
    
            // 접속한 디바이스 환경
            if (navigator.platform) {
              if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
                machine = "mobile";
              } else {
                machine = "pc";
              }
            }
    
            if (document.querySelector(".chat_text").value == "" || document.querySelector(".chat_text").value.length <= 0) {
    
            } else {        
                socket.emit("chat message", {		//"send message"라는 이벤트 발생 (1)
                    id: id,
                    msg: document.querySelector('.chat_text').value,
                    to : to,
                    state : state,
                    machine : machine
                });
                document.querySelector('.chat_text').value = '';
                
                console.log(to);
                
                this.setState({
                    id: id,
                    msg: document.querySelector('.chat_text').value,
                    to : to,
                    state : state,
                    machine : machine
                });
    
            }
        
        }
    };

    
    componentDidMount() {
        
      fetch('http://3.36.172.8:3001/api/portfolio',{
        method : "get",
        heades : {"Content-Type" : "application/json"}
      })
      .then(res=>res.json())
      .then(data => this.setState({rows:data.rows}) );
      
      
      socket.emit('joinRoom', to, id);
      socket.emit('chat_num_update', function(to, chat_num){});
      
      document.querySelector(".chat_space").scrollTop = document.querySelector(".chat_space").scrollHeight;
            
     
      socket.on('chat message',(rows)=>{
        let date = new Date();
        
        this.setState({rows:rows});

        //document.querySelector('.chat_space_ul').append("<li><div className='msg'>"+msg+"</div><div className='nickname'>"+id+"</div><div className='time'>"+msgtime+"</div></li>");
        document.querySelector(".chat_space").scrollTop = document.querySelector(".chat_space").scrollHeight;
    
      });
      
      
      socket.on('leaveRoom', function(to, id, chat_num){

        this.chat_num = chat_num;

        document.querySelector(".chat_num").innerHTML = this.chat_num;

      });

      socket.on('joinRoom', function(to, id, chat_num){

         this.chat_num = chat_num;

         document.querySelector(".chat_num").innerHTML = this.chat_num;

      });
      
      
     socket.on('chat_num_update', function(chat_num){

        this.chat_num = chat_num;
        document.querySelector(".chat_num").innerHTML = this.chat_num;

     });
        

  
        //appendScript("js/jquery.js");
        //appendScript("js/jquery-ui.js");
        appendScript("js/portfolio.js");
        appendScript("js/socket_io.js");
       // appendScript("js/chatting.js");
      
        console.log("didmount");
        
    }
    


  render() {
      
    console.log("render");
      
      const {rows} = this.state;
    
 
      const chat_html = () => {
          var result = [];
        for(var i=0; i<rows.length; i++){
          result.push(<li key={i}><div className="msg">{rows[i].msg}</div><div className="nickname">{rows[i].id}</div><div className="time">{rows[i].msgtime}</div></li>);
        }
        return result;
      }
                   

        
      
    return (
        <div className="App">
        
            <div className="server_info">
                <div>Server : NODE.JS</div>
                <div>Client : REACT</div>
                <div>Cloud : AWS EC2</div>
                <div>DB : AWS RDS</div>
            </div>


            <div className="user_form">

                <div className="photo"></div>

                <div className="user_info">
                    <ul className="user_info_ul">
                        <li>나이 : 30</li>
                        <li>주소 : 부산 북구 화명 양달로 80-11 102동 1401호</li>
                        <li>e-mail : sasaa3865@naver.com</li>
                        <li>휴대폰 : 010 - 7615 - 3865</li>
                    </ul>
                </div>


                <table className="univ_info">
                    <thead>
                      <tr>
                        <th>재학기간</th> 
                        <th>상태</th>
                        <th>학교명</th>
                        <th>전공</th>
                        <th>학점</th>
                      </tr>
                    </thead>
        
                    <tbody>
                        <tr>
                            <td>2012.03 ~ 2018.02</td>
                            <td>졸업</td>
                            <td>동의대학교</td>
                            <td>정보통신공학과</td>
                            <td>3.72/4.5</td>
                        </tr>
        
                        <tr>
                            <td>2009.02 ~ 2012.02</td>
                            <td>졸업</td>
                            <td>낙동고등학교</td>
                            <td>이과</td>
                            <td>-</td>
                        </tr>
                    </tbody>
        
                </table>
        
            </div>
        
        
        
            <div className="user_career">
        
                <table className="user_career_info">
        
                    <colgroup>
                        <col width="27%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="13%" />
                    </colgroup>
        
        
        
                    <thead>
                      <tr>
                        <th>근무기간</th>
                        <th>회사명</th>
                        <th>소재지</th>
                        <th>직종</th>
                        <th>연봉</th>
                      </tr>
                    </thead>
        
                    <tbody>
                        <tr>
                            <td>2018.06 ~ 2019.07</td>
                            <td>슈퍼셀<br/>(영상제작 업체)</td>
                            <td>해운대</td>
                            <td>개발팀(팀원)</td>
                            <td>2280(만)</td>
                        </tr>

                       
                    </tbody>
                </table>
        
        
        
                <div className="user_career_reason">
                    <ul className="user_career_reason_ul">
                        <li>기술스택 : NODEJS, PHP , HTML, CSS, JS(jquery) )</li>
                    
                        <li className="user_career_reason_li">
                           
        
                            <div className="user_career_reason_div">
                                
                                해운대구 센텀시티에 위치한 슈퍼셀(영상제작회사) 에서 회사 대표 홈페이지를 제작하고<br/>
                                카페24, 그누보드(php) 등의 플랫폼 쇼핑몰에 기능을 수정하여 <br/>
                                디자인 변경, 기능추가 등의 작업을 하였습니다.<br/>
        
                            
                            </div>
        
        
                            <div className="user_career_reason_div">
                                
        
                            
                            </div>
        
        
                        </li>
                    </ul>
                </div>
        
            </div>
        
        
        
            <div className="user_career_2">
        
                <table className="user_career_info_2">
        
                    <colgroup>
                        <col width="27%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="13%" />
                    </colgroup>
        
        
        
                    <thead>
                      <tr>
                        <th>근무기간</th>
                        <th>회사명</th>
                        <th>소재지</th>
                        <th>직종</th>
                        <th>연봉</th>
                      </tr>
                    </thead>
        
                    <tbody>
                        
                        <tr>
                            <td >2020.12 ~ 재직중</td>
                            <td>위즈메이드</td>
                            <td>부산 금정구</td>
                            <td>개발팀(팀원)</td>
                            <td>2400(만)</td>
                        </tr>
                       
                    </tbody>
                </table>
        
        
        
                <div className="user_career_reason_2">
                    <ul className="user_career_reason_ul_2">
                        <li>기술스택 : PHP, JAVA, SWIFT, HTML, CSS, JS(jquery) )</li>
                    
                        <li className="user_career_reason_li_2">
                           
        
                            <div className="user_career_reason_div_2">
                                
                                주로 스타트업의 외주 프로젝트를 받아 작업하였습니다.
                                온라인 교육영상, 주차현황 조사 등 다양한 프로젝트를 수행하였습니다.
        
                            
                            </div>
        
        
                            <div className="user_career_reason_div_2">
                                
        
                            
                            </div>
        
        
                        </li>
                    </ul>
                </div>
        
            </div>
        
        
        
            <div className="user_certifi">
        
                <table className="user_certifi_info">
        
                    <colgroup>
                        <col width="33%" />
                        <col width="33%" />
                        <col width="33%" />
                    </colgroup>
        
                    <thead>
                      <tr>
                        <th>취득일</th>
                        <th>자격증</th>
                        <th>발행처</th>
                      </tr>
                    </thead>
        
                    <tbody>
                        <tr>
                            <td rowSpan="2">2020.11.12</td>
                            <td>정보처리기사</td>
                            <td>산업인력공단</td>
                         
                        </tr>
                       
                    </tbody>
                </table>
        
        
        
        
            </div>
            
            
        


            <div className="chat">
        
                <div className="chat_num_div">
                    <span>현재 접속자 수 : </span>
                    <span className="chat_num"></span>
                </div>
        
        
                <div className="chat_space">
                    <ul className="chat_space_ul">
                    
                        {chat_html()}
        
                    </ul>
                    
                </div>
        
        
                <div className="chat_div">
                    <input type='text' className="chat_text" onKeyUp={this.sendenterMsg} />
                    <input type='button' className="send_button" onClick={this.sendMsg} value="send"/>
                </div>
        
            </div>

        </div>
        
        
        
    );
  }
}

export default App;
