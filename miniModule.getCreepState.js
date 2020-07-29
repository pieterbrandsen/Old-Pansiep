module.exports = {
  run: function(roomName, creepCarryCapacity, creepCarryUsedCapacity, currentState) {
    // If Creep Working State Is Transfer But The Creep Is Empty //
    // Withdraw Energy Then //
    if (currentState == "transfer" && creepCarryUsedCapacity == 0) 
    return "withdraw";

    // If Creep Working State Is Withdraw But The Creep Is Full //
    // Transfer Energy Then //
    else if (currentState == "withdraw" && creepCarryUsedCapacity == creepCarryCapacity)
    return "transfer";
  }
}
