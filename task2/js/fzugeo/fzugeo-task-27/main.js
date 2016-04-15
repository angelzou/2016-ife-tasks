/**
 * @file 页面控制逻辑定义及调用
 * @author Fzu_Geo
 */

var spaceShipList = [];

/**
 * 操作面板
 */
(function() {
    //按钮事件
    var buttonClick = function() {
        var orbitNo = this.parentNode.parentNode.dataset.orbitno
        var operation = this.className;
        var powerOptionIndex = this.parentNode.parentNode.childNodes[1].childNodes[3].selectedIndex;
        var powerOption = this.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[2 * powerOptionIndex+1].dataset;
        var energyOptionIndex = this.parentNode.parentNode.childNodes[1].childNodes[5].selectedIndex;
        var energyOption = this.parentNode.parentNode.childNodes[1].childNodes[5].childNodes[2 * energyOptionIndex+1].dataset;
        switch(operation) {
            case 'create':
                var options = {
                    "orbitNo" : orbitNo,
                    "powerStatus" : 0,
                    "energyStatus" : 1,
                    "speed" : Number(powerOption.speed),
                    "recoveryRate" : Number(energyOption.recovery),
                    "consumeRate" : Number(powerOption.consume),
                    "suplusEnergy" : 100,
                    "position" : 0,
                    "destroyStatus" : false
                };
                Commander.getInstance().createSpaceShip(options);
                break;
            case 'start':
                Commander.getInstance().startSpaceShip(orbitNo);
                break;
            case 'stop':
                Commander.getInstance().stopSpaceShip(orbitNo);
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
