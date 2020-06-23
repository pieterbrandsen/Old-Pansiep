module.exports = {
  run: function(creep) {
    if (Game.flags["shardUp"] && Game.shard.name == "shard3")
    creep.travelTo(Game.flags["shardUp"]);
  }
};
