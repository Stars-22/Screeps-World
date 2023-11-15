var taskSpawn = {
    /**  
    * 队列孵化-任务模块
    * @param {number} num - 任务编号
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, nameSpawn) {

        //错误检查
        if(!Game.spawns[nameSpawn]){
            console.log('spawn已消失，任务#' + num + '执行错误');
            return;
        }

        if(taskQueueSpawn.length != 0){
            //如果孵化任务队列不为空 -> 尝试孵化
            if(Game.spawns[nameSpawn].spawnCreep(
                taskQueueSpawn[0].module,
                taskQueueSpawn[0].name, 
                taskQueueSpawn[0].memory) == 0){
                //如果孵化成功 -> 打印、出列
                console.log('Spawning new creep: ' + taskQueueSpawn[0].name);
                taskQueueSpawn.pop();
            }
        }

	}
};

module.exports = taskSpawn;