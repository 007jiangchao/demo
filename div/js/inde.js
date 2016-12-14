/**
 *
 * Created by Administrator on 2016/11/15.
 */
window.onload = function () {
    Search();
    Time();
    Carousel();

}
/*收索*/
function Search(){
    /*获得收索*/
    var search = document.getElementById("header").getElementsByClassName("header-box")[0];
    /*获得轮播图*/
    var carousel = document.getElementById("carousel");
    /*事件*/
    window.onscroll = function () {
        /*获得被卷取的长度*/
        var scroll = document.body.scrollTop;
        /*获得轮播图的高度*/
        var height = carousel.offsetHeight;
        if(scroll >= height){

            search.style.backgroundColor="rgba(201,21,35,.8)"
        }
        else{
            var num = scroll /height *0.8;
            search.style.backgroundColor = "rgba(201,21,35,"+num+")"
        }
    }
}
/*倒计时*/
function Time(){
    /*获得时间对象*/
    var spantime = document.getElementsByClassName("time");
    var timeall = 60*60*24;
    setInterval(function () {
        timeall--;
        var temp_h = Math.floor(timeall/60/60);
        var temp_m = Math.floor(timeall/60%60);
        var temp_s = timeall%60;

        spantime[0].innerHTML  = temp_h>10?Math.floor(temp_h/10):0;
        spantime[1].innerHTML  = temp_h%10;

        spantime[2].innerHTML = temp_m>10?Math.floor(temp_m/10):0;
        spantime[3].innerHTML = temp_m%10;

        spantime[4].innerHTML = temp_s>10?Math.floor(temp_s/10):0;
        spantime[5].innerHTML = temp_s%10;

    },1000)
}



/*轮播图*/
function Carousel(){
    var id = document.getElementById("carousel");/*最大的盒子*/
    var scrollul = id.getElementsByTagName("ul")[0];
    var btnul = id.getElementsByTagName("ul")[1].getElementsByTagName("li");
    var li = scrollul.getElementsByTagName("li");


    var height = id.offsetWidth;
    var time = null;
    var num = 1;


    /*过渡*/
    var settransition = function(){
        scrollul.style.transition = "transform 0.5s ease";
        scrollul.style.webkitTransition ="transform 0.5s ease";
    }
    /*结束过渡*/
    var endtransition = function(){
        scrollul.style.transition = "none";
        scrollul.style.webkitTransition = "none";
    }
    /*转换*/
    var settransform = function(pace){
        scrollul.style.transform = "translateX("+pace+"px)"
    }

    /*每过2秒*/
    time = setInterval(interval,2000)
    /*被定时器调用调用*/
    function interval(){
        num++;
        settransition();
        settransform(-num*height);
    }
    /*每次轮播完了一张图片就判断一下  这样就有了循环*/
    scrollul.addEventListener("transitionEnd", function () {

        if(num >= li.length-1){
            num =1;
            endtransition();
            settransform(-num*height);
        }else if(num <= 0)
        {
            num  = 8;
            endtransition();
            settransform(-num*height);

        }

    },false);
    /*以防老系统*/
    scrollul.addEventListener("webkitTransitionEnd", function () {

        if(num >= li.length-1){
            num =1;
            endtransition();
            settransform(-num*height);
        }else if(num <= 0)
        {
            num  = 8;
            endtransition();
            settransform(-num*height);

        }

       /*用排他思想  小圆点*/
        for(var i = 0; i  < btnul.length;i++){
            btnul[i].className = " ";
        }
        btnul[num-1].className = "active";
    },false);


    /*下面代码是手指左右滑动*/

    /*当手指触发屏幕时停止轮播*/
        var startpace = 0;
        var movepace = 0 ;
        var temp = 0 ;
     id.addEventListener("touchstart", function (event) {
          /*停止滚动*/
          clearInterval(time);
         /*滑动的起点*/
         startpace =  event.touches[0].clientX;
     });

    /*滑动中移动*/
    id.addEventListener("touchmove", function (event) {
        clearInterval(time);
        /*得到滑动距离*/
         movepace = event.touches[0].clientX;
        /*滑动距和离开始距离减 得到以滑动的距离*/
         temp =  movepace -startpace;
        /*得到已经走了多久长距离*/
        var pace =  -num*height + temp;
        /*开启过渡*/
        scrollul.style.transition = "transform 0.1s linear";
        scrollul.style.webkitTransition ="transform 0.1s linear";
        /*转换*/
        scrollul.style.transform = "translateX("+pace+"px)";


    })

    /*手指离开*/
    id.addEventListener("touchend", function () {
        clearInterval(time);
        /*如果滑动距离超过了一半就算是划过去了*/
        /*得到盒子的宽度除以2*/
        var tempwidth = id.offsetWidth/2;
       var abstemp =  Math.abs(temp);
        if(abstemp >= tempwidth){
            /*他有两种业务  如startpace大于movepace就说明是向 左移动
            * 如果touchstart小于touchmove 就是向右移动
            * */
            if(startpace >  movepace){
                num++;
            }
            else{
                num--;
            }
             /*开启过渡*/
            scrollul.style.transition = "transform 0.2s linear";
            scrollul.style.webkitTransition ="transform 0.2s linear";
            /*转换*/
            scrollul.style.transform = "translateX("+ (-num*height) +"px)"
        }
        /*不然就回到原来的地方*/
        else{
            /*开启过渡*/
            scrollul.style.transition = "transform 0.2s linear";
            scrollul.style.webkitTransition ="transform 0.2s linear";
            /*转换*/
            scrollul.style.transform = "translateX("+ (-num*height) +"px)"
        }
        /*开启定时器*/
        time = setInterval(interval,2000);
    })
}