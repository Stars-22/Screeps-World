var reportWrongExit = require('report.wrongExit'); //异常退出 - 报告模块
var structureTower = require('structure.tower'); //自动维修与攻击 - 结构模块
var taskSpawn = require('task.spawn'); //队列孵化 - 任务模块
var taskHarvest = require('task.harvest'); //采集能量(自带运输) - 任务模块
var taskUpgrade = require('task.upgrade'); //升级控制器 - 任务模块
var taskHomeSchedul = require('task.homeSchedul'); //基地能量调度 - 任务模块
var taskHomeBuilder = require('task.homeBuild'); //基地建设 - 任务模块
var taskReserver = require('task.reserver'); //预定房间 - 任务模块
var taskFixedHarvest = require('task.fixedHarvest'); //定点采集能量(需要工作位置有建筑Container) - 任务模块
var taskClaimer = require('task.claimer'); //占领中立房间 - 任务模块
var taskAttackInvader = require('task.attackInvader'); //攻击侵略者 - 任务模块
var taskPicker = require('task.picker'); //捡起地上能量(拾荒者) - 任务模块
var taskMineralHarvester = require('task.mineralHarvester') //矿物采集 - 任务模块
var taskNewRoomBuild = require('task.newRoomBuild') //新基地建设 - 任务模块
var queueTask_W32N45 = {
    /**
    * 'W33N49'任务-任务队列模块
    */
    run: function() {

        var nameRoom = 'W32N45'; //房间名
        var extensions = Game.rooms[nameRoom].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_EXTENSION
        }); //结构: extension
        var spawns = Game.rooms[nameRoom].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_SPAWN
        }); //结构: spawn
        //var upgradStore = Game.getObjectById('6559f530a5680ded11625fe3'); //升级控制器供货点
        var source1 = Game.rooms[nameRoom].find(FIND_SOURCES)[0]; //能量源1
        var source2 = Game.rooms[nameRoom].find(FIND_SOURCES)[1]; //能量源2
        var controller = Game.rooms[nameRoom].controller; //房间控制器
        //var harvestStore1 = Game.getObjectById('65598dd1556b3f437695e50d'); //采集能量任务1 出货点
        //var harvestStore2 = Game.getObjectById('655999ccd4f876144515a2b3'); //采集能量任务2 出货点

        //200能量 - 单兵建设爬爬组件
        var moduleNewRoomBuilder = [WORK,CARRY,MOVE];

        //#3-0 新基地建设2
        if(taskNewRoomBuild.run('3-0', 2, nameRoom, moduleNewRoomBuilder, 1, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#3-0 新基地建设2');
        //#3-1 新基地建设1
        if(taskNewRoomBuild.run('3-1', 2, nameRoom, moduleNewRoomBuilder, 0, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#3-1 新基地建设1');
        
        //#2-100 自动孵化任务1
        if(taskSpawn.run('3-100', spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#3-100 自动孵化任务1');
    
	}
};

module.exports = queueTask_W32N45;