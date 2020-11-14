//#region Require('./)
import { IsMemoryPathDefined } from "../../Utils/importer";
//#endregion

//#region Functions()
const getAllEnergyStructures = (room: Room & MyRoom): void => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  const isStructureTheControllerStructure = (id: string): boolean => {
    // Check if the memory path is completely defined
    if (IsMemoryPathDefined("flagMemory.commonMemory.controllerStorage.id")) {
      //@ts-ignore: Above is checked if the path is defined
      // If the known controller storage id is the id inputted
      if (flagMemory.commonMemory.controllerStorage.id == id) return true;
    }

    // If not yet returned, return false
    return false;
  };

  // Reset energyStructures array
  flagMemory.commonMemory.energyStructures = [];

  // Set energyUsable and energyCapacity to zero
  let energyUsable: number = 0;
  let energyCapacity: number = 0;

  // Loop through all containers
  room.containers.forEach((storageStructure: StructureContainer) => {
    if (!isStructureTheControllerStructure(storageStructure.id)) {
      // Add the total energy available and capacity
      energyUsable += storageStructure.store.getUsedCapacity(RESOURCE_ENERGY);
      energyCapacity += storageStructure.store.getCapacity(RESOURCE_ENERGY);

      // Push energy available and id to energyStructures array
      flagMemory.commonMemory.energyStructures.push({
        id: storageStructure.id,
        usable: storageStructure.store.getUsedCapacity(RESOURCE_ENERGY)
      });
      // Else if if this structure is the controller structure
    } else if (isStructureTheControllerStructure(storageStructure.id)) {
      //@ts-ignore: Above is checked if the path is defined
      // Set the amount of energy in the controller storage to its memoryTarget
      flagMemory.commonMemory.controllerStorage.usable = storageStructure.store.getUsedCapacity(RESOURCE_ENERGY);
    }
  });

  // Loop through all links
  room.links.forEach((storageStructure: StructureContainer) => {
    if (!isStructureTheControllerStructure(storageStructure.id)) {
      // Add the total energy available and capacity
      energyUsable += storageStructure.store.getUsedCapacity(RESOURCE_ENERGY);
      energyCapacity += storageStructure.store.getCapacity(RESOURCE_ENERGY);

      // Push energy available and id to energyStructures array
      flagMemory.commonMemory.energyStructures.push({
        id: storageStructure.id,
        usable: storageStructure.store.getUsedCapacity(RESOURCE_ENERGY)
      });
    } else if (isStructureTheControllerStructure(storageStructure.id)) {
      //@ts-ignore: Above is checked if the path is defined
      // Set the amount of energy in the controller storage to its memoryTarget
      flagMemory.commonMemory.controllerStorage.usable = storageStructure.store.getUsedCapacity(RESOURCE_ENERGY);
    }
  });

  // If the controller level is high enough for the storage and the storage is defined
  if (room.controller && room.controller.level >= 4 && room.storage) {
    // Add the total energy available and capacity
    energyUsable += room.storage.store.getUsedCapacity(RESOURCE_ENERGY);
    energyCapacity += room.storage.store.getCapacity(RESOURCE_ENERGY);

    // Push energy available and id to energyStructures array
    flagMemory.commonMemory.energyStructures.push({
      id: room.storage.id,
      usable: room.storage.store.getUsedCapacity(RESOURCE_ENERGY)
    });
  }

  // If the controller level is high enough for the terminal and the storage is terminal
  if (room.controller && room.controller.level >= 6 && room.terminal) {
    // Add the total energy available and capacity
    energyUsable += room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);
    energyCapacity += room.terminal.store.getCapacity(RESOURCE_ENERGY);

    // Push energy available and id to energyStructures array
    flagMemory.commonMemory.energyStructures.push({
      id: room.terminal.id,
      usable: room.terminal.store.getUsedCapacity(RESOURCE_ENERGY)
    });
  }
  flagMemory.commonMemory.energyStored.usable = energyUsable;
  flagMemory.commonMemory.energyStored.capacity = energyCapacity;
};
//#endregion

//#region Export functions
export { getAllEnergyStructures as GetAllEnergyStructures };
//#endregion
