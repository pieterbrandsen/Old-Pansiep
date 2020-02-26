





let test11 = Game.cpu.getUsed()
let test12 = Game.cpu.getUsed() - test11
Memory.test['cpu.avg.test1'] = test12;
Memory.test['cpu.avg10.test1'] = 0.9 * Memory.stats['cpu.avg10.test1'] + 0.1 * Memory.stats['cpu.avg.test1'];
Memory.test['cpu.avg100.test1'] = 0.99 * Memory.stats['cpu.avg100.test1'] + 0.01 * Memory.stats['cpu.avg.test1'];
Memory.test['cpu.avg1000.test1'] = 0.999 * Memory.stats['cpu.avg1000.test1'] + 0.001 * Memory.stats['cpu.avg.test1'];

let test21 = Game.cpu.getUsed()
let test22 = Game.cpu.getUsed() - test21
Memory.test['cpu.avg.test2'] = test22;
Memory.test['cpu.avg10.test2'] = 0.9 * Memory.stats['cpu.avg10.test2'] + 0.1 * Memory.stats['cpu.avg.test2'];
Memory.test['cpu.avg100.test2'] = 0.99 * Memory.stats['cpu.avg100.test2'] + 0.01 * Memory.stats['cpu.avg.test2'];
Memory.test['cpu.avg1000.test2'] = 0.999 * Memory.stats['cpu.avg1000.test2'] + 0.001 * Memory.stats['cpu.avg.test2'];