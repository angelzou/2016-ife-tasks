/**
 * Created by Geo on 2016/3/30.
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim(),
        value = document.getElementById("aqi-value-input").value.trim();

    aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    //<td>城市</td><td>空气质量</td><td>操作</td>
    var tableBody = document.querySelector("#aqi-table tbody");
    tableBody.innerHTML = "";

    for (var city in aqiData){
        var trItem = document.createElement("tr"),
        cityItem = document.createElement("td"),
        valueItem = document.createElement("td"),
        buttonTdItem = document.createElement("td"),
        buttonItem = document.createElement("button");

        cityItem.textContent = city;
        valueItem.textContent = aqiData[city];
        buttonItem.textContent = "删除";

        buttonTdItem.appendChild(buttonItem);
        trItem.appendChild(cityItem);
        trItem.appendChild(valueItem);
        trItem.appendChild(buttonTdItem);
        tableBody.appendChild(trItem);
    }
}

/**
 * 城市验证
 */
function cityValidate(str, cityWarn) {
    if (str == "") {
        cityWarn.innerHTML = "  请输入一个城市！";
        return false;
    }
    var pos = str.search(/\d/);
    if (pos >= 0) {
        cityWarn.innerHTML = "  请输入中文或者英文字母，不能包含数字！";
        return false;
    }
    return true;
}

/**
 * 数值验证
 */
function valueValidate(str, valueWarn) {
    if (str == "") {
        valueWarn.innerHTML = "  请输入当前城市的天气质量！";
        return false;
    }
    var pos = str.search(/\D/);
    if (pos >= 0) {
        valueWarn.innerHTML = "  请输入一个的正整数，不能包含中文、英文字母或者中间包含空格！";
        return false;
    }
    return true;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    var cityInput = document.getElementById("aqi-city-input");
    var valueInput = document.getElementById("aqi-value-input");
    var cityWarn = document.getElementById("city-warn");
    var valueWarn = document.getElementById("value-warn");

    cityWarn.innerHTML = "";
    valueWarn.innerHTML = "";

    var cityCheck = cityValidate(cityInput.value.trim(), cityWarn);
    var valueCheck = valueValidate(valueInput.value.trim(), valueWarn);

    if(cityCheck && valueCheck){
        addAqiData();
        renderAqiList();
    }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle( e ) {
    var trItem = e.target.parentNode.parentNode;
    var city = trItem.childNodes[0].textContent;
    delete aqiData[city];

    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = addBtnHandle;

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var delegateNode = document.getElementById("aqi-table");
    //事件代理
    delegateNode.addEventListener("click",function(e){
        if(e.target && e.target.nodeName.toUpperCase() == "BUTTON") {
            delBtnHandle( e );
        }
    });
}

init();
