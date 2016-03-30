(function() {
    /******************************
     *   任务一：
     *   给按钮button绑定一个点击事件，在事件处理函数中
     *   获取aqi-input输入的值，并显示在aqi-display中
     * 
     *******************************/
    var task1 = function() {
        // 获取DOM对象
        var inputText = document.getElementById("aqi-input"),
            displayText = document.getElementById("aqi-display"),
            btn = document.getElementById("button");
        // DOM事件处理
        btn.onclick = function() {
            var val = inputText.value;
            if(val == "") {
                displayText.textContent = "请在输入框中填写您要显示的内容";
            } else {
                displayText.textContent = inputText.value;  
            }
        };
    };
    task1();
    
    /******************************
     *   任务二：
     *   遍历读取aqiData中各个城市的数据
     *   将空气质量指数大于60的城市显示到aqi-list的列表中
     * 
     *******************************/
    var task2 = function() {
        var aqiData = [
        ["北京", 90],
        ["上海", 50],
        ["福州", 10],
        ["广州", 50],
        ["成都", 90],
        ["西安", 100]
        ];
        var aqiList = document.getElementById("aqi-list"),
            htmlStr = "";
        for(i = 0, len = aqiData.length; i < len; i++) {
            if(aqiData[i][1] > 60) {
                htmlStr +=  "<li>" + aqiData[i][0] + ", " + aqiData[i][1] + "</li>";
            }
        }
        aqiList.innerHTML = htmlStr;
    };
    task2();
        
    /******************************
     *   任务三：
     *   读取页面上已有的source列表，从中提取出城市以及对应的空气质量
     *   将数据按照某种顺序排序后，在resort列表中按照顺序显示出来
     * 
     *******************************/
    var task3 = {
        init: function() {
            var self = this,
                btn = document.getElementById("sort-btn");
            btn.onclick = function(){
                self.btnHandle();  
            };
        },
        // 获取列表中的数据
        getData: function() { 
            var src = document.getElementById("source"),
                tagList = src.getElementsByTagName("li"),
                data = [],
                airCity = "",
                airQuality = "";
            for(i = 0, len = tagList.length; i < len; i++) {
                airCity = tagList[i].textContent.replace(/\d+/g, "").trim();
                airQuality = tagList[i].innerText.match(/\d+/g)[0].trim();
                data.push({
                    "airCity": airCity,
                    "airQuality": airQuality 
                });
            }
            return data;
        },
       /**
        * 按空气质量对data进行从小到大的排序
        * @param:
        *     data, Array
        * @return: Array
        */
        sortAqiData: function(data) { 
            return data.sort(this.compare("airQuality"));
        },
        /**
        * 排序函数的对象数组比较函数
        * @param:
        *     propertyName, String
        * @return: Number
        */
        compare: function(propertyName) {
            return function(obj1, obj2) {
                var val1, val2;
                if(typeof obj1 === "object" && typeof obj2 === "object") {
                    val1 = obj1[propertyName];
                    val2 = obj2[propertyName];
                    if(val1 === val2) {
                        return 0;
                    }
                    if(typeof val1 === typeof val2) {
                        return val1 < val2 ? -1 : 1;
                    }
                }
            }
        },
        /**
         * 个位数转中文字符
         * @param
         *      num, String
         * @return String
         */
        sampleNumToChinese: function(num) {
            var obj = {
                "1": "一",
                "2": "二",
                "3": "三",
                "4": "四",
                "5": "五",
                "6": "六",
                "7": "七",
                "8": "八",
                "9": "九"
            };
            return obj[num];
        },
       /**
        * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
        * @param:
        *     data, Array
        */
        render: function(data) {
            var resort = document.getElementById("resort"),
                htmlStr = "",
                len = data.length;
            for(var i = 0; i < len; i++) {
                htmlStr += "<li>第" + this.sampleNumToChinese((i + 1).toString())
                        + "名：" + data[i]["airCity"] + "<b>"
                        + data[i]["airQuality"] + "</b></li>";
            }
            resort.innerHTML = htmlStr;
        },
        btnHandle: function() {
            var data = this.getData(),
                sortedData = this.sortAqiData(data);
            this.render(sortedData);
        }
    }
    task3.init();    
})();