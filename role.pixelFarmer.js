module.exports = {
  run: function(creep) {
    if (Game.flags["shardUp"])
    creep.travelTo(Game.flags["shardUp"]);
  }
};
