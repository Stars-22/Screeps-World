var taskUpgrad = {
    /**  
    * 升级控制器-任务模块
    * @param {number} num - 任务编号
    * @param {StructureController} controller - 控制器对象
    * @param {StructureContainer} container - 存储单元对象
    * @param {{x:number, y:number}} workPos - 工作位置
    */
    run: function(num, controller, container, workPos) {

        //错误检查
        if(!controller){
            console.log('controller已消失，任务#' + num + '执行错误');
            return;
        }
        if(!container){
            console.log('container已消失，任务#' + num + '执行错误');
            return;
        }

        var moduleUpgrader = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var haveUpgrader = false;
        var waitTick = 50;
        
        for(var name in Game.creeps) {
            //寻找升级爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'upgrader' + num){
                haveUpgrader = true;
                if(creep.ticksToLive == waitTick){
                    //如果升级爬爬快死亡了 -> 添加一个升级爬爬到孵化任务队列
                    taskQueueSpawn.push({
                        module:moduleUpgrader,
                        name:'upgrader'+ num,
                        memory:{memory: {role: 'upgrader'+ num}}
                    });
                }
                if(creep.pos.x != workPos.x || creep.pos.y != workPos.y){
                    creep.moveTo(workPos.x, workPos.y);
                }
                else{
                    if(creep.store.getUsedCapacity() == 0){
                        //能量不足 -> 提取能量
                        creep.withdraw(container, RESOURCE_ENERGY);
                    }
                    else{
                        //能量充足 -> 开始升级
                        creep.upgradeController(controller);
                    }
                }
            }
        }
        if(!haveUpgrader){
            //如果没有升级爬爬
            var haveQueueSpawn = false;
            for(var i=0; i<taskQueueSpawn.length; i++) {
                //是否已在队列中存在
                var rule = taskQueueSpawn[i].memory.memory.rule;
                if(rule == 'carrier' + num){
                    haveQueueSpawn = true;
                }
            }
            if(!haveQueueSpawn){
                taskQueueSpawn.push({
                    module:moduleUpgrader,
                    name:'upgrader'+ num,
                    memory:{memory: {role: 'upgrader'+ num}}
                });
            }
            
        }
        
	}
};

module.exports = taskUpgrad;