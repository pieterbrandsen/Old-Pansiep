

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
