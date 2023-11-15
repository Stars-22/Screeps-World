var systemInitialize = {
    /**  
    * 初始化-系统模块
    */
    run: function() {

        //打印CPU资源桶剩余量
        //console.log("CPU资源桶剩余: " + Game.cpu.bucket);

        //打印房间能量数据
        for(var name in Game.rooms) {
            console.log('房间 "'+name+'" 拥有 '+Game.rooms[name].energyAvailable+'/'+Game.rooms[name].energyCapacityAvailable+' 能量');
        }

        //清除无效creep内存
        for(var name in Memory.creeps) {
           if(!Game.creeps[name]) {
               delete Memory.creeps[name];
               //console.log('Clearing non-existing creep memory:', name);
            }
        }

        
	}
};

module.exports = systemInitialize;