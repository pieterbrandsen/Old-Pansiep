if (flagMemory.links) {
  if (flagMemory.links.linkTo1 && flagMemory.links.linkTo2) {
    let linkTo1 = Game.getObjectById(flagMemory.links.linkTo1);
    let linkTo2 = Game.getObjectById(flagMemory.links.linkTo2);
    linkTo1.transferEnergy(linkTo2)
  }

  if (flagMemory.links.linkFrom1 && flagMemory.links.linkTo1) {
    let linkFrom1 = Game.getObjectById(flagMemory.links.linkFrom1);
    let linkTo1 = Game.getObjectById(flagMemory.links.linkTo1);
    linkFrom1.transferEnergy(linkTo1)
  }

  if (flagMemory.links.linkFrom2 && flagMemory.links.linkTo1) {
    let linkFrom2 = Game.getObjectById(flagMemory.links.linkFrom2);
    let linkTo1 = Game.getObjectById(flagMemory.links.linkTo1);
    linkFrom2.transferEnergy(linkTo1)
  }
}




function findLinkInRange(object,range) {
  if (object !== null) {
    const link = object.pos.findClosestByRange(room.links, range)

    if (link !== null)
    return link;
  }
}


if (room.controller.level >= 6 && (!flagMemory.links.linkTo1 || !flagMemory.links.linkTo2)) {
  if (findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3) !== null && !flagMemory.links.linkTo1) {
    flagMemory.links.linkTo1 = findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3).id
  }
  if (findLinkInRange(room.controller,3) !== null && !flagMemory.links.linkTo2) {
    flagMemory.links.linkTo2 = findLinkInRange(room.controller,3).id
  }
}

if (flagMemory.sources[0] && room.controller.level >= 7 && (!flagMemory.links.linkTo1 || !flagMemory.links.linkFrom1)) {
  let source0 = Game.getObjectById(flagMemory.sources[0].id);
  if (findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3) !== null && !flagMemory.links.linkTo1) {
    flagMemory.links.linkTo1 = findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3).id
  }
  if (findLinkInRange(room.controller,3) !== null && !flagMemory.links.linkFrom1 && source0 !== undefined) {
    flagMemory.links.linkFrom1 = findLinkInRange(source0,3).id
  }
}

if (flagMemory.sources[1] && room.controller.level >= 7 && (!flagMemory.links.linkTo1 || !flagMemory.links.linkFrom2)) {
  let source1 = Game.getObjectById(flagMemory.sources[1].id);
  if (findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3) !== null && !flagMemory.links.linkTo1) {
    flagMemory.links.linkTo1 = findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3).id
  }

  if (findLinkInRange(room.controller,3) !== null && !flagMemory.links.linkFrom2 && source1 !== null) {
    flagMemory.links.linkFrom2 = findLinkInRange(source1,3).id
  }
}
