var maintainScreepCount = {
    run: function(type, count, spawnPoint) {
        const creepDefinitions = {
            smallHarvester: {
                role: 'harvester',
                model: [
                    WORK, CARRY, MOVE
                ]
            }
        };
        // const creepTypes = Object.keys(creepDefinitions);
        if (!creepDefinitions.hasOwnProperty(type)) {
            return;
        }
        var creepsOfType = _.filter(
            Game.creeps,
            (creep) => creep.memory.type === creepDefinitions[type]
        );
        if (creepsOfType < count) {
            const creepName = `${creepDefinitions[type]}-${Game.time}`;
            Game.spawns[spawnPoint].spawnCreep(
                creepDefinitions[type][model],
                creepName, {
                    memory: {
                        role: creepDefinitions[type][role],
                        type: creepDefinitions[type]
                    }
                }
            );
        }
    }
}

module.exports = maintainScreepCount;