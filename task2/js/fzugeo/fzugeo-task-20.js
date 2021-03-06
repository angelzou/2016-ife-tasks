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

var queueData = new Array();

//根据queueData绘制队列
function renderQueue () {
    var container = document.getElementById("boxContainer");
    container.innerHTML = "";
    queueData.forEach(function (item, index, array) {
        var box = document.createElement("ol");
        box.setAttribute("class", "box");
        box.textContent = item;
        container.appendChild(box);
    });
}

//对输入合法性判断
function validateNum (value) {
    if (!value.trim()) {
        alert("请输入内容");
        return false;
    }
    //else if (!/^\d+$/.test(value)) {
    //    alert("请输入正确格式的数字");
    //    return false;
    //}
    else {
        return true;
    }
}

//左侧入处理函数
function leftAddHandler () {
    var value = document.getElementById("boxNum").value.trim();
    if (validateNum(value)) {
        var reg = new RegExp(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
        itemArr = value.split(reg).filter(function(item){return item != '';});
        queueData = itemArr.concat(queueData);
        renderQueue();
    }
}

//右侧入处理函数
function rightAddHandler () {
    var value = document.getElementById("boxNum").value.trim();
    if (validateNum(value)) {
        var reg = new RegExp(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
        itemArr = value.split(reg).filter(function(item){return item != '';});
        queueData = queueData.concat(itemArr);
        renderQueue();
    }
}

//左侧出处理函数
function leftRemoveHandler () {
    if (queueData.length) {
        var value =   queueData.shift();
        console.log("左侧出 ： "+value);
        renderQueue();
    }else {
        alert("队列为空，请先添加一组文字！")
    }
}

//右侧出处理函数
function rightRemoveHandler () {
    if (queueData.length) {
        var value =   queueData.pop();
        console.log("右侧出 ： "+value);
        renderQueue();
    }else {
        alert("队列为空，请先添加一组文字！")
    }
}


//搜索处理函数
function searchHandler () {
    renderQueue();
    var searchValue = document.getElementById("searchInput").value.trim();
    var containerChildren = document.getElementById("boxContainer").childNodes;
    var reg = new RegExp(searchValue);
    if (searchValue) {
        queueData.forEach(function (item, index, array) {
            if(reg.test(containerChildren[index].textContent)){
                containerChildren[index].setAttribute("class", "selectedBox");
            }
        });
    }
}

//box 点击删除事件委托
function clickDeleteHandler () {
    var container = document.getElementById("boxContainer");
    addEventHandler(container, "click", function(e){
        var item = e.target;
        if (item.className == "box") {
            var index = Array.prototype.indexOf.call(container.children, item);
            queueData.splice(index, 1);
            renderQueue();
        }
    });
}

/**
 * 初始化函数
 */
function init() {
    var btnLeftAdd = document.getElementById("leftAdd");
    var btnRightAdd = document.getElementById("rightAdd");
    var btnLeftRemove = document.getElementById("leftRemove");
    var btnRightRemove = document.getElementById("rightRemove");
    var searchBtn = document.getElementById("searchBtn");

    clickDeleteHandler();
    addEventHandler(btnLeftAdd, "click", leftAddHandler);
    addEventHandler(btnRightAdd, "click", rightAddHandler);
    addEventHandler(btnLeftRemove, "click", leftRemoveHandler);
    addEventHandler(btnRightRemove, "click", rightRemoveHandler);
    addEventHandler(searchBtn, "click", searchHandler);
}

init();