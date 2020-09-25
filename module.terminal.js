// Check The Following Resources //
const resourceList = [
  RESOURCE_ENERGY, RESOURCE_HYDROGEN,
  RESOURCE_OXYGEN, RESOURCE_KEANIUM,
  RESOURCE_LEMERGIUM, RESOURCE_ZYNTHIUM,
  RESOURCE_CATALYST, RESOURCE_HYDROXIDE,
  RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE,
  RESOURCE_GHODIUM, RESOURCE_UTRIUM_HYDRIDE,
  RESOURCE_UTRIUM_OXIDE, RESOURCE_KEANIUM_HYDRIDE,
  RESOURCE_KEANIUM_OXIDE, RESOURCE_LEMERGIUM_HYDRIDE,
  RESOURCE_LEMERGIUM_OXIDE, RESOURCE_ZYNTHIUM_HYDRIDE,
  RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_GHODIUM_HYDRIDE,
  RESOURCE_GHODIUM_OXIDE, RESOURCE_UTRIUM_ACID,
  RESOURCE_UTRIUM_ALKALIDE, RESOURCE_KEANIUM_ACID,
  RESOURCE_KEANIUM_ALKALIDE, RESOURCE_LEMERGIUM_ACID,
  RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_ZYNTHIUM_ACID,
  RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_GHODIUM_ACID,
  RESOURCE_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID,
  RESOURCE_CATALYZED_UTRIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID,
  RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID,
  RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID,
  RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID,
  RESOURCE_CATALYZED_GHODIUM_ALKALIDE,
];

module.exports = {
  // Run Terminal //
  run: function() {
    // This Will Turn Off The Checks For The Rest Of The Resources After A Succesful Send //
    let turnTerminalOff = false;

    // Run Each 10 Ticks //
    if (Game.time % 10 == 0) {
      // If Memory Path Is Defined //
      if (Memory.terminal) {
        // If There Are More Then Zero Resources In Memory //
        if (Object.keys(Memory.terminal).length > 0) {
          // For Each Resource In Memory.Terminal //
          Object.keys(Memory.terminal).forEach((resource, i) => {
            // If No Succesful Sending Yet //
            if (turnTerminalOff == false) {
              // Get ResourceMemory //
              const resourceMemory = Memory.terminal[resource];

              // Define Sender And Reciever Room //
              const senderRoom = Game.rooms[resourceMemory.sender.roomName];
              const recieverRoom = Game.rooms[resourceMemory.reciever.roomName];

              // If SenderRoom Is Defined //
              if (senderRoom && senderRoom.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 5000) {
                // Define Default Amount To Send //
                let sendAmount = 2000;

                // If In The SenderRoom Is Twice The Amount Of The Resource Then In The Reciever Room //
                if (senderRoom.terminal.store.getUsedCapacity(resource) >= recieverRoom.terminal.store.getUsedCapacity(resource) * 2) {
                  // If Resource Is Energy, Increase SendAmount To 10K //
                  if (resource == "energy")
                  sendAmount = 10000;

                  // Check If Possible To Send Resource //
                  switch (senderRoom.terminal.send(resource, sendAmount, resourceMemory.reciever.roomName)) {
                    case OK:
                    turnTerminalOff = true;
                    break;
                    case ERR_NOT_ENOUGH_RESOURCES:
                    case ERR_TIRED:
                    break;
                    default:
                    break;
                  }
                }
              }
            }
          })
        }
      }
    }
  },

  // Update Memory //
  update: function(roomName) {
    // Run Each 100 Ticks //
    if (Game.time % 100 == 0) {
      // Define InputRoom //
      const room = Game.rooms[roomName];

      // If Room Is Setup With Terminal And Controller Level Is Atleast 6 //
      if (room.terminal && room.controller.level >= 6) {
        // Check If Memory.Terminal Is Defined //
        if (Memory.terminal) {
          // If There Are More Then Zero Resources In Memory //
          if (Object.keys(Memory.terminal).length > 0) {
            // For Each Resource In Memory.Terminal //
            Object.keys(Memory.terminal).forEach((resource, i) => {
              // Get Amount Of Resource In Terminal //
              const resourceStoredAmount = room.terminal.store.getUsedCapacity(resource);

              // Get MemoryPath ShortCut
              const resourceTerminalMemory = Memory.terminal[resource];

              // If Current Room Has More Resources Stored Then In Memory Room Or This Is The Room In Memory //
              // Update Memory Amounts //
              if (resourceTerminalMemory.sender.amount < resourceStoredAmount || resourceTerminalMemory.sender.roomName == roomName) {
                resourceTerminalMemory.sender.roomName = roomName;
                resourceTerminalMemory.sender.amount = resourceStoredAmount;
              }
              // If Current Room Has Less Resources Stored Then In Memory Room Or This Is The Room In Memory //
              // Update Memory Amounts //
              else if (resourceTerminalMemory.reciever.amount > resourceStoredAmount || resourceTerminalMemory.reciever.roomName == roomName) {
                resourceTerminalMemory.reciever.roomName = roomName;
                resourceTerminalMemory.reciever.amount = resourceStoredAmount;
              }
            });
          }
        }
      }
    }
  },

  // Setup Memory Using ResourceList //
  setup: function() {
    // Reset Terminal Memory //
    Memory.terminal = {};
    // Get MemoryPath ShortCut //
    const terminalMemory = Memory.terminal;

    // For Each Resource From ResourceList //
    resourceList.forEach((resource, i) => {
      // Define Resource In Terminal //
      Memory.terminal[resource] = {};
      // Get MemoryPath ShortCut //
      const resourceTerminalMemory = terminalMemory[resource];

      // Reset Sender Memory With Default Inputs //
      resourceTerminalMemory.sender = {};
      resourceTerminalMemory.sender.roomName = "None";
      resourceTerminalMemory.sender.amount = -1;

      // Reset Reciever Memory With Default Inputs //
      resourceTerminalMemory.reciever = {};
      resourceTerminalMemory.reciever.roomName = "None";
      resourceTerminalMemory.reciever.amount = 999999;
    });
  }
}
