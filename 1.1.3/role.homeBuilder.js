var roleHomeBuilder = {
    /**  
    * 基地建设-爬爬模块
    * @param {Creep} creep - 运输爬爬
    * @param {[Structure]} store - 供货容器对象
    * @param {string} nameRoom - 需要建设的房间名
    * @param {{x:number, y:number}} waitPos - 等待位置(没有建设任务时将在此处待机)
    */
    run: function(creep, store, nameRoom, waitPos) {

        if(creep.store.getUsedCapacity() == 0){
            //如果背包为空 -> 前往供货容器并提取
            if(creep.withdraw(store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(store);
            }
        }
        else{
            //如果背包不为空 -> 前往建设
            var targets = Game.rooms[nameRoom].find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else{
                //如果没有建设任务 -> 前往等待位置等待
                creep.moveTo(waitPos.x, waitPos.y)
            }
        }
        
	}
};

module.exports = roleHomeBuilder;