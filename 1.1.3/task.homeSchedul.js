var roleHomeCarrier = require('role.homeCarrier'); //载入爬爬模块-基地运输
var taskHomeSchedul = {
    /**
    * 基地能量调度-任务模块
    * @param {number} num - 任务编号
    * @param {number} count - 基地运输爬爬数量
    * @param {[Structure]} inStore - 存储容器列表(入)
    * @param {[Structure]} outStore - 存储容器列表(出)
    */
    run: function(num, count, inStore, outStore) {

        //错误检查
        for(var i=0; i<inStore.length; i++) {
            if(!inStore[i]){
                console.log('inStore已消失，任务#' + num + '执行错误');
                return;
            }
        }
        for(var i=0; i<outStore.length; i++) {
            if(!outStore[i]){
                console.log('outStore已消失，任务#' + num + '执行错误');
                return;
            }
        }

        var moduleCarrier = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];

        //自动孵化
        var numCarrier = 0; //当前已有基地运输爬爬的数量
        var existCarrier = [];
        for(var name in Game.creeps) {
            //寻找是否存在基地运输爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'carrier' + num){
                numCarrier ++; //遍历已存在的数量
                existCarrier.push(creep.name);
                //运输爬爬工作
                roleHomeCarrier.run(creep, inStore, outStore);
            }
        }
        for(var i=0; i<taskQueueSpawn.length; i++) {
            //遍历孵化队列中的数量
            var rule = taskQueueSpawn[i].memory.memory.rule;
            if(rule == 'carrier' + num){
                existCarrier.push(taskQueueSpawn[i].name);
                numCarrier ++;
            }
        }
        if(numCarrier < count){
            for(var i=1; i<=count; i++){
                //寻找空余运输爬爬编号
                var haveCarrierNum = false;
                for(var t=0; t<existCarrier.length; t++) {
                    if(existCarrier[t] == 'carrier' + num + '_' + i){
                        haveCarrierNum = true;
                        break;
                    }
                }
                if(!haveCarrierNum){
                    //如果不存在当前编号的运输爬爬 -> 添加一个当前编号的运输爬爬到孵化队列
                    taskQueueSpawn.push({
                        module:moduleCarrier,
                        name:'carrier' + num + '_' + i,
                        memory:{memory: {role: 'carrier' + num}}
                    });
                }
            }
        }
        
	}
};

module.exports = taskHomeSchedul;