var roleHomeCarrier = {
    /**  
    * 基地运输-爬爬模块
    * @param {Creep} creep - 运输爬爬
    * @param {[Structure]} inStore - 存储容器列表(入)
    * @param {[Structure]} outStore - 存储容器列表(出)
    */
    run: function(creep, inStore, outStore) {

        if(creep.store.getUsedCapacity() == 0){
            //如果背包为空 -> 前往存储容器(入)(储量最大)
            var maxInStoreNum = 0;
            var maxInStore;
            for(var i=0; i<inStore.length; i++) {
                if(inStore[i].store[RESOURCE_ENERGY] > maxInStoreNum){
                    maxInStoreNum = inStore[i].store[RESOURCE_ENERGY];
                    maxInStore = inStore[i];
                }
            }
            //前往储量最大的存储容器(入)并提取
            if(maxInStoreNum > 0){
                if(creep.withdraw(maxInStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(maxInStore);
                }
            }
        }
        else{
            //如果背包不为空 -> 前往装填
            for(var i=0; i<outStore.length; i++){
                //按顺序寻找不满的存储容器(出)
                if(outStore[i].structureType == STRUCTURE_TOWER){
                    //如果当前存储容器(出)是Tower -> 则空余大于500时前往装填
                    if(outStore[i].store.getFreeCapacity(RESOURCE_ENERGY) >= 500){
                        if(creep.transfer(outStore[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(outStore[i]);
                        }
                        break;
                    }
                    continue;
                }
                if(outStore[i].store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                    if(creep.transfer(outStore[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(outStore[i]);
                    }
                    break;
                }
            }
        }
        
	}
};

module.exports = roleHomeCarrier;