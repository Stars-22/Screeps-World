var taskUpgrader = {
    /**  
    * 升级控制器-任务模块
    * @param {number} num - 任务编号
    * @param {StructureController} controller - 控制器对象
    * @param {StructureContainer} container - 存储单元对象
    * @param {{x:number, y:number}} workPos - 工作位置
    */
    run: function(num, controller, container, workPos) {

        var moduleUpgrader = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var haveUpgrader = false;
        for(var name in Game.creeps) {
            //寻找升级爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'upgrader' + num){
                haveUpgrader = true;
                if(creep.pos.x != workPos.x || creep.pos.y != workPos.y){
                    creep.moveTo(workPos.x, workPos.y);
                }
                else{
                    if(creep.store.getUsedCapacity() == 0){
                        //能量不足->提取能量
                        creep.withdraw(container, RESOURCE_ENERGY);
                    }
                    else{
                        //能量充足->开始升级
                        creep.upgradeController(controller);
                    }
                }
            }
        }
        if(!haveUpgrader){
            //如果没有升级爬爬
            taskQueueSpawn.push({
                module:moduleUpgrader,
                name:'upgrader'+ num,
                memory:{memory: {role: 'upgrader'+ num}}
            });
        }
	}
};

module.exports = taskUpgrader;