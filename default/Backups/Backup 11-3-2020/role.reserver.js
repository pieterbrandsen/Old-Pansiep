module.exports = {
    run: function(creep) {
        let target = creep.memory.target
        if (Game.rooms[creep.memory.target] !== undefined) {
            if (creep.reserveController(Game.rooms[creep.memory.target].controller) === ERR_NOT_IN_RANGE) {
                creep.travelTo(Game.rooms[creep.memory.target].controller)
            }
        }
        else if (Game.rooms[creep.memory.target] == undefined) {
            if (Game.flags[target] !== undefined) {
                creep.travelTo((Game.flags[target]))
            }
            if (Game.flags[target] === undefined) {
                Game.notify("There is no flag in " + creep.memory.target + "!")
            }
        }
    }
};