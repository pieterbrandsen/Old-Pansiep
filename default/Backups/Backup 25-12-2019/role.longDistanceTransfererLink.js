module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }


        /*let cpu = Game.cpu.getUsed()
        //console.log('Begin1: ' + cpu)
        creep.travelTo(Game.flags.Flag1, {reusePath: 50})
        cpu = Game.cpu.getUsed() - cpu
  //      console.log('End1: ' + cpu)
        let cpu1 = Game.cpu.getUsed()
        //console.log('Begin2: ' + cpu)
        const path = creep.pos.findPathTo(Game.flags.Flag1);
        if(path.length > 0) {
            creep.move(path[0].direction, {reusePath: 50});
        }
        cpu1 = Game.cpu.getUsed() - cpu1
//        console.log('End2: ' + cpu1)
        let minCPU = Math.min(cpu,cpu1)
        //console.log(minCPU +'')
        if (minCPU === cpu) {
            console.log('Good! ' + cpu)
        } else {console.log('Bad! ' + cpu1)}
*/
        // if creep is supposed to complete a constructionSite
        if (creep.memory.working === false) {
            if (creep.room.name === creep.memory.target) {
                let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER && (structure.store[RESOURCE_ENERGY]>250));
                    }
                });
                if (target !== undefined) {
                    if(creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                                fill: 'transparent',
                                stroke: '#880000',
                                lineStyle: 'dashed',
                                strokeWidth: 0.25,
                                opacity: 0.3}})
                    }
                }
                else if (creep.room.controller !== undefined) {
                let target = creep.room.controller;
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#880000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
                }
            }
            else {
                let target = creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.target));
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#880000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }

        else if (creep.memory.working === true) {
            if (creep.room.name === creep.memory.home) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.travelTo(creep.room.terminal, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#008000',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
            else {
                // find exit to home room
                let target = creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.home));
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#008000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }
    }
};