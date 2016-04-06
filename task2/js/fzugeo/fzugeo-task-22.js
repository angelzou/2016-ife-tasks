var animationList=[];
var timer;

//事件监听及处理函数
function addEventHandler(element, event, handler) {
    if (element.addEventListener) {
        element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, handler);
    } else {
        element["on" + event] = handler;
    }
}

function animateHandler() {
    var index = 0;
    animationList[index].setAttribute("class", "active");
    timer = setInterval(function(){
        index++;
        if(index < animationList.length){
            animationList[index-1].setAttribute("class", "");
            animationList[index].setAttribute("class", "active");
        }else{
            clearInterval(timer);
            animationList[index-1].setAttribute("class", "");
        }
    },500)
}

function preOreder(node){
    if (node){
        animationList.push(node);
        preOreder(node.children[0]);
        preOreder(node.children[1]);
    }
}

function inOrder(node){
    if (node){
        inOrder(node.children[0]);
        animationList.push(node);
        inOrder(node.children[1]);
    }
}

function postOrder(node){
    if (node){
        postOrder(node.children[0]);
        postOrder(node.children[1]);
        animationList.push(node);
    }
}

/**
 * 初始化函数
 */
function init() {
    var container = document.getElementById("container");
    var preOrderBtn = document.getElementById("preOrderBtn");
    var inOrderBtn = document.getElementById("inOrderBtn");
    var postOrderBtn = document.getElementById("postOrderBtn");

    addEventHandler(preOrderBtn, "click", function () {
        animationList = [];
        preOreder(container);
        animateHandler();
    });

    addEventHandler(inOrderBtn, "click", function () {
        animationList = [];
        inOrder(container);
        animateHandler();
    });

    addEventHandler(postOrderBtn, "click", function () {
        animationList = [];
        postOrder(container);
        animateHandler();
    });
}

init();