export const Config: Config = {
  username: "PandaMaster",
  whitelist: ["Rivaryn", "Fiskmans"],
  tracking: true,
  // tracking: {
  //   rooms: true,
  //   intents: true,
  //   cpu: true,
  // },
  rooms: {
    minBucket: 1000,
    remoteMinBucket: 3000
  },
  cpuUsedByRoomByRole: {},
  creepModuleCpuCost: {},
  expenses: { spawnExpenses: {}, building: {}, repairing: {}, upgrading: {} },
  income: { ownedHarvesting: {}, remoteHarvesting: {} }
};
