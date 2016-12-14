/**
 * Created by Administrator on 2016/11/16.
 */


/* console.time("e");*//*开始时间*/
/*console.timeEnd("e"); 结束时间*/
/* console.log("e");查看时间*/


window.onload  = function () {
    offsetbox();
    offsetright();
}
/*左侧*/
 function offsetbox(){
     var parent = document.getElementsByClassName("main-left")[0].getElementsByTagName("ul")[0];
     var elementli = parent.children;


     var time= 0 ;
     var temp = 0;

     /*当前距离*/
     var current = 0;


     /*把左边的往下拉*/
     var startY = 0;
     var moveY = 0;





     /*手指开始触摸*/
        parent.addEventListener("touchstart",function(event){
         /*当前起点距离*/
        startY = event.touches[0].clientY;
         time = new Date().getTime();

     });



     /*手指移动*/
     parent.addEventListener("touchmove", function (event) {
         /*获得移动的距离*/
         moveY  =  event.touches[0].clientY;
         /*开始的起点减去滑动  就等于现在的距离*/
         temp = moveY - startY;
         /*当前的距离加上现在的滑动就距离*/
         var tempnum = temp+current;
         /*限制上下拉升宽度 */
         if(tempnum < 100 && tempnum > -866 ){
             addtransition();
             settransform(tempnum);
         }
         /*判断是上拉还是下拉*/

     });



     /*手指离开触屏*/
     parent.addEventListener("touchend", function (event) {

         /*如果拉升的距离不超过 某段距离就还是吸附在上面   或者是下面*/
         current+=temp;
         if(current >= 1 && current <=90 ){
             addtransition();
             settransform(0);
             current=0;
         }
         else if(current <= -768 && current >= -886){
             addtransition();
             settransform(-766);
             current=-766;
         }



       /*如果毫秒数小于150我们就认为是事件*/
       var tempTime = new Date().getTime()-time;
         if(tempTime <= 150){
             /*用排他试想*/
                for(var i =0; i < elementli.length; i++)
                {
                    elementli[i].className = " ";
                    elementli[i].index = i;
                }
             /*把点击的那个元素 放到顶端*/
             var element = event.target.parentNode;
             endtransition();
             element.className = "active";
             var tempnum = -(element.index*50);
             /*如果在底部就不上来了*/
             if(tempnum > -776){
                 settransform(tempnum);
             }

             /*在赋值给现在的值*/
             current = (tempnum);
         }
     });




     /*添加过渡*/
     function addtransition(){
         parent.style.transition = "transform 0.2s linear";
         parent.style.webkitTransition = "transform 0.2s linear";
     }
     /*结束过渡*/
     function endtransition(){
         parent.style.transition = "none";
         parent.style.webkitTransition = "none";
     }
     /*转变*/
     function settransform (pace){
         parent.style.transform = "translateY("+pace+"px)";
     }

 }



/*右侧*/
function offsetright(){
    var right = document.getElementsByClassName("main-right")[0];
    var height = right.offsetHeight-200;
    var current = 0;
    var temppace =0 ;
    var startpace = 0 ;
    var movepace =  0;

    var temp = 0 ;
    /*开发触发*/
    right.addEventListener("touchstart", function (event) {

         startpace = event.touches[0].clientY;
    });
    /*移动触发*/
    right.addEventListener("touchmove",function(event){

        movepace = event.touches[0].clientY;
         temppace = movepace - startpace;
         temp = temppace+current;

        /*判断是谋个区域 就停止不动   就是不能超过谋个区域*/
        if(temp < 130 && temp > -100){
            addtransition();
            settransform(temp);
        }

    });
    /*手指离开触屏触发*/
    right.addEventListener("touchend",function(event){
        /*如果拉升的距离不超过 某段距离就还是吸附在上面   或者是下面*/
        current+=temppace;
        if(current > 1 && current <130){
            current = 0 ;
            addtransition();
            settransform(current);

        }
        else if(current < -30 && current > -100 ){
            current = -10;
            addtransition();
            settransform(current);
        }

    });







    /*添加过渡*/
    function addtransition(){
        right.style.transition = "transform 0.1s linear ";
        right.style.webkitTransition ="transform 0.1s linear";
    }
    /*删除过渡*/
    function endtransition(){
        right.style.transition = "none";
        right.style.webkitTransition = "none";
    }
    /*转换*/
    function settransform(pace){
        right.style.transform = "translateY("+pace+"px)";
        right.style.webkitTransform = "translateY("+pace+"px)"
    }
}