var taskSpawn = require('task.spawn');
var taskHarvest = require('task.harvest');
var structureTower = require('structure.tower');
var taskUpgrad = require('task.upgrad');
var taskHomeSchedul = require('task.homeSchedul');
var taskHomeBuilder = require('task.homeBuild');
var taskReserver = require('task.reserver');
var reportWrongExit = require('report.wrongExit');
var taskFixedHarvest = require('task.fixedHarvest');
var taskClaimer = require('task.claimer');
var taskAttackInvader = require('task.attackInvader');
var taskPicker = require('task.picker');
var systemArtificialTask = {
    /**  
    * 人工任务队列-系统模块
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

        //#2 资源调度任务1(中央存储 -> 各个结构)
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
        if(taskHomeSchedul.run(2, 1, inStore1, outStore1, moduleHomeCarrier, false) != 0)
            reportWrongExit.run('任务#2 资源调度任务(中央存储 -> 各个结构)');

        //#3 资源调度任务2(矿点 -> 孵化储备、中央存储)
        var inStore2 = [Game.getObjectById('65523df20f5f4145482c4661'),
                        Game.getObjectById('65522e7b3f35ad2a498ee406')]; //采集能量任务1 出货点, 采集能量任务2 出货点
        var outStore2 = Game.rooms['W34N48'].find(FIND_STRUCTURES, {
            filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION)}
        }); //结构: extension;
        outStore2.push(Game.getObjectById('6553e7654f26da05aea93b8d')); //中央存储结构Storage
        if(taskHomeSchedul.run(3, 2, inStore2, outStore2, moduleHomeCarrier, false) != 0)
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

        //炮台自动维修与攻击2
        var tower2 = Game.getObjectById('6558688845e09f6014b511c5'); //Tower2
        if(structureTower.run(tower2) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击2');

        //炮台自动维修与攻击3
        var tower3 = Game.getObjectById('655af43db6e07706ffc41d0d'); //Tower3
        if(structureTower.run(tower3) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击3');

        //#6 基地建设任务(中央存储 -> 'W34N48')
        var buildStore = Game.getObjectById('6553e7654f26da05aea93b8d'); //中央存储结构Storage
        if(taskHomeBuilder.run(6, 0, buildStore, 'W33N49', {x:24,y:26}) != 0)
            reportWrongExit.run('任务#6 基地建设任务(中央存储 -> \'W34N48\')');
        
        //升级控制器任务
        var controllerUpgrader1 = Game.getObjectById('5bbcab1a9099fc012e632d32'); //房间'W34N48'控制器
        var containerUpgrader1 = Game.getObjectById('6554b7380a66da3612f0ce55'); //升级任务供货点
        //#7 升级控制器任务1
        if(taskUpgrad.run(7, controllerUpgrader1, containerUpgrader1, {x:20,y:28}) != 0)
            reportWrongExit.run('任务#7 升级控制器任务1');
        // //#8 升级控制器任务2
        // if(taskUpgrad.run(8, controllerUpgrader1, containerUpgrader1, {x:19,y:29}) != 0)
        //     reportWrongExit.run('任务#8 升级控制器任务2');

        //#9 预定房间任务1'W33N48'(右侧房间)
        if(taskReserver.run(9, 1, 'W33N48') != 0)
            reportWrongExit.run('任务#9 预定房间任务1\'W33N48\'(右侧房间)');

        //#10 采集能量任务3(外矿'W33N48')
        var source3 = Game.getObjectById('5bbcab259099fc012e632f6d'); //能量源3
        if(taskFixedHarvest.run(10, source3, {x:3,y:30}, {x:2,y:30}, 400) != 0)
            reportWrongExit.run('#10 采集能量任务3');

        //#11 采集能量任务4(外矿'W33N48')
        var source4 = Game.getObjectById('5bbcab259099fc012e632f6c'); //能量源4
        if(taskFixedHarvest.run(11, source4, {x:33,y:21}, {x:33,y:22}, 400) != 0)
            reportWrongExit.run('#11 采集能量任务4');

        //#12 资源调度任务3(外矿'W33N48' -> 采集能量任务2(出货点))
        var inStore3 = [Game.getObjectById('655739435111434a7b4417d2'),
                        Game.getObjectById('6557417545e09f2211b4c614')]; //采集能量任务3 出货点, 采集能量任务4 出货点
        var outStore3 = [Game.getObjectById('65522e7b3f35ad2a498ee406')] //采集能量任务2(出货点)
        if(taskHomeSchedul.run(12, 2, inStore3, outStore3, moduleFarCarrier1, true) != 0)
            reportWrongExit.run('任务#12 资源调度任务(外矿\'W33N48\' -> 采集能量任务2(收获点)');

        //#13 占领'W33N49'控制器任务
        // if(taskClaimer.run(13, 'W33N49') != 0)
        //     taskClaimer.run('任务#13 占领房间任务1\'W33N49\'(右侧房间)');

        //#14 采集能量任务5'W33N49'
        var source5 = Game.getObjectById('5bbcab259099fc012e632f68'); //能量源5
        if(taskFixedHarvest.run(14, source5, {x:11,y:9}, {x:11,y:8}, 600) != 0)
            reportWrongExit.run('#14 采集能量任务5');

        //#15 采集能量任务6'W33N49'
        var source6 = Game.getObjectById('5bbcab259099fc012e632f69'); //能量源6
        if(taskFixedHarvest.run(15, source6, {x:26,y:13}, {x:25,y:13}, 600) != 0)
            reportWrongExit.run('#15 采集能量任务6');

        //#16 资源调度任务4
        var inStore4 = [Game.getObjectById('65598dd1556b3f437695e50d'),
                        Game.getObjectById('655999ccd4f876144515a2b3')]; //采集能量任务5 出货点, 采集能量任务6 出货点
        var outStore4 = [Game.getObjectById('6559f530a5680ded11625fe3'),
                        Game.getObjectById('655af43db6e07706ffc41d0d')]; //升级任务3供货点, Tower3
        if(taskHomeSchedul.run(16, 1, inStore4, outStore4, moduleHomeCarrier, true) != 0)
            reportWrongExit.run('任务#16 资源调度任务4');

        //#17 升级控制器任务3
        var controllerUpgrader2 = Game.getObjectById('5bbcab259099fc012e632f6a'); //房间'W33N49'控制器
        var containerUpgrader2 = Game.getObjectById('6559f530a5680ded11625fe3'); //升级任务供货点
        if(taskUpgrad.run(17, controllerUpgrader2, containerUpgrader2, {x:10,y:19}) != 0)
            reportWrongExit.run('任务#17 升级控制器任务3');
        //#18 升级控制器任务4
        if(taskUpgrad.run(18, controllerUpgrader2, containerUpgrader2, {x:10,y:20}) != 0)
            reportWrongExit.run('任务#18 升级控制器任务4');

        //#19 基地建设任务2('W33N49' -> 'W33N49')
        var buildStore2 = Game.getObjectById('6559f530a5680ded11625fe3'); //'W33N49'
        if(taskHomeBuilder.run(19, 0, buildStore2, 'W33N49', {x:18,y:16}) != 0)
            reportWrongExit.run('#19 基地建设任务2(\'W33N49\' -> \'W33N49\')');

        //#20 拾荒者'W33N49'
        if(taskPicker.run(20, 1, 'W33N49', containerUpgrader2, {x:18,y:16}) != 0)
            reportWrongExit.run('#20 拾荒者\'W33N49\'');

        //#21 防御外矿'W33N48'
        if(taskAttackInvader.run(21, 1, 'W33N48', {x:40,y:31}) != 0)
            reportWrongExit.run('#21 防御外矿\'W33N48\'');

        //#100 自动孵化任务1
        if(taskSpawn.run(100, 'Spawn') != 0)
            reportWrongExit.run('#100 自动孵化任务1');
        
	}
};

module.exports = systemArtificialTask;