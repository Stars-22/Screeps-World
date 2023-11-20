var roleAttackInvader = require('role.attackInvader'); //载入爬爬模块-攻击
var taskAttackInvader = {
    /**
    * 攻击侵略者-任务模块
    * @param {number} num - 任务编号
    * @param {number} count - 攻击侵略者爬爬数量
    * @param {string} nameRoom - 需要防御的房间名
    * @param {{x:number, y:number}} waitPos - 待命的位置坐标
    */
    run: function(num, count, nameRoom, waitPos) {
        
        //错误检查
        var isScout = true; //是否已被侦察
        if(!Game.rooms[nameRoom]){
            isScout = false;
        }
        else if(!Game.rooms[nameRoom].controller){
            console.log('此房间或房间控制器已消失，任务#' + num + '执行错误');
            return 0;
        }

        //800能量
        var moduleAttacker = [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,HEAL];

        //自动孵化
        var numAttacker = 0; //当前已有攻击爬爬的数量
        var existAttacker = [];
        for(var name in Game.creeps) {
            //寻找是否存在攻击爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'attacker' + num){
                numAttacker ++; //遍历已存在的数量
                existAttacker.push(creep.name);
                //攻击爬爬工作
                roleAttackInvader.run(creep, nameRoom, waitPos);
            }
        }
        for(var i=0; i<taskQueueSpawn.length; i++) {
            //遍历孵化队列中的数量
            var role = taskQueueSpawn[i].memory.memory.role;
            if(role == 'attacker' + num){
                existAttacker.push(taskQueueSpawn[i].name);
                numAttacker ++;
            }
        }
        if(numAttacker < count){
            for(var i=1; i<=count; i++){
                //寻找空余攻击爬爬编号
                var haveAttackerNum = false;
                for(var t=0; t<existAttacker.length; t++) {
                    if(existAttacker[t] == 'attacker' + num + '_' + i){
                        haveAttackerNum = true;
                        break;
                    }
                }
                if(!haveAttackerNum){
                    //如果不存在当前编号的攻击爬爬 -> 添加一个当前编号的攻击爬爬到孵化队列
                    taskQueueSpawn.push({
                        module:moduleAttacker,
                        name:'attacker' + num + '_' + i,
                        memory:{memory: {role: 'attacker' + num}}
                    });
                }
            }
        }
        
        return 0;
	}
};

module.exports = taskAttackInvader;