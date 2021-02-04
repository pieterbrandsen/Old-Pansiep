import { MemoryApiRoom } from './Memory.Room.Api';

export class MemoryApiAll {
  public static garbageCollection(): void {
    for (const name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
      }
    }

    if (Memory.stats?.rooms) {
      for (const roomName in Memory.stats.rooms) {
        if (!Game.rooms[roomName] && MemoryApiAll.executeEachTicks(10000)) {
          delete Memory.rooms[roomName];
          delete Memory.stats.rooms[roomName];
        }
      }
    }
  }

  private static cpuGetter(): number {
    return Game.cpu.getUsed();
  }

  public static preCpuGetter(): number {
    return this.cpuGetter();
  }

  public static endCpuGetter(): number {
    return this.cpuGetter();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static functionRunner(liveFunction: any, ...args: any[]): any {
    // Run the inputted function with the args inputted
    return liveFunction(...args); // eslint-disable-line
  }

  public static functionRunnerWithCpu(
    liveFunction: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    liveMemoryObject: { [key: string]: number } | undefined,
    memoryName: string,
    calcSymbol: '=' | '+=',
    ...args: any[]
  ): any {
    // If memory object is not defined, return
    if (liveMemoryObject === undefined) {
      return this.functionRunner(liveFunction, ...args); // eslint-disable-line @typescript-eslint/no-unsafe-return
    }

    // Get the cpu before executing the function
    const preCpu: number = this.preCpuGetter();

    // Run the inputted function with the args inputted
    const functionResult: any = this.functionRunner(liveFunction, ...args); // eslint-disable-line

    // Get the cpu after executing the function
    const endCpu: number = this.endCpuGetter();

    // Get the totalCpuUsed by deducting the preCpu from the endCpu
    const totalCpuUsed: number = endCpu - preCpu;

    // Set the totalCpuUsed to the memoryObject path inputted
    if (totalCpuUsed >= 0) {
      switch (calcSymbol) {
        case '=':
          liveMemoryObject[memoryName] = this.memoryAverager(liveMemoryObject[memoryName], totalCpuUsed);
          break;
        case '+=':
          liveMemoryObject[memoryName] += totalCpuUsed;
          break;
        default:
          break;
      }
    }

    return functionResult; // eslint-disable-line @typescript-eslint/no-unsafe-return
  }

  public static isMemoryPathDefined(memoryPath: string): { [key: string]: number } | undefined {
    // Get all the smaller pieces of the full memoryPath
    const memoryPathArray: string[] = memoryPath.split('.');

    // Set the new memoryPath object to use in the loop
    let testedMemoryObject: StringMap = Memory;

    if (memoryPathArray.length >= 0) {
      // Loop through all the smaller pieces of the memoryPath expect "Memory"
      for (let i = 1; i < memoryPathArray.length; i++) {
        // Get the current string of the element
        const currentMemoryPart: string = memoryPathArray[i];

        // If the testMemoryPath + new part is undefined, return undefined
        if (testedMemoryObject[currentMemoryPart] === undefined) {
          return undefined;
        }

        // If it is still a object, set it to the testedMemoryObject
        testedMemoryObject = testedMemoryObject[currentMemoryPart]; // eslint-disable-line
      }

      // If every piece of the path is defined, return the tested memoryObject
      return testedMemoryObject;
    }
    // Return true if there is only one piece of memoryPath return the tested memoryObject

    return testedMemoryObject;
  }

  public static memoryAverager(currentValue: number, newValue: number, averageTime = 1000): number {
    // Get the percentage the current value should stay
    const mainDivider = 1 / averageTime;
    // Get the percentage the new value should be calculated at
    const secondairDivider = 1 - mainDivider;

    // If everything is good, return the new value, else the newValue to overwrite the null/undefined
    if (currentValue !== null && currentValue !== undefined) {
      return secondairDivider * currentValue + mainDivider * newValue;
    }
    return newValue;
  }

  public static executeEachTicks(ticks: number): boolean {
    // If the current tick amount is dividable by ... ticks, return true
    if (Game.time % ticks === 0) {
      return true;
    }
    // Else return false

    return false;
  }

  public static initMainMemory(): void {
    if (!Memory.rooms) {
      Memory.rooms = {};
    }

    if (!Memory.rooms) {
      Memory.rooms = {};
    }

    if (!Memory.creeps) {
      Memory.creeps = {};
    }
    if (!Memory.stats) {
      Memory.stats = {
        ticksAlive: 0,
        gcl: { level: 0, progress: 0, progressTotal: 0 },
        rooms: {},
        common: { energyEachTickPerSource: 10 },
        cpu: {
          bucket: 0,
          limit: 0,
          used: 0,
          headModules: {},
          smallModules: {}
        }
      };
    }
  }
}
