module.exports = {
  run: function(creep) {
    // Travel To A Shard Above Current Shard //
    if (Game.flags["shardUp"])
    creep.travelTo(Game.flags["shardUp"]);
  }
};
