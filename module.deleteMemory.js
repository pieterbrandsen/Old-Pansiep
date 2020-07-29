module.exports = {
  run: function() {
    // Delete Global Tracker Memory //
    delete Memory.stats;
    delete Memory.performanceTracker;
    delete Memory.cpuTracker;
  }
}
