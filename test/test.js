const variables = require('@screeps/common/lib/constants');

for (const variableName of Object.keys(variables)) {
  global[variableName] = variables[variableName];
}

global.Room = function (name, energyAvailable) {
  this.name = name;
  this.energyAvailable = energyAvailable;
  this.memory = {
    energyStats: {},
  };
};
global.RoomObject = function () {};
global.RoomPosition = function (x, y, roomName) {
  this.x = x;
  this.y = y;
  this.roomName = roomName;
};
global.Creep = function (role) {
  this.role = role;
};
global.Structure = function () {};
global._ = require('lodash');
global.Game = new function () {
  this.time = 1;
  this.cpu = {
    getUsed: () => {},
  };
};
global.Memory = new function() {};
