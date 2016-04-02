(function() {
    var task4 = {
        // 初始化函数
        init: function() {
            var self = this;
            self.aqiInitData = [
                {
                    "city": "beijing",
                    "quatity": "90"
                }
            ];
            self.render(); 
            self.addBtnHandle();
            self.delBtnHandle();
        },
        // 获取数据
        getData: function() {
            var chkObj = {
                "aqiCityInput": document.getElementById("aqi-city-input"),
                "aqiValueInput": document.getElementById("aqi-value-input")
            };
            if(this.checkInput(chkObj)) {
                var data = {
                    "city": chkObj.aqiCityInput.value.trim(),
                    "quatity": chkObj.aqiValueInput.value.trim()
                };
                this.aqiInitData.push(data);
            }
            return this.aqiInitData;
        },
        /**
         * 添加信息操作
         */
        addBtnHandle: function() {
            var self = this,
                btn = document.getElementById("aqi-btn");
            btn.onclick = function() {
                self.getData();
                self.render();  
            };
        },
        /**
         * 输入信息检查
         * @param 
         *      chkObj, Object
         * @return boolean
         */
        checkInput: function(chkObj) {
            var aqiCityInput = chkObj.aqiCityInput.value.trim(),
                aqiValueInput = chkObj.aqiValueInput.value.trim();
            if( !aqiCityInput || !this.reTest(/[a-zA-Zu4e00-u9fa5a-zA-Z]*/, aqiCityInput)) {
                chkObj.aqiCityInput.parentElement.nextElementSibling.innerText = "请输入城市名称,并且城市名必须为中英文字符";
                return false;
            } else {
                chkObj.aqiCityInput.parentElement.nextElementSibling.innerText = "";
            }
            if( !aqiValueInput || !this.reTest(/[\d]+/, aqiValueInput)) {
               chkObj.aqiValueInput.parentElement.nextElementSibling.innerText = "请输入空气质量指数,并且空气质量指数必须为整数";
               return false;
            } else {
                chkObj.aqiValueInput.parentElement.nextElementSibling.innerText = "";
            }
            return true;
        },
        /**
         * 正则匹配，匹配成功返回true，反之返回false
         * @param
         *      re, RegExp
         *      str, string
         * @return boolean
         */
        reTest: function(re, str) {
            return re.test(str);
        },
        // 删除操作
        delBtnHandle: function() {
            var aqiList = document.getElementById("aqi-table");
            var btn = aqiList.getElementsByTagName("button");
            for(var i = 0, len = btn.length; i < len; i++) {
                btn[i].onclick = function() {
                    var self = this;
                    self.parentElement.parentElement.remove();
                };
            }
        },
        /**
         * 页面渲染
         */
        render: function() {
            if(this.aqiInitData.length === 0) {
                return ;
            }
            var aqiList = document.getElementById("aqi-table"),
                htmlStr = "";
            for(var i = 0, len = this.aqiInitData.length; i < len; i++) {
                htmlStr += "<tr><td>" + this.aqiInitData[i].city + 
                          "</td><td>" + this.aqiInitData[i].quatity + 
                          "</td><td><button>删除</button></td></tr>";
            }
               
            var tbody = aqiList.getElementsByTagName("tbody")[0];
            tbody.innerHTML = htmlStr;
            this.delBtnHandle();
        }
    };
    task4.init();
})();