var roleSourceHarvester = {
    /**  
    * 定点采集能量-爬爬模块
    * @param {Creep} creep - 采集爬爬
    * @param {Source} source - 能量源对象
    * @param {{x:number, y:number}} workPos - 工作位置
    */
    run: function(creep, source, workPos) {
        
        if(creep.pos.x != workPos.x || creep.pos.y != workPos.y) {
            //如果没到达采集点->移到采集点
            creep.moveTo(workPos.x, workPos.y);
        }
        else{
            ////到达指定位置->开始挖掘
            creep.harvest(source);
        }

	}
};

module.exports = roleSourceHarvester;