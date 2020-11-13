// import {PreCpuGetter, EndCpuGetter} from '../functions/cpuGetter';

//   // Set cpuUsed to zero
//   let cpuUsedStart = PreCpuGetter();

//   // Memory load cost
//   // eslint-disable-next-line no-unused-expressions
//   Memory;
//   let cpuUsedEnd = Game.cpu.getUsed();
//   // If Memory is defined, save the cpu used for this part. Otherwise it will return errors
//   if (Memory.stats && Memory.stats[shardName]) {
//     Memory.stats[shardName].cpu.headModules['loadMemory'] =
//       cpuUsedEnd - cpuUsedStart;
//     cpuUsedStart = cpuUsedEnd;
//   }