module.exports = {
    run: function(creep) {
        let target = "E47N2"
        if (creep.room.name !== target) {
            creep.travelTo(Game.flags[target])
            //creep.travelTo(Game.flags["claimer"])
            console.log(creep.room.name)

        }
        else {
            if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller)
            }
        }
    }
};