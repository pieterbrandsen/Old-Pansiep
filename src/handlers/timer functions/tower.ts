//#region Require('./)
//#endregion

//#region Functions()
const towerHandler = (room: Room & MyRoom) => {
    // Create a acces point to the flagMemory //
    const flagMemory: FlagMemory = Memory.flags[room.name];

  // Return if there are no towers yet to use
  if (room.towers.length === 0) return;

  if (flagMemory.enemies.creeps.length > 0) {
    // TODO JUST ATTACK THE FIRST CREEP IN LINE FOR THE TIME.
    // TODO UPDATE THIS

    const firstAttackTarget:Creep|null = Game.getObjectById(
      flagMemory.enemies.creeps[0].id,
    );

    // Return if target is null or target hit points is equal to target
    if (firstAttackTarget === null) {
      flagMemory.enemies.creeps.shift();
      return;
    }

    // Let each tower heal the target
    room.towers.forEach((tower: StructureTower) => {
      tower.attack(firstAttackTarget);
    });
  } else if (flagMemory.damagedCreeps.length > 0) {
    const firstHealTarget:Creep|null = Game.getObjectById(flagMemory.damagedCreeps[0]);

    // Return if target is null or target hit points is equal to target
    if (
      firstHealTarget === null ||
      firstHealTarget.hits === firstHealTarget.hitsMax
    ) {
      flagMemory.damagedCreeps.shift();
      return;
    }

    // Let each tower heal the target
    room.towers.forEach((tower: StructureTower) => {
      tower.heal(firstHealTarget);
    });
  } else if (flagMemory.commonMemory.repair.targets.length > 0) {
    // Else if there is something to repair
    const hitsTarget:number = flagMemory.commonMemory.repair.hitsTarget;
    const firstRepairTarget:AnyStructure|null = Game.getObjectById(flagMemory.commonMemory.repair.targets[0]);

    // Return if target is null or target hit points is higher or at max of target
    if (
      firstRepairTarget === null ||
      firstRepairTarget.hits > hitsTarget ||
      firstRepairTarget.hits === firstRepairTarget.hitsMax
    ) {
      flagMemory.commonMemory.repair.targets.shift();
      return;
    }

    // Let each tower repair the target
    room.towers.forEach((tower: StructureTower) => {
      tower.repair(firstRepairTarget);
    });
  }
};
//#endregion

//#region Export functions
export {towerHandler as TowerHandler};
//#endregion

