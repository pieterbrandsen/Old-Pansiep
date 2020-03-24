

Game.spawns["E43N3-2"].spawnCreep(
    [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
'TEST',
{
    memory: {
        role: 'scientist1',
        working: false,
        room: "E43N3"
    }
});

if (creep.name == "")


let test11 = Game.cpu.getUsed()
Memory.stats['cpu.avg.test1'] = Game.cpu.getUsed() - test11;
Memory.stats['cpu.avg10.test1'] = 0.9 * Memory.stats['cpu.avg10.test1'] + 0.1 * Memory.stats['cpu.avg.test1'];
Memory.stats['cpu.avg100.test1'] = 0.99 * Memory.stats['cpu.avg100.test1'] + 0.01 * Memory.stats['cpu.avg.test1'];
Memory.stats['cpu.avg1000.test1'] = 0.999 * Memory.stats['cpu.avg1000.test1'] + 0.001 * Memory.stats['cpu.avg.test1'];
console.log(Memory.stats['cpu.avg100.test1'] + ": Test 1")

let test21 = Game.cpu.getUsed()
Memory.stats['cpu.avg.test2'] = Game.cpu.getUsed() - test21;
Memory.stats['cpu.avg10.test2'] = 0.9 * Memory.stats['cpu.avg10.test2'] + 0.1 * Memory.stats['cpu.avg.test2'];
Memory.stats['cpu.avg100.test2'] = 0.99 * Memory.stats['cpu.avg100.test2'] + 0.01 * Memory.stats['cpu.avg.test2'];
Memory.stats['cpu.avg1000.test2'] = 0.999 * Memory.stats['cpu.avg1000.test2'] + 0.001 * Memory.stats['cpu.avg.test2'];
console.log(Memory.stats['cpu.avg100.test2'] + ": Test 2")
console.log()





let test11 = Game.cpu.getUsed()
creep.memory.avgtest1 = Game.cpu.getUsed() - test11;
creep.memory.avg10test1 = 0.9 * creep.memory.avg10test1 + 0.1 * creep.memory.avgtest1;
creep.memory.avg100test1 = 0.99 * creep.memory.avg100test1 + 0.01 * creep.memory.avgtest1;
creep.memory.avg1000test1 = 0.999 * creep.memory.avg1000test1 + 0.001 * creep.memory.avgtest1;
console.log(creep.memory.avg100test1 + ": Test 1")

let test21 = Game.cpu.getUsed()
creep.memory.avgtest2 = Game.cpu.getUsed() - test21;
creep.memory.avg10test2 = 0.9 * creep.memory.avg10test2 + 0.1 * creep.memory.avgtest2;
creep.memory.avg100test2 = 0.99 * creep.memory.avg100test2 + 0.01 * creep.memory.avgtest2;
creep.memory.avg1000test2 = 0.999 * creep.memory.avg1000test2 + 0.001 * creep.memory.avgtest2;
console.log(creep.memory.avg100test2 + ": Test 2")
console.log()

Game.spawns["E43N3-2"].spawnCreep(
    [CARRY,MOVE],
'TEST1',
{
    memory: {
        role: 'scientist1',
        working: false,
        room: "E43N3",
    }
});
