(function() {
    var queueArr = [], // 队列数组
        reg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/; // 匹配非数字、字母和中文的其它字符
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
    /**
     * 获取输入的数字
     */
    function getInputVal() {
        var inputValObj = document.getElementById("val-input");
        addEventHandler(inputValObj, 'keypress', function() {
            chkVal();
        });
        addEventHandler(inputValObj, 'keyup', function() {
            chkVal();
        });
        if (chkVal()) {
            return inputValObj.value;
        }
        return "";
    }
    /**
     * 入队
     */
    function queuePush(direction) {
        var queue = document.getElementById("queue");
        var pos = (direction === "left") ? queue.childNodes[0] : null;
        if (!chkVal()) {
            return false;
        }
        var contentArr = getInputVal().split(reg);
        document.getElementById("tips").innerText = "";
        queueArr = queueArr.concat(contentArr);
        for(var i = 0, len = contentArr.length; i < len; i++) {
            if (!contentArr[i]) {
                continue;
            }
            var span = document.createElement("span");
            span.innerText = contentArr[i];
            queue.insertBefore(span, pos);
        }
    }
    /**
     * 出队
     */
    function queuePop(direction) {
        var queue = document.getElementById("queue");
        if (queue.childElementCount === 0) {
            document.getElementById("tips").innerText = "队列中没有元素可以删除啦~~~，请添加元素哦~";
        } else {
            document.getElementById("tips").innerText = "";
            var child = (direction === "left") ? queue.firstElementChild : queue.lastElementChild;
            queue.removeChild(child);
            var val = (direction === "left") ? queueArr.shift() : queueArr.pop();
            alert(child.innerText);
        }
       
    }
    
    /**
     * 输入文本检查
     */
    function chkVal() {
        var inputValObj = document.getElementById("val-input"),
            msgObj = inputValObj.nextSibling,
            val = "";
        val = inputValObj.value;    
        if (!val.trim()) {
            msgObj.innerText = "请输入内容";
            return false;
        }
        // if (!/^\d+$/.test(val)) {
        //     msgObj.innerText = "请输入数字，不要含有其它字符，例如：12";
        //     return false;
        // }
        msgObj.innerText = "";
        return true;
    }
    /**
     * 搜索
     */
    function search(val) {
        if (!val) {
            alert("请输入要搜索的内容");
            return;
        }
        var queue = document.getElementById('queue').querySelectorAll("span");
        if (!queue.length) {
            return;
        }
        var reg = new RegExp(val);
        queueArr.forEach(function(v, k, arr) {
            if (reg.test(queue[k].innerText)) {
                queue[k].style.backgroundColor = "#f00";
            } else {
                queue[k].style.backgroundColor = "#cc11dd";
            }
        });
    }
    
    function init() {
        chkVal();
        var leftPush = document.getElementById("left-input-btn"),
            rightPush = document.getElementById("right-input-btn"),
            leftPop = document.getElementById("left-output-btn"),
            rightPop = document.getElementById("right-output-btn");
        addEventHandler(leftPush, 'click', function() {
            queuePush("left");
        });
        addEventHandler(rightPush, 'click', function() {
            queuePush("right");
        });
        addEventHandler(leftPop, 'click', function() {
            queuePop("left");
        });
        addEventHandler(rightPop, 'click', function() {
            queuePop("right");
        });
        var searchContent = document.getElementById("search-content"),
            searchBtn = document.getElementById("search-btn");
        addEventHandler(searchBtn, 'click', function() {
            search(searchContent.value);
        });
    }
    
    init();
})();