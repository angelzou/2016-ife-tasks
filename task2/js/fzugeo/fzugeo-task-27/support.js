/**
 * @file 辅助类文件
 * @author Fzu_Geo
 */

/**
 * 获取时间
 *
 * @private
 * @return {String} 返回值是一个字符串，
 *      通过该函数可以获得服务器当前时间
 */
function getTime() {
    var date = new Date();
    var year = ("0000" + date.getFullYear()).substr(-4);
    var month = ("00" + (date.getMonth() + 1)).substr(-2);
    var day = ("00" + date.getDay()).substr(-2);
    var hour = ("00" + date.getHours()).substr(-2);
    var minute = ("00" + date.getMinutes()).substr(-2);
    var second = ("00" + date.getSeconds()).substr(-2);
    var millisecond = ("000" + date.getMilliseconds()).substr(-3);
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + millisecond;
}

/**
 * 检查当前轨道是否有飞船
 *
 * @private
 * @return {boolean} 返回值是一个布尔值，
 *      如果当前轨道有飞船，返回 true，否则返回 false。
 */
var checkOrbit = function (orbit) {
    var spaceShipList = SpaceShipListManager.getShipList();
    for(var i = 0, length = spaceShipList.length; i < length; ++i){
        if (orbit == spaceShipList[i].orbitNo) {
            return true;
        }
    }
    return false;
};


/**
 * 使用单例模式获得控制台实例
 *
 * @private
 * @return {Function} 返回值是一个函数，
 *      通过该函数可以获得控制台唯一实例。
 */
var Logger = (function () {
    var loggerInstance;

    return {
        getInstance: function() {
            // 如果没有控制台实例，就创建一个
            if(!loggerInstance) {
                loggerInstance = {};
                loggerInstance.element = document.getElementById("console-text");

                /**
                 * 控制台普通信息打印输出，白色字体
                 *
                 * @private
                 * @return 无
                 */
                loggerInstance.log = function (text) {
                    var p = document.createElement("p");
                    p.style.color = "#ffffff";
                    p.textContent = getTime() +"-"+text;
                    this.element.appendChild(p);
                    this.element.scrollTop = this.element.scrollHeight;
                };

                /**
                 * 控制台成功信息打印输出，绿色字体
                 *
                 * @private
                 * @return 无
                 */
                loggerInstance.success = function (text) {
                    var p = document.createElement("p");
                    p.style.color = "#369f1d";
                    p.textContent = getTime() +"-"+text;
                    this.element.appendChild(p);
                    this.element.scrollTop = this.element.scrollHeight;
                };

                /**
                 * 控制台警告信息打印输出，黄色字体
                 *
                 * @private
                 * @return 无
                 */
                loggerInstance.warn = function (text) {
                    var p = document.createElement("p");
                    p.style.color = "#fffaad";
                    p.textContent = getTime() +"-"+text;
                    this.element.appendChild(p);
                    this.element.scrollTop = this.element.scrollHeight;
                };

                /**
                 * 控制台错误信息打印输出，红色字体
                 *
                 * @private
                 * @return 无
                 */
                loggerInstance.error = function (text) {
                    var p = document.createElement("p");
                    p.style.color = "#ff7986";
                    p.textContent = getTime() +"-"+text;
                    this.element.appendChild(p);
                    this.element.scrollTop = this.element.scrollHeight;
                };
            }

            // 如果存在控制台实例，直接返回该实例
            return loggerInstance;
        }
    };
})();