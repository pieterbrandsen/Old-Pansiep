module.exports = {
  run: function() {
    delete Memory.stats;
    delete Memory.performanceTracker;
    delete Memory.cpuTracker;
  }
}
