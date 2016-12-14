
/**
 * Created by Administrator on 2016/11/17.
 */
window.onload = function () {
    Check();
    Delete();

};

function Check(){

    var check = document.getElementsByClassName("imgicon");

    for(var i = 0 ;i < check.length; i++)
    {

        check[i].onclick = function () {

            var temp = this.getAttribute("checked");

            if(temp == null){
                this.setAttribute("checked","");
            }
            else{
                this.removeAttribute("checked");
            }
        }
    }
}

function Delete(){
    var deletebtn = document.getElementsByClassName("delete");
    var deletebar = document.getElementById("max-box");
    var minbox = deletebar.getElementsByClassName("min-box")[0];


    var prev = null;


    for(var i = 0 ;i < deletebtn.length; i++ )
    {
        deletebtn[i].onclick = function () {
            /*显示*/
                deletebar.style.display ="block";
            /*添加动画类*/
                minbox.className = "min-box animas";

              /*调用函数打开垃圾桶盖*/
               var prev= this.children[0];
               DeleteOffset(prev);



            /*取消删除时候使用*/
            var off =  minbox.getElementsByClassName("min-left")[0];
            var sure = minbox.getElementsByClassName("min-right")[0];
            off.onclick = function () {
                deletebar.style.display ="none";
                /*调用关闭按键*/
                up(prev);
            };
            sure.onclick = function () {
                deletebar.style.display ="none";
                /*调用关闭按键*/
                up(prev);
            }
        }

    }



}
/*打开垃圾桶*/
function DeleteOffset(prev){
    /*添加过渡*/
    prev.style.transition = "transform 0.2s linear";
    prev.style.webkittransition = "transform 0.2s linear";
    /*转变*/
    prev.style.transform = "translateY(-15px) rotate(-45deg) translateX(-15px)";
    prev.style.webkitTransform = "translateY(-15px) rotate(-45deg) translateX(-15px)";
    /*改变旋转的中心点*/
    prev.transformOrigin = "center";
    prev.webkitTransformOrigin = "center";

}
/*关闭垃圾桶*/
function  up(prev){
    /*开启过渡*/
    prev.style.transition = "transform 0.2s linear";
    prev.style.webkitTransition = "transform 0.2s linear";
    /*转变*/
    prev.style.transform = "translateY(0) rotate(0deg) translateX(0)";
    prev.style.webkitTransform = "translateY(0) rotate(0deg) translateX(0)";

}