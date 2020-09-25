// Require function Modules
const runMainSystem = require('function.mainSystem');

module.exports = {
  run: function() {
    // Get Variables Needed For Module //
    // None


    // Loop Through All Alive Creeps //
    for (let name in Game.creeps) {
      // Define Variables //
      const creep = Game.creeps[name];
      const role = creep.memory.role.split("-")[0];

      // This Function Runs The Creep So It Will Do Work //
      function runCreep() {
        // Get The CPU Before Run //
        const start = Game.cpu.getUsed();


        // If Memory Is Setup //
        if (Memory.flags[creep.memory.spawnRoom] && Memory.flags[creep.memory.spawnRoom].IsMemorySetup && role) {
          // Get The Role File Of The Creep By Getting The Right Name //
          const allRoles = require(`runRoles`);

          // If CreepRole File Is Defined, Run Creep //
          if (allRoles[role] !== undefined)
          allRoles[role](creep);
          else
          Game.notify(`Creep in room ${creep.room.name} is missing a role or has no run function. The role is ${role}.`);

          // Check If CPU Tracking Is Enabled //
          if (runMainSystem.run() && Memory.flags[creep.memory.targetRoom] && Memory.flags[creep.memory.targetRoom].IsMemorySetup) {
            // Get CPU Usage Of Role And Log It In Memory //
            Memory.flags[creep.memory.spawnRoom].trackers.cpuCreeps[role] += Game.cpu.getUsed() - start;
          }
        }
      }

      // Run Current Creep //
      runCreep();
    }
  }
}
