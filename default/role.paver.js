var rolePaver = {
    paveToBase: function(creep, spawn, destination) {
        var sources = Game.spawns[spawn].room.find(FIND_SOURCES);
        let route = sources[0].pos.findPathTo(Game.spawns[spawn]);
        if (destination !== null) {
            route = sources[0].pos.findPathTo(Game.spawns[spawn].room[destination]);
        }
        for (let i = 0; i < route.length; i++) {
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }
    
            if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    var newTarget = Game.spawns[spawn].room.createConstructionSite(
                        route[i].x,
                        route[i].y,
                        STRUCTURE_ROAD
                    );
                    if (creep.build(newTarget) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(newTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    },
}
module.exports = rolePaver