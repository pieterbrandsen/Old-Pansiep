//#region Functions()
const linksHandler = (room: Room & MyRoom) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Return if there are no links yet to use
  if (room.links.length < 2) return;

  // Return if the link object is undefined
  if (flagMemory.commonMemory.links === undefined) return;

  // Define all possible sources
  const source0: StructureLink | null = Game.getObjectById(flagMemory.commonMemory.links["source0"]);
  const source1: StructureLink | null = Game.getObjectById(flagMemory.commonMemory.links["source1"]);
  const head: StructureLink | null = Game.getObjectById(flagMemory.commonMemory.links["head"]);
  const controller: StructureLink | null = Game.getObjectById(flagMemory.commonMemory.links["controller"]);

  // Define function to check if there is space in target link
  const sendEnergy = (fromLink: StructureLink, toLink: StructureLink) => {
    // If there is low space in target
    if (toLink.store.getFreeCapacity(RESOURCE_ENERGY) < 5) return;

    // If there is enough energy in the sending link to send to target
    if (fromLink.store.getUsedCapacity(RESOURCE_ENERGY) < 100) return;

    // Send energy from fromLink to targetLink
    fromLink.transferEnergy(toLink);
  };

  if (source0 !== null && head !== null) {
    // Send energy from source0 link to head link
    sendEnergy(source0, head);
  }
  if (source1 !== null && head !== null) {
    // Send energy from source1 link to head link
    sendEnergy(source1, head);
  }
  if (head !== null && controller !== null) {
    // Send energy from head link to controller link
    sendEnergy(head, controller);
  }
};
//#endregion

//#region Export functions
export { linksHandler as LinksHandler };
//#endregion
