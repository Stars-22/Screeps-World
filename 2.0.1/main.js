var systemInitialize = require('system.initialize'); //初始化 - 系统模块
var systemArtificialTask = require('system.artificialTask'); //人工任务队列-系统模块
//任务队列-孵化
global.taskQueueSpawn = {
    Spawn:[],
    Spawn1:[]
};
//孵化器名
global.spawnName = {
    W34N48: ['Spawn'],
    W33N49: ['Spawn1']
};
module.exports.loop = function () {
    
    //初始化
    systemInitialize.run();

    //运行人工任务队列
    systemArtificialTask.run();

}