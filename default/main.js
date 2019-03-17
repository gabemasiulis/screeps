var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolePaver = require('role.paver');

module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log(`Memorial service for ${name} will be held at 4:00 in the Foyer`);
        }
    }
    maintainScreepCount('smallHarvester', 0, 'Spawn1');
    maintainScreepCount('smallPaver', 1, 'Spawn1');
    maintainScreepCount('smallUpgrader', 0, 'Spawn1');
    maintainScreepCount('smallBuilder', 0, 'Spawn1');
    maintainScreepCount('mediumUpgrader', 0, 'Spawn1');

    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
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
        if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role === 'paver') {
            // rolePaver.paveToBase(creep, 'Spawn1', null);
            rolePaver.paveToBase(creep, 'Spawn1', 'controller'); // paves from source[0] to controller
        }
    }
}

function maintainScreepCount(type, count, spawnPoint) {
    const creepDefinitions = {
        smallHarvester: {
            role: 'harvester',
            model: [
                WORK, CARRY, MOVE
            ]
        },
        smallUpgrader: {
            role: 'upgrader',
            model: [WORK, CARRY, MOVE]
        },
        smallBuilder: {
            role: 'builder',
            model: [WORK, CARRY, MOVE]
        },
        smallPaver: {
            role: 'paver',
            model: [WORK, WORK, CARRY, MOVE]
        },
        mediumUpgrader: {
            role: 'upgrader',
            model: [MOVE, MOVE, WORK, WORK, CARRY, CARRY]
        }
    };
    if (!creepDefinitions.hasOwnProperty(type)) {
        return;
    }
    var creepsOfType = _.filter(
        Game.creeps,
        (creep) => creep.memory.type === type
    );
    // console.log(`${creepsOfType.length} ${type} creeps active`)
    if (creepsOfType < count) {
        const creepName = `${type}-${Game.time}`;
        Game.spawns[spawnPoint].spawnCreep(
            creepDefinitions[type]['model'],
            creepName, {
                memory: {
                    role: creepDefinitions[type]['role'],
                    type: type
                }
            }
        );
    }
}
