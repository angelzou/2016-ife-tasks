;(function() {
     /**
     * 事件监听处理函数
     */
    function addEventHandler(elem, event, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(event, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + event, handler);
        } else {
            elem["on" + event] = handler;
        }
    }
    // 根据id选择器获取dom对象
    function $(id) {
        return document.getElementById(id);
    }
    // 去掉默认的Tab行为
    addEventHandler(document, 'keydown', function(event) {
        var e = event || window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode === 9) {
            if (e.preventDefault) {
                e.preventDefault(); 
            } else {
                e.returnValue = false;
            }
        }   
    });
    
    var formInfo = {
        // 配置信息
        config: {
            tags: [],
            hobbys: [],
            reg: /[\n\t\s,，.。、\/;；'‘“"]+/
        },
        init: function() {
            this.tagInputHandler();
            this.tagListHandler();
            this.hobbyHaddler();
            // this.getKeyCode();
        },
        // 输入文本校验
        chkInputVal: function(val) {
            if (val.trim() === "") {
                return false;
            }
            return true;
        },
        // 标签输入事件
        tagInputHandler: function() {
            var self = this,
                tagInput = $("tag-input");
            addEventHandler(tagInput, 'keyup', function(e) {
                var tagVal = this.value.replace(self.config.reg, '').trim();
                if (!self.chkInputVal(tagVal)) {
                    return false;
                }
                if (self.config.reg.test(this.value) || e.keyCode === 9 ||
                    e.keyCode === 13) {
                    this.value = "";
                    // 判断标签是否已经存在
                    if (self.config.tags.indexOf(tagVal) !== -1) {
                        return false;
                    }
                    self.renderTagList(tagVal);
                }
            });
        },
        // 标签列表鼠标事件
        tagListHandler: function() {
            var self = this,
                tagList = $("tag-list");
            addEventHandler(tagList, 'mouseover', function(e) {
                var item = e.target || e.srcElement;
                if (item.tagName.toLocaleLowerCase() === "li") {
                    item.style.backgroundColor = "#2d7070";
                    item.innerText = "点击可删除 " + item.innerText; 
                }
            });
            addEventHandler(tagList, "mouseout", function(e) {
                var item = e.target || e.srcElement;
                if (item.tagName.toLocaleLowerCase() === "li") {
                    item.style.backgroundColor = "#339999";
                    item.innerText = item.innerText.replace("点击可删除 ", "");
                }
            });
            addEventHandler(tagList, "click", function(e) {
                var item = e.target || e.srcElement;
                if (item.tagName.toLocaleLowerCase() === "li") {
                    var index = self.config.tags.indexOf(item.innerText.replace("点击可删除 ", ""));
                    self.config.tags = self.config.tags.splice(index, 1);
                    item.remove();
                } 
            });
        },
        // 标签列表渲染
        renderTagList: function(tagVal) {
            var tagList = $("tag-list");            
            if (this.config.tags.length === 10) {
                this.config.tags.shift();
                tagList.removeChild(tagList.firstElementChild);
            }
            this.config.tags.push(tagVal);
            var li = document.createElement("li");
            li.innerText = tagVal;
            tagList.appendChild(li);
        },
        // 添加爱好操作
        hobbyHaddler: function() {
            var self = this,
                hobbyBtn = $("default-btn"),
                hobbyInput = $("hobby-input");
                
            addEventHandler(hobbyBtn, 'click', function() {
                var hobbyContent = hobbyInput.value.trim();
                if (!self.chkInputVal(hobbyContent)) {
                    return false;
                } 
                self.config.hobbys = self.config.hobbys.concat(hobbyContent.split(self.config.reg));
                self.config.hobbys = self.delRepeat(self.config.hobbys);
                if (self.config.hobbys.length > 10) {
                    self.config.hobbys.splice(0, self.config.hobbys.length - 10);
                }
                self.renderHobbyList();
                // console.log(self.config);
            });
        },
        // 爱好列表渲染
        renderHobbyList: function() {
            var hobbyList = $("hobby-list"),
                self = this;
            hobbyList.innerHTML = "";
            if (self.config.hobbys.length < 1) {
                return false;
            }
            self.config.hobbys.forEach(function(v, k, arr) {
                self.config.hobbys.push(v);
                var li = document.createElement("li");
                li.innerText = v;
                hobbyList.appendChild(li); 
            });
        },
        // 数组去重
        delRepeat: function(arr) {
            var tmp = {},
                newArr = [];
            tmp[arr[0]] = arr[0];
            newArr.push(arr[0]);
            for(var i = 0, len = arr.length; i < len; i++) {
                if(!tmp[arr[i]]) {
                    tmp[arr[i]] = arr[i];
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        }
    };
    formInfo.init();

})();