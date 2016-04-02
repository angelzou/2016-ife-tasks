(function() {
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
        var inputValObj = document.getElementById("val-input"),
            msgObj = inputValObj.nextSibling;
        addEventHandler(inputValObj, 'keypress', function() {
            chkVal(this.value, msgObj);
        });
        addEventHandler(inputValObj, 'keyup', function() {
            chkVal(this.value, msgObj);
        });
        if (chkVal(inputValObj.value, msgObj)) {
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
        var span = document.createElement("span");
        document.getElementById("tips").innerText = "";
        span.innerText = getInputVal();
        if (!span.innerText) {
            return false;
        }
        queue.insertBefore(span, pos);
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
            alert(child.innerText);
        }
       
    }
    
    /**
     * 输入文本检查
     */
    function chkVal(val, msgObj) {
        if (!val.trim()) {
            msgObj.innerText = "请输入数字";
            return false;
        }
        if (!/^\d+$/.test(val)) {
            msgObj.innerText = "请输入数字，不要含有其它字符，例如：12";
            return false;
        }
        msgObj.innerText = "";
        return true;
    }
    
    function init() {
        getInputVal();
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
    }
    
    init();
})();