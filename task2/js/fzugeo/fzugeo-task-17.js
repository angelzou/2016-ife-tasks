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

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 120; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "-1",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var chartWrap = document.querySelector(".aqi-chart-wrap");
    //每次渲染图标现将容器置空
    chartWrap.innerHTML = "";
    var index = 0;
    //获取渲染数据的总数
    var length = Object.keys(chartData).length,
        width = chartWrap.clientWidth;

    //计算图标中各种尺寸参数
    var itemWidth = width / (length*2),
        itemSpace = width / (length),
        offsetLeft = itemWidth / 2;

    /**
     * 渲染图表操作
     *
     * chartData 样例 { date : value}
     * {
     *  2016-01-04 : 466,
     *  2016-01-05 : 365
     * }
     */
    for (var date in chartData){
        var item = document.createElement("div"),
            value = chartData[date],
            colorSeed = 255 * (1 - value/500);

        //配置 item 各种属性
        item.setAttribute("title", "时间："+date+"数值："+value);
        item.style.bottom = 0;
        item.style.left = itemSpace * (index++) + offsetLeft + "px";
        item.style.height = Math.floor(value) + "px";
        item.style.width = itemWidth + "px";
        item.style.position = "absolute";
        item.style.backgroundColor  = "rgba("+ Math.floor(Math.random() * colorSeed) + ", " + Math.floor(Math.random() * colorSeed) + ", " + Math.floor(Math.random() * colorSeed) +", 0.6)"; //背景颜色

        chartWrap.appendChild(item);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var checkedVal = document.querySelector("input[name = 'gra-time']:checked").value;
    if (checkedVal != pageState.nowGraTime){
        // 设置对应数据
        pageState.nowGraTime = checkedVal;
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var city = this.value;
    if (city !== pageState.nowSelectCity) {
        // 设置对应数据
        pageState.nowSelectCity = city;
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var delegateNode = document.getElementById("form-gra-time");
    addEventHandler(delegateNode, 'click', function (e) {
        if(e.target.name == "gra-time")
            graTimeChange();
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.getElementById("city-select");
    var cityArray = Object.keys(aqiSourceData);
    cityArray.forEach(function(item, index, array) {
        var optionItem = document.createElement("option");
        optionItem.value = item;
        optionItem.textContent = item;
        citySelect.appendChild(optionItem);
    });
    pageState.nowSelectCity = cityArray[0];

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    addEventHandler(citySelect, "change", citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    chartData = {};
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    if(time == "month"){
        var monthCount ;
        var countData = {};
        for (var temp in aqiSourceData[city]) {
            var timeList = temp.split("-"),
                year = timeList[0],
                month = timeList[1];

            var key = year + "-" + month;
            if(!countData[key]){
                countData[key] = {"amount" : aqiSourceData[city][temp],"count" : 1};
            }else {
                countData[key] = {"amount" : aqiSourceData[city][temp] + countData[key]["amount"],"count" : 1 + countData[key]["count"]};
            }
        }

        console.log(countData)

        for (var mon in countData){
            var value = countData[mon]["amount"] / countData[mon]["count"];
            chartData[mon] = value;
        }
    }else if(time == "week"){
        var weekCount = 0;
        for (var temp in aqiSourceData[city]){
            var timeList = temp.split("-");
            var year = timeList[0],
                month = timeList[1],
                day = timeList[2];
            var newDate = new Date(year, month, day);
            var nth = newDate.getDay();
            var average = 0;
            var amount = 0;
            var dayCount = 0;
            if(nth < 6){
                amount += aqiSourceData[city][temp];
                ++dayCount;
            }else {
                amount += aqiSourceData[city][temp];
                ++dayCount;
                average = amount / dayCount;
                ++weekCount;
                key = "第"+weekCount+"周";
                chartData[key] = average;
                var average = 0;
                var amount = 0;
                var dayCount = 0;
            }
        }
    }else if(time == "day"){
        chartData = aqiSourceData[city];
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();