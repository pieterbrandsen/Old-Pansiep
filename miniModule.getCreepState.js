const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(roomName, creepCarryCapacity, creepCarryUsedCapacity, currentState) {
    // Get The Variables Needed For Module //
    const runMainSystem = mainSystem.run();

    function runGetCreepState() {
      // If Creep Working State Is Transfer But The Creep Is Empty //
      // Withdraw Energy Then //
      if (currentState == "transfer" && creepCarryUsedCapacity == 0)
      return "withdraw";

      // If Creep Working State Is Withdraw But The Creep Is Full //
      // Transfer Energy Then //
      else if (currentState == "withdraw" && creepCarryUsedCapacity == creepCarryCapacity)
      return "transfer";
    }

    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runGetCreepState();

      // Set the average CPU Usage in the memory //
      Memory.cpuTracker.getCreepState += Game.cpu.getUsed() - start;
    }
    else
    // Run the part without tracking //
    runGetCreepState();
  }
}
