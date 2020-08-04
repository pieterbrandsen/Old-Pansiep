module.exports = {
  run: function() {
    // Delete All Tracker Memory //
    delete Memory.stats;
    delete Memory.performanceTracker;
    delete Memory.cpuTracker;
  }
}
