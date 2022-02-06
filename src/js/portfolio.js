



    document.querySelector(".chat_space").scrollTop = document.querySelector(".chat_space").scrollHeight;


    if (document.body.scrollTop == 0) {


        ////////////////////////// 1번 유저폼 //////////////////////////////

        document.querySelector(".user_form").style.opacity = "1";



        setTimeout(function () {
            document.querySelector(".user_info").style.top = "30px";
            document.querySelector(".user_info").style.opacity = "1";
        }, 300);

        setTimeout(function () {
            //document.querySelector(".univ_info").style.bottom = "25px";
            //document.querySelector(".univ_info").style.opacity = "1";
        }, 600);





        ////////////////////////// 2번 유저폼 //////////////////////////////

        setTimeout(function () {
            
            //document.querySelector(".user_career").style.opacity = "1";

        }, 900);



        setTimeout(function () {
            //document.querySelector(".user_career_info").style.top = "0px";
            //document.querySelector(".user_career_info").style.opacity = "1";
        }, 1200);

        setTimeout(function () {
            //document.querySelector(".user_career_reason").style.top = "0px";
            //document.querySelector(".user_career_reason").style.opacity = "1";
        }, 1500);




        ////////////////////////// 3번 유저폼 //////////////////////////////

        setTimeout(function () {
            
            document.querySelector(".user_career_2").style.opacity = "1";

        }, 900);



        setTimeout(function () {
    
            //document.querySelector(".user_career_info_2").style.opacity = "1";
        }, 1200);

        setTimeout(function () {
            document.querySelector(".user_career_reason_2").style.top = "3px";
            document.querySelector(".user_career_reason_2").style.opacity = "1";
        }, 1500);
        
        



        ////////////////////////// 작업물 //////////////////////////////

        setTimeout(function () {
            
            document.querySelector(".portfolio_list").style.opacity = "1";

        }, 900);



        setTimeout(function () {
    
            document.querySelector(".portfolio_list").style.opacity = "1";
        }, 1200);



    } else if (document.body.scrollTop > 10) {




    }




dragElement(document.querySelector(".chat"));
dragElement(document.querySelector(".server_info"));








/*
if(lazy){
  lazy.slick('unslick');
}
*/

var lazy =  $(".lazy");
var status = $('.m_pagingInfo');


lazy.slick({
  lazyLoad: 'ondemand', // ondemand progressive anticipated
  arrows : false, 		// 옆으로 이동하는 화살표 표시 여부
  dots : false, 		// 스크롤바 아래 점으로 페이지네이션 여부
  autoplay : false,			// 자동 스크롤 사용 여부
  autoplaySpeed : 5000, 		// 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
  fade:false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,

});

lazy.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
  var index = lazy.index(this);

  console.log("lazy : "+index);

  var i = (currentSlide ? currentSlide : 0) + 1;
  document.querySelector('.m_pagingInfo').eq(index).text(i + ' / ' + slick.slideCount);
});



