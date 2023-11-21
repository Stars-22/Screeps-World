var reportWrongExit = require('report.wrongExit'); //异常退出 - 报告模块
var structureTower = require('structure.tower'); //自动维修与攻击 - 结构模块
var taskSpawn = require('task.spawn'); //队列孵化 - 任务模块
var taskHarvest = require('task.harvest'); //采集能量(自带运输) - 任务模块
var taskUpgrad = require('task.upgrad'); //升级控制器 - 任务模块
var taskHomeSchedul = require('task.homeSchedul'); //基地能量调度 - 任务模块
var taskHomeBuilder = require('task.homeBuild'); //基地建设 - 任务模块
var taskReserver = require('task.reserver'); //预定房间 - 任务模块
var taskFixedHarvest = require('task.fixedHarvest'); //定点采集能量(需要工作位置有建筑Container) - 任务模块
var taskClaimer = require('task.claimer'); //占领中立房间 - 任务模块
var taskAttackInvader = require('task.attackInvader'); //攻击侵略者 - 任务模块
var taskPicker = require('task.picker'); //捡起地上能量(拾荒者) - 任务模块
var queueTask_W34N48 = {
    /**  
    * 'W34N48'任务-任务队列模块
    */
    run: function() {

        //组件 - 基地调度运输爬爬(900能量)-容量600
        var moduleHomeCarrier = [
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        //组件 - 外矿'W33N48'运输爬爬组件(1700能量)-容量1050
        var moduleFarCarrier1 = [
            WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE];
        
        //炮台自动维修与攻击1
        var tower1 = Game.getObjectById('6551d38442580f159cfdfb5f'); //Tower1
        if(structureTower.run(tower1) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击1');

        //炮台自动维修与攻击2
        var tower2 = Game.getObjectById('6558688845e09f6014b511c5'); //Tower2
        if(structureTower.run(tower2) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击2');

        //#1-1 资源调度任务1(中央存储 -> 各个结构)
        var inStore1 = [Game.getObjectById('6553e7654f26da05aea93b8d')]; //中央存储结构Storage
        var outStore1 = Game.rooms['W34N48'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN)
            }
        }); //结构: extension, spawn;
        outStore1.push(Game.getObjectById('6551d38442580f159cfdfb5f')); //添加: 炮台自动维修与攻击1 Tower
        outStore1.push(Game.getObjectById('6558688845e09f6014b511c5')); //添加: 炮台自动维修与攻击2 Tower
        if(inStore1[0].store.getUsedCapacity(RESOURCE_ENERGY) > 100000){
            //如果中央存储储量大于100000 -> 启用升级
            outStore1.push(Game.getObjectById('6554b7380a66da3612f0ce55')); //末尾添加: 升级升级控制器任务1、2 供货点
        }
        if(taskHomeSchedul.run('1-1', 1, inStore1, outStore1, moduleHomeCarrier, false, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-1 资源调度任务1(中央存储 -> 各个结构)');

        //#1-2 资源调度任务2(矿点 -> 孵化储备、中央存储)
        var inStore2 = [Game.getObjectById('65523df20f5f4145482c4661'),
                        Game.getObjectById('65522e7b3f35ad2a498ee406')]; //采集能量任务1 出货点, 采集能量任务2 出货点
        var outStore2 = Game.rooms['W34N48'].find(FIND_STRUCTURES, {
            filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION)}
        }); //结构: extension;
        outStore2.push(Game.getObjectById('6553e7654f26da05aea93b8d')); //中央存储结构Storage
        if(taskHomeSchedul.run('1-2', 2, inStore2, outStore2, moduleHomeCarrier, false, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-2 资源调度任务2(矿点 -> 孵化储备、中央存储)');

        //#1-3 采集能量任务1
        var source1 = Game.getObjectById('5bbcab1a9099fc012e632d30'); //能量源1
        if(taskHarvest.run('1-3', source1, {x:19,y:16}, {x:21,y:7}, {x:21,y:8}, {x:22,y:7}, 200, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('#1-3 采集能量任务1');

        //#1-4 采集能量任务2
        var source2 = Game.getObjectById('5bbcab1a9099fc012e632d31'); //能量源2
        if(taskHarvest.run('1-4', source2, {x:26,y:24}, {x:43,y:23}, {x:42,y:23}, {x:43,y:22}, 200, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-4 采集能量任务2');
        
        //升级控制器任务
        var controllerUpgrader = Game.getObjectById('5bbcab1a9099fc012e632d32'); //房间'W34N48'控制器
        var containerUpgrader = Game.getObjectById('6554b7380a66da3612f0ce55'); //升级任务供货点
        //#1-5 升级控制器任务1
        if(taskUpgrad.run('1-5', controllerUpgrader, containerUpgrader, {x:20,y:28}, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-5 升级控制器任务1');
        //#1-6 升级控制器任务2
        if(taskUpgrad.run('1-6', controllerUpgrader, containerUpgrader, {x:19,y:29}, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-6 升级控制器任务2');
        //#1-7 升级控制器任务3
        if(taskUpgrad.run('1-7', controllerUpgrader, containerUpgrader, {x:19,y:30}, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-7 升级控制器任务3');
        
        //#1-8 基地建设任务1
        var buildStore = Game.getObjectById('6553e7654f26da05aea93b8d'); //中央存储结构Storage
        if(taskHomeBuilder.run('1-8', 0, buildStore, 'W34N48', {x:24,y:26}, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-8 基地建设任务1');

        //#1-9 预定房间任务1'W33N48'(右侧房间)
        if(taskReserver.run('1-9', 1, 'W33N48', spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-9 预定房间任务1\'W33N48\'(右侧房间)');

        //#1-10 采集能量任务3(外矿'W33N48')
        var source3 = Game.getObjectById('5bbcab259099fc012e632f6d'); //能量源3
        if(taskFixedHarvest.run('1-10', source3, {x:3,y:30}, {x:2,y:30}, 400, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('#1-10 采集能量任务3');

        //#1-11 采集能量任务4(外矿'W33N48')
        var source4 = Game.getObjectById('5bbcab259099fc012e632f6c'); //能量源4
        if(taskFixedHarvest.run('1-11', source4, {x:33,y:21}, {x:33,y:22}, 400, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('#1-11 采集能量任务4');

        //#1-12 资源调度任务3(外矿'W33N48' -> 采集能量任务2(出货点))
        var inStore3 = [Game.getObjectById('655739435111434a7b4417d2'),
                        Game.getObjectById('6557417545e09f2211b4c614')]; //采集能量任务3 出货点, 采集能量任务4 出货点
        var outStore3 = [Game.getObjectById('65522e7b3f35ad2a498ee406')] //采集能量任务2(出货点)
        if(taskHomeSchedul.run('1-12', 2, inStore3, outStore3, moduleFarCarrier1, true, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-12 资源调度任务3(外矿\'W33N48\' -> 采集能量任务2(收获点)');
        if(taskHomeSchedul.run(12, 0, inStore3, outStore3, moduleFarCarrier1, true, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('任务#1-12 资源调度任务3(外矿\'W33N48\' -> 采集能量任务2(收获点)');

        //#1-13 防御外矿1'W33N48'
        if(taskAttackInvader.run('1-13', 1, 'W33N48', {x:40,y:31}, spawnName.W34N48[0]) != 0)
            reportWrongExit.run('#1-13 防御外矿1\'W33N48\'');

        //#1-100 自动孵化任务1
        if(taskSpawn.run('1-100', 'Spawn') != 0)
            reportWrongExit.run('#1-100 自动孵化任务1');

	}
};

module.exports = queueTask_W34N48;