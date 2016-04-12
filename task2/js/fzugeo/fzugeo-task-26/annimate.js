/**
 * Created by Geo on 2016/4/11.
 */

/**
 * 飞船飞行动画实现
 *
 * @public
 * @return 无返回值。
 *
 */
(function () {
    spaceShipCruise = setInterval(function() {
        for(var i = 0, len = spaceShipList.length; i < len; i++) {
            if (spaceShipList[i]) {
                if (spaceShipList[i].destroyStatus) {
                    if (document.getElementById("spaceship" + spaceShipList[i].orbitNo)) {
                        document.getElementById("spaceship" + spaceShipList[i].orbitNo).parentNode.removeChild(document.getElementById("spaceship" + spaceShipList[i].orbitNo));
                        spaceShipList = spaceShipList.filter(function (ship) {
                            return !ship.destroyStatus;
                        });
                    }
                    continue;
                }
                //飞船飞行控制
                spaceShipList[i].cruise();
                //飞船Div
                var ship = document.getElementById("spaceship" + spaceShipList[i].orbitNo);
                if (ship) {
                    //修改飞船位置
                    ship.style.transform = "rotate(" + spaceShipList[i].position + "deg)";
                    ship.innerHTML = spaceShipList[i].suplusEnergy + "%";
                }
            }
        }
    }, 10);
})();

(function() {
    solarManager = setInterval(function() {
        for(var i = 0, len = spaceShipList.length; i < len; i++) {
            //已销毁的飞船不处理
            if(spaceShipList[i].destroyStatus) {
                continue;
            }
            //太阳能充能系统
            spaceShipList[i].recoverEnergy();
            //飞行耗能
            spaceShipList[i].consumeEnergy();
        }
    }, 1000);
})();