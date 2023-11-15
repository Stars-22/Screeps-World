var taskSpawn = require('task.spawn');
var taskHarvester = require('task.harvester');
var structureTower = require('structure.tower');
var taskUpgrader = require('task.upgrader');
var taskHomeScheduling = require('task.homeScheduling');
var systemArtificialTask = {
    /**  
    * 人工任务队列-系统模块
    */
    run: function() {

        //#1 自动孵化任务
        taskSpawn.run(1);

        //#2 升级控制器任务1
        var controllerUpgrader1 = Game.getObjectById('5bbcab1a9099fc012e632d32');
        var containerUpgrader1 = Game.getObjectById('6552ff27b241a6326feffbea');
        taskUpgrader.run(2, controllerUpgrader1, containerUpgrader1, {x:20,y:28});

        //炮台自动维修与攻击1
        var tower1 = Game.getObjectById('6551d38442580f159cfdfb5f');
        structureTower.run(tower1);

        //#3 采集能量任务1
        var source1 = Game.getObjectById('5bbcab1a9099fc012e632d30');
        taskHarvester.run(3, source1, {x:19,y:16}, {x:21,y:7}, {x:21,y:8}, {x:22,y:7});

        //#4 采集能量任务2
        var source2 = Game.getObjectById('5bbcab1a9099fc012e632d31');
        taskHarvester.run(4, source2, {x:26,y:24}, {x:43,y:23}, {x:42,y:23}, {x:43,y:22});

        //#5 资源调度任务1(矿点->中央存储)
        var inStore1 = [Game.getObjectById('65523df20f5f4145482c4661'),
                        Game.getObjectById('65522e7b3f35ad2a498ee406')]
        var outStore1 = [Game.getObjectById('6553e7654f26da05aea93b8d')];
        taskHomeScheduling.run(5, 1, inStore1, outStore1);

        //#6 资源调度任务(中央存储->各个结构)
        var inStore2 = [Game.getObjectById('6553e7654f26da05aea93b8d')]
        var outStore2 = Game.rooms['W34N48'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER)
            }
        });
        outStore2.push(Game.getObjectById('6552ff27b241a6326feffbea'));
        taskHomeScheduling.run(6, 1, inStore2, outStore2);
	}
};

module.exports = systemArtificialTask;