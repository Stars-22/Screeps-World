var queueTaskTemporary = require('queueTask.temporary'); //临时任务-任务队列模块
var queueTask_W34N48 = require('queueTask.W34N48'); //'W34N48'任务-任务队列模块
var queueTask_W33N49 = require('queueTask.W33N49'); //'W33N49'任务-任务队列模块
var systemArtificialTask = {
    /**  
    * 人工任务队列-系统模块
    */
    run: function() {

        //临时任务
        queueTaskTemporary.run();

        //W34N48任务
        queueTask_W34N48.run();

        //W33N49任务
        queueTask_W33N49.run();

	}
};

module.exports = systemArtificialTask;