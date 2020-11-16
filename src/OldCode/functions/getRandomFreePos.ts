//#region Functions()
const getRandomFreePos = (startPos: { x: number; y: number; roomName: string }): RoomPosition => {
  // Get the terrain of the Room //
  const terrain: RoomTerrain = Game.map.getRoomTerrain(startPos.roomName);
  const distance: number = 0;
  let x: number;
  let y: number;

  // Loop until a random non-wall position is found
  do {
    x = startPos.x + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
    y = startPos.y + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
  } while ((x + y) % 2 !== (startPos.x + startPos.y) % 2 || terrain.get(x, y) === TERRAIN_MASK_WALL);
  return new RoomPosition(x, y, startPos.roomName);
};
//#endregion

//#region Export functions
export { getRandomFreePos as GetRandomFreePos };
//#endregion
