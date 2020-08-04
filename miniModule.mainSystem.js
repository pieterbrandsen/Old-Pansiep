module.exports = {
  run: function() {
    let output = false;
    // If Memory.mainSystem Is Defined And Enabled //
    if (Memory.mainSystem) {
      if (Memory.mainSystem.cpuTracker == true)
      output = true;
    }

    return output;
  }
}
