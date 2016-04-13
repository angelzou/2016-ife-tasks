;(function() {
    // 遍历二叉树
    var traverseBiTree = {
        config: {
            tree: [] // 存储树的顺序结构
        },
        init: function() {
            var self = this,
                preBtn = $("pre-btn"),
                midBtn = $("mid-btn"),
                postBtn = $("post-btn"),
                treeNodes = document.getElementsByClassName("tree-box")[0].firstElementChild;
            addEventHandler(preBtn, 'click', function() {
                self.preOrder(treeNodes); 
                self.traverseAnimation();
            });
            addEventHandler(postBtn, 'click', function() {
                self.postOrder(treeNodes);
                self.traverseAnimation(); 
            });
            addEventHandler(midBtn, 'click', function() {
                self.midOrder(treeNodes);
                self.traverseAnimation(); 
            });
        },
        // 前序遍历
        preOrder: function(node) {
            var self = this;
            if (node) {
                self.config.tree.push(node);
                self.preOrder(node.firstElementChild);
                self.preOrder(node.lastElementChild);
            }
        },
        // 中序遍历
        midOrder: function(node) {
            var self = this;
            if (node) {
                self.midOrder(node.firstElementChild);
                self.config.tree.push(node);
                self.midOrder(node.lastElementChild);
            }
        },
        // 后序遍历
        postOrder: function(node) {
            var self = this;
            if (node) {
                self.postOrder(node.firstElementChild);
                self.postOrder(node.lastElementChild);
                self.config.tree.push(node);
            }
        },
        // 二叉树遍历动画
        traverseAnimation: function() {
            var self = this,
                tree = self.config.tree,
                intervalId = null,
                start = 0,
                end = tree.length - 1;
            self.config.tree = []; // 清空节点，便于再次遍历
            tree[start].style.backgroundColor = "#f00";
            intervalId = setInterval(function() {
                if (start === end) {
                    tree[start].style.backgroundColor = "#fff";
                    clearInterval(intervalId);
                } else {
                    ++start;
                    tree[start-1].style.backgroundColor = "#fff";
                    tree[start].style.backgroundColor = "#f00";
                }
            }, 500);            
        }
    };
    // 事件监听
    function addEventHandler(elem, event, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(event, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + event, handler);
        } else {
            elem["on" + event] = handler;
        }
    }
    // 根据id选择器获取dom
    function $(id) {
        return document.getElementById(id);
    }
    
    traverseBiTree.init();
})();