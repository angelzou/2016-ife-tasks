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
    // 存队列的数组
    var queueArr = [];
    var delayTime = 500;
    /**
     * 获取输入的数字
     */
    function getInputVal() {
        var inputValObj = document.getElementById("val-input");
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
        var span = document.createElement("span");
        document.getElementById("tips").innerText = "";
        var val = getInputVal();
        span.innerText = val;
        if (!chkVal()) {
            return false;
        }
        var count = (direction === "left") ? queueArr.unshift(val) : queueArr.push(val);
        queue.insertBefore(span, pos);
        renderRect("push", direction, val);
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
            var val = (direction === "left") ? queueArr.shift() : queueArr.pop();
            queue.removeChild(child);
            renderRect("pop", direction);
            alert(val);
        }
    }
    /**
     * 数字队列的矩形图表渲染
     * @param
     *      method, String, 值为push时是插入数据，反之删除数据
     *      direction，String，值为left表示从左边删除或者插入数据，
     * 反之从右边删除或者插入数据
     *      num，Number，插入队列的数据值
     */
    function renderRect(method, direction, num) {
        var queueRect = document.getElementById("queueRectangle");
        var child = document.createElement("div");
        var pos = (direction === "left") ? queueRect.childNodes[0] : null;
        child.className = "flex-item";
        child.style.height = num * 2 +  "px";
        var rChild = (direction === "left") ? queueRect.firstElementChild : queueRect.lastElementChild;
        var result = (method === "push") ? queueRect.insertBefore(child, pos) : queueRect.removeChild(rChild);
    }
    
    /**
     * 输入文本检查
     */
    function chkVal() {
        var inputValObj = document.getElementById("val-input"),
            msgObj = inputValObj.nextSibling,
            val = "";
        val = inputValObj.value;    
        if (!val.trim() || !/^\d+$/.test(val)) {
            msgObj.innerText = "请输入数字";
            return false;
        }
        if (parseInt(val) < 10 || parseInt(val) > 100) {
            msgObj.innerText = "请输入数字，并且该数字在10到100之间，例如：12";
            return false;
        }
        if (queueArr.length > 60) {
            msgObj.innerText = "队列中数字个数不能超过60个哦~";
            return false;
        }
        msgObj.innerText = "";
        return true;
    }
    /**
     * 根据排序后的数组，重新渲染
     */
    function renderGraph() {
        var queueRect = document.getElementById("queueRectangle"),
            queue = document.getElementById("queue");
        queueRect.innerHTML = "";
        queue.innerHTML = "";
        for(var i = 0, len = queueArr.length; i < len; i++) {  
            var child = document.createElement("div"),
                span = document.createElement("span");
            child.className = "flex-item";
            child.style.height = queueArr[i] * 2 + "px";
            child.title = queueArr[i];
            span.innerText = queueArr[i];
            queueRect.appendChild(child);
            queue.appendChild(span);
        }
    }
    /**
     * 数组排序，快排
     */
    // function quickSort(arr) {
    //     var len = arr.length;
    //     if (len <= 1) {
    //         return arr;
    //     }
    //     var mid = Math.floor(len/2),
    //         midNum = arr.splice(mid, 1)[0],
    //         left = [],
    //         right = [];
    //     for (var i = 0; i < len-1; i++) {
    //         if (arr[i] < midNum) {
    //             left.push(arr[i]);
    //         } else {
    //             right.push(arr[i]);
    //         }
    //     }
    //     return sort(left).concat(midNum, sort(right));
    // }
    Array.prototype.quickSort = function() {
        quickSortHandler(this, 0, this.length-1);
        function quickSortHandler(arr, start, end) {
            if(start < end) {
                var par = partition(arr, start, end);
                delay(function() {
                    quickSortHandler(arr, start, par-1);
                }, delayTime);
                delay(function() {
                    quickSortHandler(arr, par+1, end);
                }, delayTime);
                // arguments.callee(arr, start, par-1);
                // arguments.callee(arr, par+1, end);
            } 
        }
        // 获取分区位置值
        function partition(arr, start, end) {
            var pivot = arr[end],
                i = start;
            for(var j = start; j < end; j++) {
                if (arr[j] < pivot) {
                    if (i != j) {
                        swap(arr, i, j);
                        renderGraph();
                        // console.log(arr);
                    } 
                    i++;
                }
            }
            swap(arr, i, j);
            renderGraph();
            // console.log(arr);
            return i;
        }
        // 交换函数
        function swap(arr, a, b) {
            var tmp = arr[a];
            arr[a] = arr[b];
            arr[b] = tmp; 
        }
    };
    // http://stackoverflow.com/questions/6921275/is-it-possible-to-chain-settimeout-functions-in-javascript
    function delay(fn, t) {
        // private instance variables
        var queue = [], self, timer;
        function schedule(fn, t) {
            timer = setTimeout(function() {
                timer = null;
                fn();
                if (queue.length) {
                    var item = queue.shift();
                    schedule(item.fn, item.t);
                }
            }, t);            
        }
        self = {
            delay: function(fn, t) {
                // if already queuing things or running a timer, 
                //   then just add to the queue
                if (queue.length || timer) {
                    queue.push({fn: fn, t: t});
                } else {
                    // no queue or timer yet, so schedule the timer
                    schedule(fn, t);
                }
                return self;
            },
            cancel: function() {
                clearTimeout(timer);
                queue = [];
            }
        };
        return self.delay(fn, t);
    }
    
    function init() {
        chkVal();
        var leftPush = document.getElementById("left-input-btn"),
            rightPush = document.getElementById("right-input-btn"),
            leftPop = document.getElementById("left-output-btn"),
            rightPop = document.getElementById("right-output-btn"),
            inputValObj = document.getElementById("val-input"),
            sort = document.getElementById("sort"),
            initData = document.getElementById("init-data");
        addEventHandler(inputValObj, 'keypress', chkVal);
        addEventHandler(inputValObj, 'keyup', chkVal);
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
        // 初始化队列数据
        addEventHandler(initData, 'click', function() {
            queueArr = [];
            for(var i = 0; i < 50; i++) {
                queueArr.push(Math.floor(Math.random()*90 + 10));
            }
            renderGraph(); 
        });
        addEventHandler(sort, 'click', function() {
            queueArr.quickSort(); 
        });
    }
    init();
})();