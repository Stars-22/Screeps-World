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
var queueTaskTemporary = {
    /**  
    * 临时任务-任务队列模块
    */
    run: function() {

        //#0-1 占领'W33N49'控制器任务
        // if(taskClaimer.run('0-1', 'W33N49', spawnName.W34N48[0]) != 0)
        //     taskClaimer.run('任务#0-1 占领房间任务1\'W33N49\'(右侧房间)');

	}
};

module.exports = queueTaskTemporary;