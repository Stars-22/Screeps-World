var taskReserver = {
    /**
    * 预定房间-任务模块
    * @param {number} num - 任务编号
    * @param {number} count - 预定爬爬数量
    * @param {string} nameRoom - 需要预定的房间名
    */
    run: function(num, count, nameRoom) {

        //错误检查
        var isScout = true; //是否已被侦察
        if(!Game.rooms[nameRoom]){
            isScout = false;
        }
        else if(!Game.rooms[nameRoom].controller){
            console.log('此房间或房间控制器已消失，任务#' + num + '执行错误');
            return 0;
        }

        //通过房间名获取控制器对象
        if(isScout){
            var controller = Game.rooms[nameRoom].controller;
        }

        //700能量
        var moduleReserver = [CLAIM,MOVE,MOVE];

        //自动孵化
        var numReserver = 0; //当前已有预定爬爬的数量
        var existReserver = [];
        for(var name in Game.creeps) {
            //寻找是否存在预定爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'reserver' + num){
                numReserver ++; //遍历已存在的数量
                existReserver.push(creep.name);
                //预定爬爬工作
                if(!isScout){
                    //如果此房间未被侦察
                    var path = Game.map.findRoute(creep.room, nameRoom);
                    if(path == ERR_NO_PATH){
                        console.log('找不到前往' + nameRoom + '房间的路径，任务#' + num + '执行错误');
                        return;
                    }
                    else{
                        creep.moveTo(creep.room.find(path[0].exit)[8]);
                    }
                }
                else if(creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller);
                }
            }
        }
        for(var i=0; i<taskQueueSpawn.length; i++) {
            //遍历孵化队列中的数量
            var role = taskQueueSpawn[i].memory.memory.role;
            if(role == 'reserver' + num){
                existReserver.push(taskQueueSpawn[i].name);
                numReserver ++;
            }
        }
        if(numReserver < count){
            for(var i=1; i<=count; i++){
                //寻找空余预定爬爬编号
                var haveReserverNum = false;
                for(var t=0; t<existReserver.length; t++) {
                    if(existReserver[t] == 'reserver' + num + '_' + i){
                        haveReserverNum = true;
                        break;
                    }
                }
                if(!haveReserverNum){
                    //如果不存在当前编号的预定爬爬 -> 添加一个当前编号的预定爬爬到孵化队列
                    taskQueueSpawn.push({
                        module:moduleReserver,
                        name:'reserver' + num + '_' + i,
                        memory:{memory: {role: 'reserver' + num}}
                    });
                }
            }
        }
        
        return 0;
	}
};

module.exports = taskReserver;