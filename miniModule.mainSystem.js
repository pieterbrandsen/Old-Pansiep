const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function() {
    // Get The Variables Needed For Module //
    const runMainSystem = mainSystem.run();

    function runMainSystem() {
      // If Memory.mainSystem Is Defined And Enabled //
      if (Memory.mainSystem)
      if (Memory.mainSystem.cpuTracker == true)
      return true;

      return false;
    }

    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runMainSystem();

      // Set the average CPU Usage in the memory //
      Memory.cpuTracker.mainSystem += Game.cpu.getUsed() - start;
    }
    else
    // Run the part without tracking //
    runMainSystem();
  }
}
