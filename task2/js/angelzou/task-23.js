;(function() {
    // 遍历二叉树
    var traverseBiTree = {
        config: {
            tree: [], // 存储树的顺序结构
            run: false, // 动画进行标识，true为正在进行
            searchResult: []
        },
        init: function() {
            var self = this,
                depthBtn = $("depth-btn"),
                breadthBtn = $("breadth-btn"),
                depthSearch = $("depth-search"),
                breadthSearch = $("breadth-search"),
                treeNodes = document.getElementsByClassName("tree-box")[0].firstElementChild;
            addEventHandler(depthBtn, 'click', function() {
                self.depthOrder(treeNodes); 
                self.traverseAnimation();
            });
            addEventHandler(breadthBtn, 'click', function() {
                self.breadthOrder(treeNodes);
                self.traverseAnimation(); 
            });
            addEventHandler(depthSearch, 'click', function() {
                breadthSearch.nextElementSibling.innerText = "";
                var searchText = $("search-value").value;
                if (self.chkVal(searchText)) {
                    self.depthOrder(treeNodes); 
                    self.traverseAnimation(searchText);
                } else {
                    breadthSearch.nextElementSibling.innerText = "请输入要检索的文本";
                }
            });
            addEventHandler(breadthSearch, 'click', function() {
                breadthSearch.nextElementSibling.innerText = "";
                var searchText = $("search-value").value;
                if (self.chkVal(searchText)) {
                    self.breadthOrder(treeNodes);
                    self.traverseAnimation(searchText);
                } else {
                    breadthSearch.nextElementSibling.innerText = "请输入要检索的文本";
                }
            });
        },
        chkVal: function(val) {
            if (!val) {
                return false;
            }
            return true;
        },
        searchResultDisplay: function() {
            var breadthSearch = $("breadth-search");
            console.log(this.config.searchResult);
            if (this.config.searchResult.length === 0) {
                breadthSearch.nextElementSibling.innerText = "没有检索到匹配的文本";
            }
            this.config.searchResult = [];
        },
        // 深度优先遍历
        depthOrder: function(node) {
            var self = this;
            if (self.run) {
                return;
            }
            if (node) {
                self.config.tree.push(node);
                for (var i = 0, len = node.children.length; i < len; i++) {
                    self.depthOrder(node.children[i]);
                }
            }
        },
        // 广度优先遍历
        breadthOrder: function(node) {
            var self = this,
                tmp = [];
            if (self.run) {
                return;
            }
            if (node) {
                self.config.tree.push(node);
                var cnode = node;
                while(cnode) {
                    for (var i = 0, len = cnode.children.length; i < len; i++) {
                        tmp.push(cnode.children[i]);
                    }
                    cnode = tmp.shift();
                    if (cnode) {
                        self.config.tree.push(cnode);
                    }
                }
            }
        },
        // 二叉树遍历动画
        traverseAnimation: function(val) {
            var self = this,
                tree = self.config.tree,
                intervalId = null,
                start = 0,
                end = tree.length - 1;
            if (val !== "" && val) {
                var reg = new RegExp(val);
            }
            self.run = true;
            self.config.tree = []; // 清空节点，便于再次遍历
            tree[start].style.backgroundColor = "#f00";
            intervalId = setInterval(function() {
                if (start === end) {
                    tree[start].style.backgroundColor = "#fff";
                    clearInterval(intervalId);
                    if (self.chkVal(val)) {
                        self.searchResultDisplay();
                    }
                    self.run = false;
                } else {
                    ++start;
                    tree[start-1].style.backgroundColor = "#fff";
                    if (val && reg.test(tree[start].firstChild.nodeValue.toLowerCase())) {
                        self.config.searchResult.push(tree[start]);
                        tree[start].style.backgroundColor = "#00f";
                    } else {
                        tree[start].style.backgroundColor = "#f00";
                    }
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