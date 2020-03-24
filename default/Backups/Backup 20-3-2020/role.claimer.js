module.exports = {
    run: function(creep) {
        let target = "E47S1"
        if (creep.room.name !== target) {
            creep.travelTo(Game.flags[target])
            //creep.travelTo(Game.flags["claimer"])
            console.log(creep.room.name + " - Ticks to live: " + creep.ticksToLive)

        }
        else {
            if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller)
            }
        }
    }
};
