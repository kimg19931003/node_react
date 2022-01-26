



    
    //$(".chat, .user_form, .user_career, .user_certifi").draggable();



    if (document.body.scrollTop == 0) {


        ////////////////////////// 1번 유저폼 //////////////////////////////

        document.querySelector(".user_form").style.margin = "100px auto 0px auto";
        document.querySelector(".user_form").style.opacity = "1";



        setTimeout(function () {
            document.querySelector(".user_info").style.top = "30px";
            document.querySelector(".user_info").style.opacity = "1";
        }, 300);

        setTimeout(function () {
            document.querySelector(".univ_info").style.bottom = "50px";
            document.querySelector(".univ_info").style.opacity = "1";
        }, 600);





        ////////////////////////// 2번 유저폼 //////////////////////////////

        setTimeout(function () {
            
            document.querySelector(".user_career").style.margin = "100px auto 100px auto";
            document.querySelector(".user_career").style.opacity = "1";

        }, 900);



        setTimeout(function () {
            document.querySelector(".user_career_info").style.top = "0px";
            document.querySelector(".user_career_info").style.opacity = "1";
        }, 1200);

        setTimeout(function () {
            document.querySelector(".user_career_reason").style.top = "3px";
            document.querySelector(".user_career_reason").style.opacity = "1";
        }, 1500);




        ////////////////////////// 3번 유저폼 //////////////////////////////

        setTimeout(function () {
            
            document.querySelector(".user_career_2").style.margin = "100px auto 100px auto";
            document.querySelector(".user_career_2").style.opacity = "1";

        }, 900);



        setTimeout(function () {
            document.querySelector(".user_career_info_2").style.top = "0px";
            document.querySelector(".user_career_info_2").style.opacity = "1";
        }, 1200);

        setTimeout(function () {
            document.querySelector(".user_career_reason_2").style.top = "3px";
            document.querySelector(".user_career_reason_2").style.opacity = "1";
        }, 1500);
        
        


        ////////////////////////// 4번 유저폼 //////////////////////////////

         setTimeout(function () {

            document.querySelector(".user_certifi").style.margin = "100px auto 100px auto";
            document.querySelector(".user_certifi").style.opacity = "1";

        }, 1800);



        setTimeout(function () {
            document.querySelector(".user_certifi_info").style.top = "0px";
            document.querySelector(".user_certifi_info").style.opacity = "1";
        }, 2100);

        setTimeout(function () {
            document.querySelector(".user_certifi_info").style.top = "3px";
            document.querySelector(".user_certifi_info").style.opacity = "1";
        }, 2400);

    } else if (document.body.scrollTop > 10) {




    }




