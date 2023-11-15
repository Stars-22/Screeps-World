var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var architectureTower = require('architecture.tower');
var taskQueueSpawn = [];
module.exports.loop = function () {
    
    var tower = Game.getObjectById('6551d38442580f159cfdfb5f');
    architectureTower.run(tower);
    //console.log("CPU资源桶剩余: " + Game.cpu.bucket);
    for(var name in Game.rooms) {
        //console.log(Game.rooms['W34N48'].find(FIND_SOURCES));
        //console.log(Game.getObjectById('5bbcab1a9099fc012e632d30'));
        console.log('房间 "'+name+'" 拥有 '+Game.rooms[name].energyAvailable+'/'+Game.rooms[name].energyCapacityAvailable+' 能量');
    }
   //清除无效creep内存
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + upgraders.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);
    if(harvesters.length < 6) {
        var newName = 'Harvester' + Game.time % 100;
        if(Game.spawns['Spawn'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}}) == 0)
            console.log('Spawning new harvester: ' + newName);
    }
    else if(upgraders.length < 1) {
        var newName = 'Upgrader' + Game.time % 100;
        if(Game.spawns['Spawn'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}}) == 0)
            console.log('Spawning new upgrader: ' + newName);
    }
    else if(builders.length < 0) {
        var newName = 'Builder' + Game.time % 100;
        if(Game.spawns['Spawn'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}}) == 0)
            console.log('Spawning new builder: ' + newName);
    }
    if(Game.spawns['Spawn'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn'].spawning.name];
        Game.spawns['Spawn'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn'].pos.x + 1, 
            Game.spawns['Spawn'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}