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
    //绘制box
    var container = document.getElementById("boxContainer");
    container.innerHTML = "";
    queueData.forEach(function (item, index, array) {
        var box = document.createElement("ol");
        box.setAttribute("class", "box");
        box.textContent = item;
        container.appendChild(box);
    });

    //绘制column
    var chartWrap = document.querySelector(".aqi-chart-wrap");
    //每次渲染图标现将容器置空
    chartWrap.innerHTML = "";
    var offsetIndex = 0;
    //获取渲染数据的总数
    var length = queueData.length,
        width = chartWrap.clientWidth;

    //计算图标中各种尺寸参数
    var itemWidth = width / (length*2),
        itemSpace = width / (length),
        offsetLeft = itemWidth / 2;

    /**
     * 渲染图表操作
     */
    queueData.forEach(function (item, index, array) {
        var chartItem = document.createElement("div"),
            colorSeed = 255 *  item/100;

        //配置 chartItem 各种属性
        chartItem.setAttribute("title", "数值："+item);
        chartItem.style.bottom = 0;
        chartItem.style.left = itemSpace * (offsetIndex++) + offsetLeft + "px";
        chartItem.style.height = Math.floor(item * 2.5) + "px";
        chartItem.style.width = itemWidth + "px";
        chartItem.style.position = "absolute";
        chartItem.style.backgroundColor  = "rgba("+ Math.floor(0.4 * colorSeed) + ", " + Math.floor(0.6 * colorSeed) + ", " + Math.floor(0.8 * colorSeed) +", 0.6)"; //背景颜色

        chartWrap.appendChild(chartItem);
    });
}

//对输入合法性判断
function validateNum (value) {
    if (!value.trim()) {
        alert("请输入数字");
        return false;
    } else if (!/^\d+$/.test(value)) {
        alert("请输入正确格式的数字");
        return false;
    } else if (!(value >= 10 && value <= 100)) {
        alert("请输10-100的数字");
        return false;
    } else if (queueData.length >= 60) {
        alert("队列元素数量超过60");
        return false;
    }else {
        return true;
    }
}

//左侧入处理函数
function leftAddHandler () {
    var value = document.getElementById("boxNum").value;
    if (validateNum(value)) {
        queueData.unshift(value);
        renderQueue();
    }
}

//右侧入处理函数
function rightAddHandler () {
    var value = document.getElementById("boxNum").value;
    if (validateNum(value)) {
        queueData.push(value);
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
        alert("队列为空，请先添加一个数字！")
    }
}

//右侧出处理函数
function rightRemoveHandler () {
    if (queueData.length) {
        var value =   queueData.pop();
        console.log("右侧出 ： "+value);
        renderQueue();
    }else {
        alert("队列为空，请先添加一个数字！")
    }
}

//初始化数据处理函数
function btnDataInitHandler () {
    queueData = [];
    for(var i= 0; i < 30; ++i){
        queueData.push(Math.floor(10+Math.random()*(100-10)));
    }
    renderQueue();
}

//排序处理函数
function sortHandler () {
    var i = 0,j = 1,temp,
    len = queueData.length,
    timer = null,
    timer = setInterval(sort,10);

    function sort() {
        if (i < len) {
            if (j < len) {
                if (queueData[i] > queueData[j]) {
                    temp = queueData[i];
                    queueData[i] = queueData[j];
                    queueData[j] = temp;
                    renderQueue();
                }
                j++;
            } else {
                i++;
                j = i + 1;
            }
        } else {
            clearInterval(timer);
            return;
        }
    }

    //var len = queueData.length,
    //i = len-1,
    //timer = null,
    //timer = setInterval(sort,10);
    //function sort() {
    //    if (i >= 0) {
    //        var bigData = queueData[0];
    //        var index = 0;
    //        for (var j = 0; j <= i; j++) {
    //            if (queueData[j] > bigData) {
    //                var temp = bigData;
    //                index = j;
    //                bigData = queueData[j];
    //            }
    //        }
    //        var tempI = queueData[i];
    //        queueData[i] = bigData;
    //        queueData[index] = tempI;
    //        renderQueue();
    //        --i;
    //    } else {
    //        clearInterval(timer);
    //        return;
    //    }
    //}
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
    var btnDataInit = document.getElementById("dataInit");
    var btnSort = document.getElementById("sort");

    clickDeleteHandler();
    addEventHandler(btnLeftAdd, "click", leftAddHandler);
    addEventHandler(btnRightAdd, "click", rightAddHandler);
    addEventHandler(btnLeftRemove, "click", leftRemoveHandler);
    addEventHandler(btnRightRemove, "click", rightRemoveHandler);
    addEventHandler(btnDataInit, "click", btnDataInitHandler);
    addEventHandler(btnSort, "click", sortHandler);
}

init();