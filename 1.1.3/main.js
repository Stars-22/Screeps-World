var systemInitialize = require('system.initialize');
var systemArtificialTask = require('system.artificialTask');
global.taskQueueSpawn = []; //任务队列-孵化
module.exports.loop = function () {
    
    //初始化
    systemInitialize.run();

    //运行人工任务队列
    systemArtificialTask.run();

}