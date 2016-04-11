/**
 * @file 类的构造函数文件
 * @author Fzu_Geo
 */

var spaceShipList = [];

/**
 * 飞船类
 * 构造函数模式与原型模式结合
 *
 * @param {Object} options 飞船的初始化数据，
 *      来自指令系统。
 * @constructor
 */
function SpaceShip(options) {
    /**
     * 飞船所在轨道
     *
     * @type {number}
     * @private
     */
    this.orbitNo = options.orbitNo;
    /**
     * 飞船所在轨道位置（角度）
     *
     * @type {number}
     * @private
     */
    this.position = options.position;

    /**
     * 飞船动力系统状态，是否在飞行
     *
     * @type {number}
     * @private
     */
    this.powerStatus = options.powerStatus;

    /**
     * 飞船能源系统状态
     *
     * @type {number}
     * @private
     */
    this.energyStatus = options.energyStatus;

    /**
     * 飞船行驶速度
     *
     * @type {number}
     * @public
     */
    this.speed = options.speed;

    /**
     * 飞船能量回复速度
     *
     * @type {number}
     * @private
     */
    this.recoveryRate = options.recoveryRate;

    /**
     * 飞船能量回复速度
     *
     * @type {number}
     * @private
     */
    this.consumeRate = options.consumeRate;

    /**
     * 飞船剩余能量
     *
     * @type {number}
     * @private
     */
    this.suplusEnergy = options.suplusEnergy;

    /**
     * 飞船摧毁状态
     *
     * @type {boolean}
     * @private
     */
    this.destroyStatus = options.destroyStatus;
}

// SpaceShip 动力系统原型方法
/**
 * 飞船起飞
 *
 * @private
 * @return 无返回值
 */
SpaceShip.prototype.launchShip = function () {
    if (this.energyStatus) {
        this.powerStatus = 1;
        Logger.getInstance().success("向轨道" + this.orbitNo + "发送的 " + "start" + " 执行成功！");
    } else {
        Logger.getInstance().error("向轨道" + this.orbitNo + "发送的 " + "start" + " 执行失败，正在充能！");

    }
};
/**
 *飞船停止
 *
 * @private
 * @return 无返回值
 */
SpaceShip.prototype.stopShip = function () {
    this.powerStatus = 0;
    Logger.getInstance().success("向轨道" + this.orbitNo + "发送的 " + "stop" + " 执行成功！");

};
/**
 *飞船巡航，改变位置的角度
 *
 * @private
 * @return 无返回值
 */
SpaceShip.prototype.cruise = function () {
    if(this.powerStatus) {
        this.position += this.speed;
    }
    this.position = this.position % 360;
}

// SpaceShip 能源系统原型方法
/**
 * 能量恢复
 *
 * @private
 * @return 无返回值
 */
SpaceShip.prototype.recoverEnergy = function () {
    this.suplusEnergy += this.recoveryRate;
    if (this.suplusEnergy > 100) {
        this.suplusEnergy = 100;
        this.energyStatus = 1;
    }
};
/**
 * 能量消耗
 *
 * @private
 * @return 无返回值
 */
SpaceShip.prototype.consumeEnergy = function () {
    if (this.powerStatus){
        this.suplusEnergy -= this.consumeRate;
    }
    if (this.suplusEnergy < 0) {
        this.suplusEnergy = 0;
        this.energyStatus = 0;
        this.powerStatus = 0;
        Logger.getInstance().warn("轨道" + this.orbitNo + "上的飞船能量耗尽，正在充能！");
    }
};

// SpaceShip 自爆系统
/**
 *飞船摧毁
 *
 * @private
 * @return 无返回值
 */
SpaceShip.prototype.destroyShip = function () {
    this.destroyStatus = true;
    Logger.getInstance().warn("轨道" + this.orbitNo + "上的飞船自爆！！");
};

// SpaceShip 信号接收及处理系统
/**
 * 信号接收及处理,command 格式为：{
 *          id : 1,
 *          command : "stop"
 * }
 *
 * @private
 * @return 无返回值
 */
