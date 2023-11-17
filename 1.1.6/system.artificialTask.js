var taskSpawn = require('task.spawn');
var taskHarvest = require('task.harvest');
var structureTower = require('structure.tower');
var taskUpgrad = require('task.upgrad');
var taskHomeSchedul = require('task.homeSchedul');
var roleHomeBuilder = require('task.homeBuild');
var taskReserver = require('task.reserver');
var systemArtificialTask = {
    /**  
    * 人工任务队列-系统模块
    */
    run: function() {

        //#2 资源调度任务(中央存储 -> 各个结构)
        var inStore2 = [Game.getObjectById('6553e7654f26da05aea93b8d')]; //中央存储结构Storage
        var outStore2 = Game.rooms['W34N48'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN)
            }
        }); //结构: extension, spawn;
        outStore2.push(Game.getObjectById('6551d38442580f159cfdfb5f')); //添加: 炮台自动维修与攻击1 Tower
        if(inStore2[0].store.getUsedCapacity(RESOURCE_ENERGY) > 10000){
            //如果中央存储储量大于10000 -> 启用升级
            outStore2.push(Game.getObjectById('6554b7380a66da3612f0ce55')); //末尾添加: 升级升级控制器任务1、2 供货点
        }
        taskHomeSchedul.run(2, 1, inStore2, outStore2);

        //#3 资源调度任务(矿点 -> 孵化储备、中央存储)
        var inStore1 = [Game.getObjectById('65523df20f5f4145482c4661'),
                        Game.getObjectById('65522e7b3f35ad2a498ee406')]; //采集能量任务1 出货点, 采集能量任务2 出货点
        var outStore1 = Game.rooms['W34N48'].find(FIND_STRUCTURES, {
            filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION)}
        }); //结构: extension;
        outStore1.push(Game.getObjectById('6553e7654f26da05aea93b8d')); //中央存储结构Storage
        taskHomeSchedul.run(3, 1, inStore1, outStore1);

        //#4 采集能量任务1
        var source1 = Game.getObjectById('5bbcab1a9099fc012e632d30'); //能量源1
        taskHarvest.run(4, source1, {x:19,y:16}, {x:21,y:7}, {x:21,y:8}, {x:22,y:7}, 200);

        //#5 采集能量任务2
        var source2 = Game.getObjectById('5bbcab1a9099fc012e632d31'); //能量源2
        taskHarvest.run(5, source2, {x:26,y:24}, {x:43,y:23}, {x:42,y:23}, {x:43,y:22}, 200);

        //炮台自动维修与攻击1
        var tower1 = Game.getObjectById('6551d38442580f159cfdfb5f'); //Tower1
        structureTower.run(tower1);

        //#6 基地建设任务(中央存储 -> 'W34N48')
        var buildStore = Game.getObjectById('6553e7654f26da05aea93b8d'); //中央存储结构Storage
        roleHomeBuilder.run(6, 1, buildStore, 'W34N48', {x:24,y:26});
        
        //升级控制器任务
        var controllerUpgrader1 = Game.getObjectById('5bbcab1a9099fc012e632d32'); //房间'W34N48'控制器
        var containerUpgrader1 = Game.getObjectById('6554b7380a66da3612f0ce55'); //升级任务供货点
        //#7 升级控制器任务1
        taskUpgrad.run(7, controllerUpgrader1, containerUpgrader1, {x:20,y:28});
        //#8 升级控制器任务2
        taskUpgrad.run(8, controllerUpgrader1, containerUpgrader1, {x:19,y:29});

        //预定房间'W33N48'(右侧房间)
        taskReserver.run(9, 1, 'W33N48');

        //#100 自动孵化任务
        taskSpawn.run(100, 'Spawn');
        
	}
};

module.exports = systemArtificialTask;