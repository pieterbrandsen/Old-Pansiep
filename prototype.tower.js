StructureTower.prototype.defend =
    function () {
        // find closes hostile creep
        let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target !== undefined) {
            this.attack(target);
    }
};
/*StructureTower.prototype.repair =
    function () {

        let walls = this.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_WALL
        });
        let ramparts = this.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_RAMPART
        });

        let target = undefined;
        let rampart = undefined;

        // loop with increasing percentages
        for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
            // find a wall with less than percentage hits
            for (let wall of walls) {
                if (wall.hits / wall.hitsMax < percentage && wall.hits < 5000000) {
                    target = wall;
                    break;
                }
            }

            // if there is one
            if (target !== undefined) {
                // break the loop
                break;
            }
            for (let rampart of ramparts) {
                if (rampart.hits / rampart.hitsMax < percentage && rampart.hits < 5000000) {
                    target = rampart;
                    break;
                }
            }

            // if there is one
            if (target !== undefined) {
                // break the loop
                break;
            }
        }

        // if we find a wall that has to be repaired
        if (target !== undefined) {
            this.repair(target)
    }
};*/