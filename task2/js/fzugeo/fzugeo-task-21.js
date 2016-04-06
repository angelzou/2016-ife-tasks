/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

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

var inputData = new Array();
var textAreaData = new Array();

//根据 inputData 绘制队列
function renderInputQueue () {
    var container = document.getElementById("tagContainer");
    container.innerHTML = "";
    inputData.forEach(function (item, index, array) {
        var box = document.createElement("ol");
        box.setAttribute("class", "box");
        box.textContent = item;
        container.appendChild(box);
    });
}

//根据 textAreaData 绘制队列
function renderTextQueue () {
    var container = document.getElementById("hobbyContainer");
    container.innerHTML = "";
    textAreaData.forEach(function (item, index, array) {
        var box = document.createElement("ol");
        box.setAttribute("class", "box");
        box.textContent = item;
        container.appendChild(box);
    });
}

//Tag输入处理函数
function tagInputHandler () {
    var inputBox = document.getElementById("inputBox");
    addEventHandler(inputBox, "keyup", function (e) {
        var reg = /[,，;；、\s\n]/g;
        if (reg.test(inputBox.value) || e.keyCode == 13) {
            var inputValue = (inputBox.value).split(/[,，;；、\s\n]+/).filter(function (text) {
                return text.trim() != "";
            })[0];

            if (inputData.length == 10) {
                inputData.shift();
            } else if (inputValue && !inputData.includes(inputValue)) {
                inputData.push(inputValue.trim());
                renderInputQueue();
            }

            inputBox.value = "";
        }
    });
}

//Hobby 输入处理函数
function hobbyInputHandler () {
    textAreaData = [];
    var textAreaBox = document.getElementById("textAreaBox");
    var reg = /[,，;；、\s\n]/g;
    var textAreaBoxArray = (textAreaBox.value).split(/[,，;；、\s\n]+/).filter(function (text) {
        return text.trim() != "";
    });

    textAreaBoxArray.forEach(function (item, index, array) {
        if (item && !textAreaData.includes(item)) {
            if (textAreaData.length == 10) {
                textAreaData.shift();
            }
            textAreaData.push(item.trim());
            renderTextQueue();
        }
    });
}

//box 点击删除事件委托
function clickDeleteHandler () {
    var container = document.getElementById("tagContainer");
    addEventHandler(container, "click", function(e){
        var item = e.target;
        if (item.className == "box") {
            var index = Array.prototype.indexOf.call(container.children, item);
            inputData.splice(index, 1);
            renderInputQueue();
        }
    });
}

//box 鼠标事件委托
function mouseHandler () {
    var container = document.getElementById("tagContainer");

    //鼠标悬停事件
    addEventHandler(container, "mouseover", function(e){
        var item = e.target;
        if (item.className == "box") {
            item.style.backgroundColor = "#999999";
            item.textContent = "点击删除" + item.textContent + "?";
        }
    });

    //鼠标移出事件
    addEventHandler(container, "mouseout", function(e){
        var item = e.target;
        if (item.className == "box") {
            var index = Array.prototype.indexOf.call(container.children, item);
            item.style.backgroundColor = "#84CFFF";
            item.textContent = inputData[index];
        }
    });
}

/**
 * 初始化函数
 */
function init() {
    var btnHobby = document.getElementById("checkHobbyBtn");

    tagInputHandler();
    mouseHandler();
    clickDeleteHandler();
    addEventHandler(btnHobby, "click", hobbyInputHandler);
}

init();