StructureTower.prototype.defend =
    function () {
        // find closes hostile creep
        let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target !== undefined) {
            this.attack(target);
        }
    };