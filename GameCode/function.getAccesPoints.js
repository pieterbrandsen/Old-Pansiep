module.exports = {
  run: function(inputId, roomName) {
    const object = Game.getObjectById(inputId);
    const terrain = new Room.Terrain(roomName);
    const objectPos = object.pos;
    let objectPosX;
    let objectPosY;
    let count = 8;

    const possiblePositions = [{1,2},[1,3]]
    console.log(possiblePositions)

    for (let i = 0; i < possiblePositions.length; i++) {
    }


    objectPosX = object.pos.x-1;
    objectPosY = object.pos.y-1;
    if (terrain.get(objectPosX,objectPosY) == 1)
    count--;

    objectPosX = object.pos.x;
    objectPosY = object.pos.y-1;
    if (terrain.get(objectPosX,objectPosY) == 1)
    count--;

    objectPosX = object.pos.x+1;
    objectPosY = object.pos.y-1;
    if (terrain.get(objectPosX,objectPosY) == 1)
    count--;

    objectPosX = object.pos.x-1;
    objectPosY = object.pos.y;
    if (terrain.get(objectPosX,objectPosY) == 1)
    count--;

    objectPosX = object.pos.x+1;
    objectPosY = object.pos.y;
    if (terrain.get(objectPosX,objectPosY) == 1)
    count--;

    objectPosX = object.pos.x-1;
    objectPosY = object.pos.y+1;
    if (terrain.get(objectPosX,objectPosY) == 1)
    count--;

    objectPosX = object.pos.x;
    objectPosY = object.pos.y+1;
    if (terrain.get(objectPosX,objectPosY) == 1)
    count--;

    objectPosX = object.pos.x+1;
    objectPosY = object.pos.y+1;
    if (terrain.get(objectPosX,objectPosY) == 1)
    count--;

    return count;
  }
}
