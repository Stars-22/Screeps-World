var taskSpawn = require('task.spawn');
var taskHarvest = require('task.harvest');
var structureTower = require('structure.tower');
var taskUpgrad = require('task.upgrad');
var taskHomeSchedul = require('task.homeSchedul');
var roleHomeBuilder = require('task.homeBuild');
var taskReserver = require('task.reserver');
var reportWrongExit = require('report.wrongExit');
var taskFixedHarvest = require('task.fixedHarvest');
var systemArtificialTask = {
    /**  
    * 人工任务队列-系统模块
    */
    run: function() {

        //组件 - 基地调度运输爬爬(1500能量)-容量1000
        var moduleHomeCarrier = [
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        //组件 - 外矿'W33N48'运输爬爬组件(1700能量)-容量1050
        var moduleFarCarrier1 = [
            WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE];

        //#2 资源调度任务1(中央存储 -> 各个结构)
        var inStore1 = [Game.getObjectById('6553e7654f26da05aea93b8d')]; //中央存储结构Storage
        var outStore1 = Game.rooms['W34N48'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN)
            }
        }); //结构: extension, spawn;
        outStore1.push(Game.getObjectById('6551d38442580f159cfdfb5f')); //添加: 炮台自动维修与攻击1 Tower
        if(inStore1[0].store.getUsedCapacity(RESOURCE_ENERGY) > 10000){
            //如果中央存储储量大于10000 -> 启用升级
            outStore1.push(Game.getObjectById('6554b7380a66da3612f0ce55')); //末尾添加: 升级升级控制器任务1、2 供货点
        }
        if(taskHomeSchedul.run(2, 1, inStore1, outStore1, moduleHomeCarrier, false) != 0)
            reportWrongExit.run('任务#2 资源调度任务(中央存储 -> 各个结构)');

        //#3 资源调度任务2(矿点 -> 孵化储备、中央存储)
        var inStore2 = [Game.getObjectById('65523df20f5f4145482c4661'),
                        Game.getObjectById('65522e7b3f35ad2a498ee406')]; //采集能量任务1 出货点, 采集能量任务2 出货点
        var outStore2 = Game.rooms['W34N48'].find(FIND_STRUCTURES, {
            filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION)}
        }); //结构: extension;
        outStore2.push(Game.getObjectById('6553e7654f26da05aea93b8d')); //中央存储结构Storage
        if(taskHomeSchedul.run(3, 1, inStore2, outStore2, moduleHomeCarrier, false) != 0)
            reportWrongExit.run('任务#3 资源调度任务(矿点 -> 孵化储备、中央存储)');

        //#4 采集能量任务1
        var source1 = Game.getObjectById('5bbcab1a9099fc012e632d30'); //能量源1
        if(taskHarvest.run(4, source1, {x:19,y:16}, {x:21,y:7}, {x:21,y:8}, {x:22,y:7}, 200) != 0)
            reportWrongExit.run('#4 采集能量任务1');

        //#5 采集能量任务2
        var source2 = Game.getObjectById('5bbcab1a9099fc012e632d31'); //能量源2
        if(taskHarvest.run(5, source2, {x:26,y:24}, {x:43,y:23}, {x:42,y:23}, {x:43,y:22}, 200) != 0)
            reportWrongExit.run('任务#5 采集能量任务2');

        //炮台自动维修与攻击1
        var tower1 = Game.getObjectById('6551d38442580f159cfdfb5f'); //Tower1
        if(structureTower.run(tower1) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击1');

        //#6 基地建设任务(中央存储 -> 'W34N48')
        var buildStore = Game.getObjectById('6553e7654f26da05aea93b8d'); //中央存储结构Storage
        if(roleHomeBuilder.run(6, 0, buildStore, 'W34N48', {x:24,y:26}) != 0)
            reportWrongExit.run('任务#6 基地建设任务(中央存储 -> \'W34N48\')');
        
        //升级控制器任务
        var controllerUpgrader1 = Game.getObjectById('5bbcab1a9099fc012e632d32'); //房间'W34N48'控制器
        var containerUpgrader1 = Game.getObjectById('6554b7380a66da3612f0ce55'); //升级任务供货点
        //#7 升级控制器任务1
        if(taskUpgrad.run(7, controllerUpgrader1, containerUpgrader1, {x:20,y:28}) != 0)
            reportWrongExit.run('任务#7 升级控制器任务1');
        //#8 升级控制器任务2
        if(taskUpgrad.run(8, controllerUpgrader1, containerUpgrader1, {x:19,y:29}) != 0)
            reportWrongExit.run('任务#8 升级控制器任务2');

        //#9 预定房间任务1'W33N48'(右侧房间)
        if(taskReserver.run(9, 2, 'W33N48') != 0)
            reportWrongExit.run('任务#9 预定房间任务1\'W33N48\'(右侧房间)');

        //#10 采集能量任务3(外矿'W33N48')
        var source3 = Game.getObjectById('5bbcab259099fc012e632f6d'); //能量源1
        if(taskFixedHarvest.run(10, source3, {x:3,y:30}, {x:2,y:30}, 400) != 0)
            reportWrongExit.run('#10 采集能量任务3');

        //#11 采集能量任务4(外矿'W33N48')
        var source4 = Game.getObjectById('5bbcab259099fc012e632f6c'); //能量源1
        if(taskFixedHarvest.run(11, source4, {x:33,y:21}, {x:33,y:22}, 400) != 0)
            reportWrongExit.run('#11 采集能量任务4');

        //#12 资源调度任务3(外矿'W33N48' -> 采集能量任务2(出货点))
        var inStore3 = [Game.getObjectById('655739435111434a7b4417d2'),
                        Game.getObjectById('6557417545e09f2211b4c614')]; //采集能量任务3 出货点, 采集能量任务4 出货点
        var outStore3 = [Game.getObjectById('65522e7b3f35ad2a498ee406')] //采集能量任务2(出货点)
        if(taskHomeSchedul.run(12, 2, inStore3, outStore3, moduleFarCarrier1, true) != 0)
            reportWrongExit.run('任务#12 资源调度任务(外矿\'W33N48\' -> 采集能量任务2(收获点)');

        //#100 自动孵化任务1
        if(taskSpawn.run(100, 'Spawn') != 0)
            reportWrongExit.run('#100 自动孵化任务1');
        
	}
};

module.exports = systemArtificialTask;