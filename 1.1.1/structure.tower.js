var structureTower = {
    /**  
    * 自动维修与攻击-结构模块
    * @param {StructureTower} tower - 炮台对象
    */
    run: function(tower) {
        
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != 'constructedWall'
            });

            if(closestDamagedStructure) {
                console.log('正在维修' + closestDamagedStructure.structureType + closestDamagedStructure.pos);
                tower.repair(closestDamagedStructure);
            }
        
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                console.log('正在攻击' + closestHostile.name + closestHostile.pos);
                tower.attack(closestHostile);
            }
        }
	    
	}
}

module.exports = structureTower;