/**
 * @file 页面控制逻辑定义及调用
 * @author Fzu_Geo
 */


/**
 * 操作面板
 */
(function() {
    //按钮事件
    var buttonClick = function() {
        var orbitNo = this.parentNode.dataset.orbitno
        var operation = this.className;
        switch(operation) {
            case 'create':
                var options = {
                    "orbitNo" : orbitNo,
                    "powerStatus" : 0,
                    "energyStatus" : 1,
                    "speed" : 1,
                    "recoveryRate" : 2,
                    "consumeRate" : 5,
                    "suplusEnergy" : 100,
                    "position" : 0,
                    "destroyStatus" : false
                };
                Commander.getInstance().createSpaceShip(options);
                break;
            case 'start':
                Commander.getInstance().startSpaceShip(orbitNo);
                break;
            case 'destroy':
                Commander.getInstance().destroySpaceShip(orbitNo);
                break;
        }
    };
    //绑定按钮事件
    var buttons = document.getElementsByTagName("button");
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", buttonClick);
    }
})();
