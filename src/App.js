import React from 'react';
//import {Helmet,  HelmetProvider} from "react-helmet-async";
//import useScript from './hooks/useScript';
import appendScript from './scriptadd/appendScript';
import logo from './logo.svg';
import './App.css';


/*
const MyComponent = props => {
  useScript('./js/jquery.js');
  useScript('./js/jquery-ui.js');
  useScript('./js/portfolio.js');
}
*/


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:null
        };
        
        console.log("cons");
        
        
    }
    

    
    componentDidMount() {
      fetch('http://3.36.0.231:3001/api')
        .then(res=>res.json())
        .then(data=>this.setState({username:data.username}));
        
        appendScript("js/jquery.js");
        appendScript("js/jquery-ui.js");
        appendScript("js/portfolio.js");
        appendScript("js/socket_io.js");
        appendScript("js/chatting.js");
      
        console.log("didmount");
        
    }
    


  render() {
      
      
        console.log("render");
      
    const {username} = this.state;
    return (
        <div className="App">
        
            <div className="server_info">
                <div>SERVER : NODE.JS{this.state.username}</div>
                <div>Cloud : AWS EC2</div>
                <div>DB : AWS RDS</div>
            </div>


            <div className="user_form">

                <div className="photo"></div>

                <div className="user_info">
                    <ul className="user_info_ul">
                        <li>나이 : 28</li>
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
                            <td rowSpan="2">2018.06 ~ 2019.07 <br/>(1년 2개월)</td>
                            <td>슈퍼셀<br/>(영상제작 업체)</td>
                            <td>해운대</td>
                            <td>개발팀(팀원)</td>
                            <td>2280(만)</td>
                        </tr>
                       
                    </tbody>
                </table>
        
        
        
                <div className="user_career_reason">
                    <ul className="user_career_reason_ul">
                        <li>담당업무 : 백엔드(nodejs, java(spring), php) 와 프론트엔드 ( html, css, js(jquery) )</li>
                    
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
        
                            <li>
                                <div className="msg"></div>
                                <div className="nickname"></div>
                                <div className="time"></div>
                            </li>
                     
                    </ul>
                    
                </div>
        
        
                <div className="chat_div">
                    <input type='text' className="chat_text" />
                    <input type='button' className="send_button" value="send"/>
                </div>
        
            </div>

        </div>
        
        
        
    );
  }
}

export default App;