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

        /*

        let cpu = Game.cpu.getUsed()
        //console.log('Begin1: ' + cpu)



        cpu = Game.cpu.getUsed() - cpu
        //      console.log('End1: ' + cpu)
        let cpu1 = Game.cpu.getUsed()
        //console.log('Begin2: ' + cpu)






        cpu1 = Game.cpu.getUsed() - cpu1
        //        console.log('End2: ' + cpu1)

        let minCPU = Math.min(cpu,cpu1)
        //console.log(minCPU +'')
        if (minCPU === cpu) {
            console.log('Good! ' + cpu)
        } else {console.log('Bad! ' + cpu1)}


        Memory.stats['cpu.test.cpu'] = cpu;
        Memory.stats['cpu.test.cpu2'] = cpu1;

*/
        // if creep is supposed to complete a constructionSite
        if (creep.memory.working === true) {
            // find closest constructionSite
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (creep.build(target) === ERR_NOT_IN_RANGE) {
                // move towards the constructionSite
                creep.travelTo(target)
            }
        }


        // find closest source
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            let target = creep.room.terminal
            if (target !== undefined) {
                // try to transfer energy, if it is not in range
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#00FF00',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
        }
    }
};