SpaceShip.prototype.signalProcess = function (command) {
    if (command.id != this.orbitNo) {
        return;
    }
    switch (command.content) {
        case 'start':
            this.launchShip();
            break;
        case 'stop':
            this.stopShip();
            break;
        case 'destroy':
            this.destroyShip();
            break;
    };
};

/**
 * 使用单例模式获得指挥官实例
 *
 * @private
 * @return {Function} 返回值是一个函数，
 *      通过该函数可以获得指挥官唯一实例。
 */
var Commander = (function () {
    var commanderInstance;

    return {
        getInstance: function() {
            // 如果没有指挥官实例，就创建一个
            if(!commanderInstance) {
                commanderInstance = {};
                commanderInstance.createSpaceShip = function (options) {
                    Mediator.getInstance().createSpaceShip(options);
                    Logger.getInstance().log("在轨道" + options.orbitNo + "上创建飞船！");
                };
                commanderInstance.startSpaceShip = function (orbitNo) {
                    var command = {"id": orbitNo, "content": "start"};
                    Mediator.getInstance().broadCast(command);
                    Logger.getInstance().log("向轨道" + orbitNo + "发送飞船飞行命令！");
                };
                commanderInstance.stopSpaceShip = function (orbitNo) {
                    var command = {"id": orbitNo, "content": "stop"};
                    Mediator.getInstance().broadCast(command);
                    Logger.getInstance().log("向轨道" + orbitNo + "发送飞船停止命令！");
                };
                commanderInstance.destroySpaceShip = function (orbitNo) {
                    var command = {"id": orbitNo, "content": "destroy"};
                    Mediator.getInstance().broadCast(command);
                    Logger.getInstance().log("向轨道" + orbitNo + "发送飞船自爆命令！");
                };
            }
            // 否则直接返回该实例
            return commanderInstance;
        }
    };
})();

/**
 * 使用单例模式获得Mediator实例
 *
 * @private
 * @return {Function} 返回值是一个函数，
 *      通过该函数可以获得Mediator唯一实例。
 */
var Mediator = (function () {
    var mediatorInstance;
    var packetLossRate = 0.3;

    return {
        getInstance: function() {
            // 如果没有 Mediator 实例，就创建一个
            if(!mediatorInstance) {
                var _this = this;
                mediatorInstance = {};

                mediatorInstance.createSpaceShip = function (options) {
                    setTimeout(function () {
                        if(Math.random() <= packetLossRate) {
                            Logger.getInstance().warn("向轨道" + options.orbitNo + "发送的 create 指令丢包了！");
                            return;
                        }
                        if(checkOrbit(options.orbitNo)) {
                            Logger.getInstance().error("轨道" + options.orbitNo + "已经存在飞船！");
                            return;
                        }
                        var ship = spaceShipList.push(new SpaceShip(options));
                        var pageShip = document.createElement("div");
                        var orbit = document.getElementById("orbit"+options.orbitNo);
                        pageShip.id = "spaceship" + options.orbitNo;
                        pageShip.className = "space-ship orbit-ship" + options.orbitNo;
                        orbit.appendChild(pageShip);
                        Logger.getInstance().success("向轨道" + options.orbitNo + "发送的 create 指令成功！");
                    }, 1000);
                };
                
                mediatorInstance.broadCast = function (command) {
                    setTimeout(function() {
                        if(Math.random() <= packetLossRate) {
                            Logger.getInstance().warn("向轨道" + command.id + "发送的 " + command.content + " 指令丢包了！");
                            return;
                        }
                        if(!checkOrbit(command.id)) {
                            Logger.getInstance().error("轨道" + command.id + "不存在飞船！");
                            return;
                        }
                        spaceShipList.forEach(function (item, index, array) {
                            if(!spaceShipList[index].destroyStatus) {
                                spaceShipList[index].signalProcess(command);
                            }
                        })
                    }, 1000);
                }
            }
            // 否则直接返回该实例
            return mediatorInstance;
        }
    };
})();