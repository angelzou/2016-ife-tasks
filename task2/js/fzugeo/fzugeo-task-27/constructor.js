/**
 * @file 类的构造函数文件
 * @author Fzu_Geo
 */

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
 *飞船创建
 *
 * @private
 * @return 无返回值
 */
var SpaceShipCreator = function (options) {
    // 创建飞船
    var ship = new SpaceShip(options);
    SpaceShipListManager.addShip(ship);

    // 页面创建飞船
    var pageShip = document.createElement("div");
    var orbit = document.getElementById("orbit"+options.orbitNo);
    pageShip.id = "spaceship" + options.orbitNo;
    pageShip.className = "space-ship orbit-ship" + options.orbitNo;
    orbit.appendChild(pageShip);
}

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
                    Logger.getInstance().log("在轨道" + options.orbitNo + "上创建飞船！");
                    Bus.getInstance().createSpaceShip(options);
                };
                commanderInstance.startSpaceShip = function (orbitNo) {
                    var command = {"id": orbitNo, "content": "start"};
                    Logger.getInstance().log("向轨道" + orbitNo + "发送 start 命令！");
                    Bus.getInstance().broadCast(command);
                };
                commanderInstance.stopSpaceShip = function (orbitNo) {
                    var command = {"id": orbitNo, "content": "stop"};
                    Logger.getInstance().log("向轨道" + orbitNo + "发送 stop 命令！");
                    Bus.getInstance().broadCast(command);
                };
                commanderInstance.destroySpaceShip = function (orbitNo) {
                    var command = {"id": orbitNo, "content": "destroy"};
                    Logger.getInstance().log("向轨道" + orbitNo + "发送 destroy 命令！");
                    Bus.getInstance().broadCast(command);
                };
            }
            // 否则直接返回该实例
            return commanderInstance;
        }
    };
})();

/**
 * 使用单例模式获得Bus实例
 *
 * @private
 * @return {Function} 返回值是一个函数，
 *      通过该函数可以获得Bus唯一实例。
 */
var Bus = (function () {
    var busInstance;
    var packetLossRate = 0.1;

    return {
        getInstance: function() {
            // 如果没有 Bus 实例，就创建一个
            if(!busInstance) {
                var _this = this;
                busInstance = {};

                /**
                 * 通过 Bus 发布创建飞船指令，并且创建飞船。
                 *
                 * @private
                 * @return 无
                 */
                busInstance.createSpaceShip = function createSpaceShip(options) {
                    // 如果该轨道存在飞船，不能重新创建
                    if (checkOrbit(options.orbitNo)) {
                        setTimeout(function () {
                            Logger.getInstance().error("轨道" + options.orbitNo + "已经存在飞船！");
                            return;
                        }, 300);

                    } else {
                        var timer = setInterval(function () {
                            var status = true;
                            // 模拟丢包率
                            if(Math.random() <= packetLossRate) {
                                Logger.getInstance().warn("向轨道" + options.orbitNo + "发送的 create 指令丢包了！");
                                status = false;
                            }

                            if (status) {
                                // 创建飞船
                                SpaceShipCreator(options);
                                Logger.getInstance().success("向轨道" + options.orbitNo + "发送的 create 指令成功！");
                                clearInterval(timer);
                                SpaceShipListManager.showList();
                            }
                        }, 300);
                    }
                };

                /**
                 * 通过 Bus 发布其他指令。
                 *
                 * @private
                 * @return 无
                 */
                busInstance.broadCast = function (command) {
                    if (!checkOrbit(command.id)) {
                        setTimeout(function () {
                            Logger.getInstance().error("轨道" + command.id + "不存在飞船！");
                            return;
                        }, 300);
                    } else {
                        var timer = setInterval(function () {
                            var status = true;
                            if(Math.random() <= packetLossRate) {
                                Logger.getInstance().warn("向轨道" + command.id + "发送的 " + command.content + " 指令丢包了！");
                                status = false;
                            }

                            if (status) {
                                spaceShipList = SpaceShipListManager.getShipList();
                                spaceShipList.forEach(function (item, index, array) {
                                    if(!spaceShipList[index].destroyStatus) {
                                        spaceShipList[index].signalProcess(command);
                                    }
                                })
                                clearInterval(timer);
                            }

                        }, 300);
                    }
                }
            }
            // 否则直接返回该实例
            return busInstance;
        }
    };
})();


/**
 * 使用单例模式获得 SpaceShipListManager 实例，
 *      获得轨道上飞船的列表的全局管理。
 *
 * @private
 * @return {Function} 返回值是一个函数，
 *      addShip : 在轨道上创建一个飞船，
 *      getShipList : 获得轨道飞船列表
 */
var SpaceShipListManager = (function () {
    var spaceShipList = [];

    return {
        addShip : function (spaceShip) {
            spaceShipList.push(spaceShip);
        },
        getShipList : function () {
            return spaceShipList;
        },
        setShipList : function (spaceShipListCurrent) {
            spaceShipList = spaceShipListCurrent;
        },
        showList : function () {
            console.log(spaceShipList);
        }
    }
})();