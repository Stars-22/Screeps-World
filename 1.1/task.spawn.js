var taskSpawn = {
    /**  
    * 队列孵化-任务模块
    * @param {number} num - 任务编号
    */
    run: function(num) {

        if(taskQueueSpawn.length != 0){
            //如果孵化任务队列不为空->尝试孵化
            if(Game.spawns['Spawn'].spawnCreep(
                taskQueueSpawn[0].module,
                taskQueueSpawn[0].name, 
                taskQueueSpawn[0].memory) == 0){
                //如果孵化成功->打印、出列
                console.log('Spawning new creep: ' + taskQueueSpawn[0].name);
                taskQueueSpawn.pop();
            }
        }
	}
};

module.exports = taskSpawn;