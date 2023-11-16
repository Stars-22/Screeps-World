var roleHomeBuilder = require('role.homeBuilder'); //载入爬爬模块-基地基地建设
var taskHomeBuild = {
    /**
    * 基地建设调度-任务模块
    * @param {number} num - 任务编号
    * @param {number} count - 基地建设爬爬数量
    * @param {[Structure]} store - 供货容器对象
    * @param {string} nameRoom - 需要建设的房间名
    * @param {{x:number, y:number}} waitPos - 等待位置(没有建设任务时将在此处待机)
    */
    run: function(num, count, store, nameRoom, waitPos) {

        //错误检查
        if(!store){
            console.log('store已消失，任务#' + num + '执行错误');
            return;
        }
        if(!Game.rooms[nameRoom]){
            console.log('room已消失，任务#' + num + '执行错误');
            return;
        }

        //1100能量
        var moduleBuilder = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];

        //自动孵化
        var numBuilder = 0; //当前已有基地建设爬爬的数量
        var existBuilder = [];
        for(var name in Game.creeps) {
            //寻找是否存在基地建设爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'builder' + num){
                numBuilder ++; //遍历已存在的数量
                existBuilder.push(creep.name);
                //建设爬爬工作
                roleHomeBuilder.run(creep, store, nameRoom, waitPos);
            }
        }
        for(var i=0; i<taskQueueSpawn.length; i++) {
            //遍历孵化队列中的数量
            var rule = taskQueueSpawn[i].memory.memory.rule;
            if(rule == 'builder' + num){
                existBuilder.push(taskQueueSpawn[i].name);
                numBuilder ++;
            }
        }
        if(numBuilder < count){
            for(var i=1; i<=count; i++){
                //寻找空余建设爬爬编号
                var haveBuilderNum = false;
                for(var t=0; t<existBuilder.length; t++) {
                    if(existBuilder[t] == 'builder' + num + '_' + i){
                        haveBuilderNum = true;
                        break;
                    }
                }
                if(!haveBuilderNum){
                    //如果不存在当前编号的建设爬爬->添加一个当前编号的建设爬爬到孵化队列
                    taskQueueSpawn.push({
                        module:moduleBuilder,
                        name:'builder' + num + '_' + i,
                        memory:{memory: {role: 'builder' + num}}
                    });
                }
            }
        }
        
	}
};

module.exports = taskHomeBuild;