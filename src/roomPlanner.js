const basePlanner = (room) => {

};


const roomPlanner = (room) => {
  room.sources.forEach((source) => {
    console.log(source);
  });
};

module.exports = {
  // Run base planner //
  base: (room) => {
    basePlanner(room);
  },

  // Room planner //
  // Structures like controller storage, source storage and roads
  room: (room) => {
    roomPlanner(room);
  },
};
