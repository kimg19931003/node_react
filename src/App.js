import React, { useEffect }  from 'react';
import io from "socket.io-client"; 

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import store from './store'

import appendScript from './scriptadd/appendScript';
import Slider from "react-slick";
import chat_init from './chat/chat_init';
import id_create from './chat/id_create';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Lightbox from 'react-image-lightbox';


import 'react-image-lightbox/style.css';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


/*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*/

const socket = io.connect("http://3.36.172.8:3001");  //백엔드 서버 포트를3001와 socket연결 


const images = [
    process.env.PUBLIC_URL+'/img/matchup/1.png',
    process.env.PUBLIC_URL+'/img/matchup/2.png',
    process.env.PUBLIC_URL+'/img/matchup/3.png',
];


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows:[],
            chat_num:0,
            id: id_create(),
            msg: null,
            to : 'admin',
            state : 0,
            machine : null,
            init : 0,
            photoIndex: 0,
            isOpen: false
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
                id: this.state.id,
                msg: document.querySelector('.chat_text').value,
                to : this.state.to,
                state : this.state.state,
                machine : machine
            });
            document.querySelector('.chat_text').value = '';
            
            console.log(this.state.to);
            
            this.setState({
                id: this.state.id,
                msg: document.querySelector('.chat_text').value,
                to : this.state.to,
                state : this.state.state,
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
                    id: this.state.id,
                    msg: document.querySelector('.chat_text').value,
                    to : this.state.to,
                    state : this.state.state,
                    machine : machine
                });
                document.querySelector('.chat_text').value = '';
                
                console.log(this.state.to);
                
                this.setState({
                    id: this.state.id,
                    msg: document.querySelector('.chat_text').value,
                    to : this.state.to,
                    state : this.state.state,
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
      
      
    socket.emit('joinRoom', this.state.to, this.state.id);
    socket.emit('chat_num_update', this.state.to, this.state.chat_num);
      

     
      socket.on('chat message',(rows)=>{
        this.setState({rows:rows});

        //document.querySelector('.chat_space_ul').append("<li><div className='msg'>"+msg+"</div><div className='nickname'>"+id+"</div><div className='time'>"+msgtime+"</div></li>");
        document.querySelector(".chat_space").scrollTop = document.querySelector(".chat_space").scrollHeight;
    
      });
      


      socket.on('leaveRoom', (to, id, chat_num) => {
          console.log("app_leaveroom");
          this.setState({chat_num:chat_num});

      });

      socket.on('joinRoom', (to, id, chat_num) => {
          console.log("app_joinroom");
          this.setState({chat_num:chat_num});

      });
      
      
       socket.on('chat_num_update', (chat_num) => {
          console.log("app_chat_num_date");
          this.setState({chat_num:chat_num});
       });


  
       appendScript("js/draggable.js");
       appendScript("js/portfolio.js");
       appendScript("js/socket_io.js");

       
        console.log("didmount");
        
    }
    
    
    
    
    componentWillMount(){
        
        
    }
    


  render() {
      
    console.log("render");
    
      
    const {rows, photoIndex, isOpen} = this.state;
    
    const settings = {
        dots: true,
        infinite: false,
        arrow:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    

    
    return (
        <div className="App">
        
            <div className="server_info">
                <div>OS : Ubuntu</div>
                <div>Server : NODEJS</div>
                <div>Client : REACT</div>
                <div>Cloud : AWS EC2</div>
                <div>DB : AWS RDS</div>
                <div>IDE : AWS Cloud9</div>
            </div>


            <div className="user_form">
            
            
                <div className="line">
                
                    <div className="big_title">kim's portfolio</div>
                
                    <div style={{display:"flex", padding: "50px 0px"}}>
        
                        <div className="user_info">
                            <div className="user_info_ul">
                                <div style={{display:"flex"}}>
                                    <div style={{width:"100%"}}>
                                        <div>Age</div>
                                        <div>30</div>
                                    </div>
                                    <div style={{margin:"0px 0px 30px 30px", width:"100%"}}>
                                        <div>Addr</div>
                                        <div>부산 북구 화명 양달로 80-11 102동 1401호</div>
                                    </div>
                                </div>
                                 
                                <div style={{display:"flex"}}>
                                    <div style={{width:"100%"}}>
                                        <div>E-mail</div>
                                        <div>sasaa3865@naver.com</div>
                                    </div>
                                    <div style={{margin:"0px 0px 30px 30px", width:"100%"}}>
                                        <div>Phone</div>
                                        <div>010 - 7615 - 3865</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
    
    

                
                </div>
                
                
        
            </div>
        
   
        
            <div className="user_career_2">
        
                <div className="user_career_reason_2">
                    <ul className="user_career_reason_ul_2">
                    
                    
                        <li className="user_career_reason_li_2">
                           
        
                            <div className="user_career_reason_div_2">
                                <div style={{width: "72%", display:"inline-block"}}>
                                
                                
                                    <div>
                                    
                                        <div className="skill_line">
                                            <div>Frontend & Backend</div>
                                            
                                            <div>
                                                <img src="img/html_css_js.png" style={{width:"200px", margin:"30px 0px 0px 0px"}} alt="skill" />
                                            </div>
                                            
                                            <div>
                                                <img src="img/php.png"  style={{width:"100px", verticalAlign:"super", margin:"0px 20px 0px 20px"}} alt="skill" />
                                                <img src="img/nodejs.png"   style={{width:"100px"}}/>
                                                <img src="img/typescript.png"   style={{width:"50px"}}/>
                                            </div>
                                            
                                            <div>
                                                <img src="img/react.png"  style={{width:"200px"}} alt="skill" />
                                            </div>
                                        </div>   
                                        
                                        <div className="skill_line">
                                            <div>자격증</div>
                                            
                                            <div>
                                                <img src="img/certifi.png"  style={{width:"100px", margin:"30px 0px 0px 0px"}} alt="skill" />
                                                <span style={{position:"relative", top:"-27px"}}>정보처리기사</span>
                                            </div>
                                        </div>  
                                    
                                    </div>
                                    
                                    
                                    
                                    <div>
                                    
                                        <div className="skill_line">
                                            <div>Version Control</div>
                                            
                                            <div>
                                                <img src="img/git.png"  style={{width:"130px", margin:"30px 0px 0px 0px"}} alt="skill" />
                                            </div>
                                            
                                            <div>
                                                <img src="img/github.png"  style={{width:"170px", margin:"30px 0px 0px 0px"}} alt="skill" />
                                            </div>
                                        </div>
                                        
                                        <div className="skill_line">
                                            <div>deployment</div>
                                            
                                            <div>
                                                <img src="img/aws.png"  style={{width:"170px", margin:"30px 0px 0px 0px"}} alt="skill" />
                                            </div>
                                        </div>
                                        
                                    
                                    </div>
                                    
                                </div>
                            </div>
      
        
                        </li>
                    </ul>
                </div>
        
            </div>
        
        
        
        
        
            <div className="portfolio_list vertical">
                {/*
                  <div>
                    <button type="button" onClick={() => this.setState({ isOpen: true })}>
                      Open Lightbox
                    </button>
            
                    {isOpen && (
                      <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                          this.setState({
                            photoIndex: (photoIndex + images.length - 1) % images.length,
                          })
                        }
                        onMoveNextRequest={() =>
                          this.setState({
                            photoIndex: (photoIndex + 1) % images.length,
                          })
                        }
                      />
                    )}
                  </div>
                */}
    
    
                    <div className="portfolio_block">
                
                
                    <div className="slide_div">
                        <Slider {...settings}>
                            <div>
                                <img src="/img/matchup/1.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/matchup/2.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/matchup/3.png" alt="slide_img" />
                            </div>
                        </Slider>
                    </div>
                    
                    
                    <div className="slide_exp_div">
                    
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">프로젝트</div>
                                <div className="slide_exp_word">매치업 랜딩페이지</div>
                            </div>
                            
                            <div>
                                <div className="slide_exp_title">URL</div>
                                <div className="slide_exp_word">
                                    <a href="https://www.match-up.co.kr/">https://www.match-up.co.kr/</a>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">작업범위</div>
                                <div className="slide_exp_word">PHP 백엔드, 프론트엔드(Jquery), 관리자 이미지 업로드 작업</div>
                            </div>
                        </div>
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">개발환경</div>
                                <div className="slide_exp_word">cafe24 Server, PHP 7.4</div>
                            </div>
                        </div>
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">플랫폼 설명</div>
                                <div className="slide_exp_word">
                                
                                    매치업 플랫폼을 홍보하는 랜딩 페이지를 작업했습니다.
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                
                </div>
            
      
            
                <div className="portfolio_block vertical">
                
                
                    <div className="slide_div">
                        <Slider {...settings}>
                            <div>
                                <img src="/img/go/1.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/go/2.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/go/3.png" alt="slide_img" />
                            </div>
                        </Slider>
                    </div>
                    
                    
                    <div className="slide_exp_div">
                    
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">프로젝트</div>
                                <div className="slide_exp_word">가자</div>
                            </div>
                            
                            <div>
                                <div className="slide_exp_title">URL</div>
                                <div className="slide_exp_word">
                                    <a href="https://softer084.cafe24.com">softer076.cafe24.com</a>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">구글플레이 스토어</div>
                                <div className="slide_exp_word">
                                    현재 게시 취소됨
                                </div>
                            </div>
                        </div>
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">앱 스토어</div>
                                <div className="slide_exp_word">
                                    현재 게시 취소됨
                                </div>
                            </div>
                        </div>
                        
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">작업범위</div>
                                <div className="slide_exp_word">PHP 백엔드, 프론트엔드(Jquery), <br/>하이브리드앱 작업 및 배포( AOS, IOS )</div>
                            </div>
                        </div>
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">개발환경</div>
                                <div className="slide_exp_word">cafe24 Server, PHP 7.4</div>
                            </div>
                        </div>
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">플랫폼 설명</div>
                                <div className="slide_exp_word">
                                
                                    플랫폼에 등록된 상점을 들려 이용시 쿠폰과 스탬프를 지급하여
                                    사용 할 수 있게 해주는 앱입니다.
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                
                </div>
            
            
            
                <div className="portfolio_block horizontal" style={{display:"block"}}>
                
                
                    <div className="slide_div" style={{width:"100%"}}>
                        <Slider {...settings}>
                            <div>
                                <img src="/img/kanta/1.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/kanta/2.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/kanta/3.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/kanta/4.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/kanta/5.png" alt="slide_img" />
                            </div>
                       
                        </Slider>
                    </div>
                    
                    
                    <div className="slide_exp_div">
                    
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">프로젝트</div>
                                <div className="slide_exp_word">칸타수학<br/>(교육영상 플랫폼)</div>
                            </div>
                            
                            <div>
                                <div className="slide_exp_title">URL</div>
                                <div className="slide_exp_word">
                                    <a href="https://softer084.cafe24.com">softer084.cafe24.com</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">구글플레이 스토어</div>
                                <div className="slide_exp_word">
                                    <a href="https://play.google.com/store/apps/details?id=com.wizmade.kanta">칸타수학 플레이스토어 바로가기</a>
                                </div>
                            </div>
                        </div>

                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">작업범위</div>
                                <div className="slide_exp_word">PHP 백엔드, 프론트엔드(Jquery), <br/>하이브리드앱 작업 및 배포( AOS )</div>
                            </div>
                        </div>
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">개발환경</div>
                                <div className="slide_exp_word">AWS S3, cafe24 Server, PHP 7.4</div>
                            </div>
                        </div>
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">플랫폼 설명</div>
                                <div className="slide_exp_word">
                                
                                    강의영상과 시험문제를 온라인으로 학생들에게 제공하여
                                    학습 효율을 높이는 플랫폼입니다.
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                
                </div>
               
               
                <div className="portfolio_block vertical">
                
                
                    <div className="slide_div">
                        <Slider {...settings}>
                            <div>
                                <img src="/img/park/1.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/park/2.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/park/3.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/park/4.png" alt="slide_img" />
                            </div>
                            <div>
                                <img src="/img/park/5.png" alt="slide_img" />
                            </div>
                         
                        </Slider>
                    </div>
                    
                    
                    <div className="slide_exp_div">
                    
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">프로젝트</div>
                                <div className="slide_exp_word">주차실태조사<br/>(주차현황 조사 플랫폼)</div>
                            </div>
                            
                            <div>
                                <div className="slide_exp_title">URL</div>
                                <div className="slide_exp_word">
                                    <a href="https://softer093.cafe24.com">softer093.cafe24.com</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">구글플레이 스토어</div>
                                <div className="slide_exp_word">
                                    <a href="https://play.google.com/store/apps/details?id=com.wizmade.parkingsys">주차실태조사 플레이스토어 바로가기</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">앱 스토어</div>
                                <div className="slide_exp_word">
                                    <a href="https://apps.apple.com/us/app/%EC%A3%BC%EC%B0%A8%EC%8B%A4%ED%83%9C%EC%A1%B0%EC%82%AC/id1582133805">주차실태조사 앱스토어 바로가기</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">작업범위</div>
                                <div className="slide_exp_word">PHP 백엔드, 프론트엔드(Jquery), <br/>하이브리드앱 작업 및 배포( IOS, AOS )</div>
                            </div>
                        </div>
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">개발환경</div>
                                <div className="slide_exp_word">AWS S3, AWS RDS, cafe24 Server, PHP 7.4</div>
                            </div>
                        </div>
                        
                        
                        <div className="slide_exp_line">
                            <div>
                                <div className="slide_exp_title">플랫폼 설명</div>
                                <div className="slide_exp_word">
                                
                                     서울시 주차현황을 조사하는 플랫폼입니다.
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                
                </div>

            </div>
        
        
        
        
        

            
        


            <div className="chat">
                {/*
                <div className="chat_num_div">
                    <span>현재 접속자 수 : {this.state.chat_num}</span>
                    <span className="chat_num"></span>
                </div>
                */}
        
                <div className="chat_space">
                    <ul className="chat_space_ul">
                    
                        {
                            chat_init(this.state.rows)
                            
                            
                        }
        
                    </ul>
                    
                </div>
        
        
                <div className="chat_div" >
                    <input type='text' className="chat_text" onKeyUp={this.sendenterMsg} />
                    <input type='button' className="send_button" onClick={this.sendMsg} value="send"/>
                </div>
        
            </div>

        </div>
        
        
        
    );
  }
}

export default App;
