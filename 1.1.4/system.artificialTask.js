var taskSpawn = require('task.spawn');
var taskHarvest = require('task.harvest');
var structureTower = require('structure.tower');
var taskUpgrad = require('task.upgrad');
var taskHomeSchedul = require('task.homeSchedul');
var roleHomeBuilder = require('task.homeBuild');
var systemArtificialTask = {
    /**  
    * 人工任务队列-系统模块
    */
    run: function() {

        //#1 自动孵化任务
        taskSpawn.run(1, 'Spawn');

        //#2 升级控制器任务1
        //#3 升级控制器任务2
        var controllerUpgrader1 = Game.getObjectById('5bbcab1a9099fc012e632d32');
        var containerUpgrader1 = Game.getObjectById('6554b7380a66da3612f0ce55');
        taskUpgrad.run(2, controllerUpgrader1, containerUpgrader1, {x:20,y:28});
        taskUpgrad.run(3, controllerUpgrader1, containerUpgrader1, {x:19,y:29});

        //炮台自动维修与攻击1
        var tower1 = Game.getObjectById('6551d38442580f159cfdfb5f');
        structureTower.run(tower1);

        //#4 采集能量任务1
        var source1 = Game.getObjectById('5bbcab1a9099fc012e632d30');
        taskHarvest.run(4, source1, {x:19,y:16}, {x:21,y:7}, {x:21,y:8}, {x:22,y:7});

        //#5 采集能量任务2
        var source2 = Game.getObjectById('5bbcab1a9099fc012e632d31');
        taskHarvest.run(5, source2, {x:26,y:24}, {x:43,y:23}, {x:42,y:23}, {x:43,y:22});

        //#6 资源调度任务1(矿点 -> 中央存储)
        var inStore1 = [Game.getObjectById('65523df20f5f4145482c4661'),
                        Game.getObjectById('65522e7b3f35ad2a498ee406')]; //采集能量任务1 出货点, 采集能量任务2 出货点
        var outStore1 = [Game.getObjectById('6553e7654f26da05aea93b8d')]; //中央存储结构Storage
        taskHomeSchedul.run(6, 1, inStore1, outStore1);
        
        //#7 资源调度任务(中央存储 -> 各个结构)
        var inStore2 = [Game.getObjectById('6553e7654f26da05aea93b8d')]; //中央存储结构Storage
        var outStore2 = Game.rooms['W34N48'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER)
            }
        }); //结构: extension, spawn, tower;
        if(inStore2[0].store.getUsedCapacity(RESOURCE_ENERGY) > 10000){
            //如果中央存储储量大于10000 -> 启用升级
            outStore2.push(Game.getObjectById('6554b7380a66da3612f0ce55')); //末尾添加: 升级升级控制器任务1、2 供货点
        }
        taskHomeSchedul.run(7, 1, inStore2, outStore2);

        //#8 基地建设任务(中央存储 -> 'W34N48')
        var buildStore = Game.getObjectById('6553e7654f26da05aea93b8d');
        roleHomeBuilder.run(8, 0, buildStore, 'W34N48', {x:24,y:26})
        
	}
};

module.exports = systemArtificialTask;