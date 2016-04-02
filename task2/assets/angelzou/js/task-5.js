(function(){
    // 随机构建数据
    var randomBuildData = {
        getDateStr: function(dat) {
            var y = dat.getFullYear(),
                m = dat.getMonth() + 1,
                d = dat.getDate();
            m = m < 10 ? '0' + m : m;
            d = d < 10 ? '0' + d : d;
            return y + '-' + m + '-' + d;
        },
        buildData: function(seed) {
            var self = this;
            var returnData = [],
                temp = {},
                dat = new Date("2016-01-01"),
                datStr = '';
            for (var i = 1; i < 92; i++) {
                datStr = self.getDateStr(dat);
                dat.setDate(dat.getDate() + 1);
                returnData.push({
                    "time": datStr,
                    "airQuatity": Math.ceil(Math.random() * seed),
                    "day": 1
                });
            }
            return returnData;
        }
    };
    // 构建的原始数据
    var aqiSourceData = {
        "北京": randomBuildData.buildData(500),
        "上海": randomBuildData.buildData(300),
        "广州": randomBuildData.buildData(200),
        "深圳": randomBuildData.buildData(100),
        "成都": randomBuildData.buildData(300),
        "西安": randomBuildData.buildData(500),
        "福州": randomBuildData.buildData(100),
        "厦门": randomBuildData.buildData(100),
        "沈阳": randomBuildData.buildData(500)
    };
    
    // var util = {
    //     /**
    //      * 获取选择的radio值
    //      * @param
    //      *      radioObj, DOM Object
    //      * @return String
    //      */
    //     getRadioChkValue: function(radioObj) {
    //         for(var i = 0, len = radioObj.length; i < len; i++) {
    //             radioObj[i].onclick = function() {
    //                 if(this.checked) {
    //                     console.log(this.value);
    //                     return this.value;
    //                 }
    //             };
    //         }
    //     },
    //     /**
    //      * 获取select标签选中的option中的值
    //      * @param
    //      *      selectObj, DOM Object
    //      * @return String
    //      */
    //     getSelectChkValue: function(selectObj) {
    //         var optionsObj = selectObj.getElementsByTagName("option");
    //         for(var i = 0, len = optionsObj.length; i < len; i++) {
    //             if(optionsObj[i].selected) {
    //                 return optionsObj[i].value;
    //             }
    //         }
    //     }  
    // };
    
    var chart = {
        colorData: {}, // 存储随机生成的color数据
        chartData: {}, // 用于渲染图表的数据
        rectangleWidth: {
            "day": "15px",
            "week": "50px",
            "month": "100px"
        },
        pageState: { // 记录当前页面的表单选项
            nowSelectCity: "北京",
            nowGraTime: "day"
        },
        init: function() {
            var self = this;
            self.initGraTimeForm();
            self.initCitySelector();
            self.initAqiChartData(); 
            self.renderChart();
        },
        /**
         * 日、周、月的radio事件点击时的处理函数
         */
        graTimeChange: function(radioObj) {
            var self = this;
            for(var i = 0, len = radioObj.length; i < len; i++) {
                radioObj[i].onclick = function() {
                    if(this.checked) {
                        self.pageState.nowGraTime =  this.value;
                        self.initAqiChartData();
                        self.renderChart();  
                    }
                };
            }
        },
        /**
         * select发生变化时的处理函数
         */
        citySelectChange: function(selectObj) {
            var optionsObj = selectObj.getElementsByTagName("option"),
                self = this;
            for(var i = 0, len = optionsObj.length; i < len; i++) {
                if(optionsObj[i].selected) {
                    self.pageState.nowSelectCity = optionsObj[i].value; 
                    self.initAqiChartData(); 
                    self.renderChart();   
                }
            }         
        },
        chartItemMouseOver: function(chartItems) {
            var self = this;
            for(var i = 0, len = chartItems.length; i < len; i++) {
                chartItems[i].onmouseover = (function(j) {
                    return function() {
                        var descMsg = "<span>时间：" + 
                          self.chartData.result[j].time + "<br>" +
                          "空气质量：" + self.chartData.result[j].airQuatity + "</span>";
                         this.innerHTML = descMsg;
                    };
                })(i);
                
                chartItems[i].onmouseout = function() {
                    this.innerHTML = "";
                };
            }
        },
        /**
         * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
         */
        initGraTimeForm: function() {
            var radioObj = document.getElementsByName("gra-time");
            this.graTimeChange(radioObj);
        },
        /**
         * 初始化城市Select下拉选择框中的选项
         */
        initCitySelector: function() {
            var self = this,
                selectObj = document.getElementById("city-select");
            selectObj.onchange = function() {
                self.citySelectChange(selectObj);
            };
        },
        /**
         * 初始化图表需要的数据格式
         */
        initAqiChartData: function() {
             var self = this,
                 srcData = aqiSourceData[self.pageState.nowSelectCity],
                 rectangleWidth = self.rectangleWidth[self.pageState.nowGraTime],
                 resultData = [],
                 len = srcData.length,
                 margin = "";
             var sum = 0, start = "", end="", j = 0;
             if(self.pageState.nowGraTime === "day") {
                resultData = srcData;
                margin = "0 4";
             }
             if(self.pageState.nowGraTime === "week") {
                 for(var k = 0; k < len; k++) {
                     if(j === 0) {
                         start = srcData[k].time;
                     }
                     if(self.getDay(srcData[k].time) < 7) {
                         sum += srcData[k].airQuatity;
                         j++;
                     }  
                     if(self.getDay(srcData[k].time) === 7 || k === len - 1) {
                        j++;
                        end = srcData[k].time;
                        sum += srcData[k].airQuatity;
                        resultData.push({
                            "time": start + "到" + end,
                            "airQuatity": (sum / j).toFixed(2),
                            "day": j
                        });
                        sum = 0;
                        j = 0;
                     }
                 }
                 margin = "0 8";
             }
             if(self.pageState.nowGraTime === "month") {
                 var n = 0;
                 for(var m = 0; m < len; m++) {
                     flag = self.getMonth(srcData[m].time);
                     if(m !== 0 && self.getMonth(srcData[m - 1].time) !== flag || m === len - 1) {
                         resultData.push({
                            "time": self.getYear(srcData[m - 1].time) + "年" + self.getMonth(srcData[m - 1].time) + "月",
                            "airQuatity": (sum / n).toFixed(2),
                            "day": n
                         });
                         sum = 0;
                         n = 0;
                     } 
                     sum += srcData[m].airQuatity; 
                     n++;
                 }
                 margin = "0 15";
             }
             self.randomColor(resultData.length);
             self.chartData = {
                 color: self.colorData,
                 result: resultData,
                 width: rectangleWidth,
                 margin: margin
             };
             console.log(self.chartData);    
        },
        getDay: function(time) {
            return new Date(Date.parse(time)).getDay() + 1;  
        },
        getMonth: function(time) {
            return new Date(Date.parse(time)).getMonth() + 1;
        },
        getYear: function(time) {
            return new Date(Date.parse(time)).getFullYear();
        },
        /**
         * 自动生成颜色
         */
        randomColor: function(count) {
            var self = this;
            for(var i = 0; i < count; i++) {
                var color;
                color = Math.floor(Math.random() * 0x1000000); 
                color = color.toString(16);                    
                color = ("000000" + color).slice(-6);          
                color = "#" + color;    
                if(!self.colorData[i]) {
                    self.colorData[i] = color;
                }
            } 
        },
        /**
         * 渲染图表
         */
        renderChart: function() {
            var chart = document.getElementById("aqi-chart-wrap"),
                self = this,
                htmlStr = "",
                result = self.chartData.result;
            for(var i = 0, len = result.length; i < len; i++) {
                htmlStr += "<i style='background-color:" + 
                        self.chartData.color[i.toString()] + ";width:" + 
                        self.chartData.width + ";height:" + 
                        result[i].airQuatity + "px;margin:" + 
                        self.chartData.margin + "px;z-index:" + (len - i)  + ";' class='flex-items'></i>";
            }
            chart.innerHTML = htmlStr;
            var chartItems = chart.getElementsByClassName("flex-items");
            self.chartItemMouseOver(chartItems);
        } 
    };
    chart.init();
})();