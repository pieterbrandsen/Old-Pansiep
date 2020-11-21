//#region Require('./)
import {} from "Utils/importer/internals";
//#endregion

//#region Class
export class BunkerLayoutConst {
  public static getBunkerLayout(midPos: RoomPos, roomName: string):  Array<Array<{ x: number; y: number; type: string; name?: string }>> {
    // * Create bunker array //
    const bunker = [
      [],
      [
        // Spawn
        {
          x: midPos.x - 1,
          y: midPos.y + 1,
          type: STRUCTURE_SPAWN,
          name: `${roomName}-0`
        }
      ],
      [
        // * Controller level 2 //
        // Extensions
        {
          x: midPos.x - 3,
          y: midPos.y + 1,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 3,
          y: midPos.y + 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 2,
          y: midPos.y + 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 2,
          y: midPos.y + 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 1,
          y: midPos.y + 3,
          type: STRUCTURE_EXTENSION
        }
      ],
      [
        // * Controller level 3 //
        // Towers
        {
          x: midPos.x - 0,
          y: midPos.y + 1,
          type: STRUCTURE_TOWER
        },
    
        // Extensions
        {
          x: midPos.x - 4,
          y: midPos.y + 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 4,
          y: midPos.y + 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 3,
          y: midPos.y + 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 3,
          y: midPos.y + 4,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 2,
          y: midPos.y + 4,
          type: STRUCTURE_EXTENSION
        }
      ],
      [
        // * Controller level 4 //
        // Storage
        {
          x: midPos.x - 1,
          y: midPos.y + 0,
          type: STRUCTURE_STORAGE
        },
    
        // Extensions
        {
          x: midPos.x - 2,
          y: midPos.y + 5,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 1,
          y: midPos.y + 4,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 1,
          y: midPos.y + 5,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 0,
          y: midPos.y + 4,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 0,
          y: midPos.y + 5,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 1,
          y: midPos.y + 5,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 1,
          y: midPos.y + 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 2,
          y: midPos.y + 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 2,
          y: midPos.y + 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 2,
          y: midPos.y + 4,
          type: STRUCTURE_EXTENSION
        }
      ],
      [
        // * Controller level 5 //
        // Tower
        {
          x: midPos.x - 0,
          y: midPos.y - 1,
          type: STRUCTURE_TOWER
        },
    
        // Extensions
        {
          x: midPos.x + 3,
          y: midPos.y + 1,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 3,
          y: midPos.y + 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 3,
          y: midPos.y + 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 3,
          y: midPos.y + 4,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 4,
          y: midPos.y + 0,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 4,
          y: midPos.y + 1,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 4,
          y: midPos.y + 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 4,
          y: midPos.y + 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 5,
          y: midPos.y + 1,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 5,
          y: midPos.y + 2,
          type: STRUCTURE_EXTENSION
        }
      ],
      [
        // * Controller level 6 //
        // Terminal
        {
          x: midPos.x + 1,
          y: midPos.y + 0,
          type: STRUCTURE_TERMINAL
        },
    
        // Link
        {
          x: midPos.x + 1,
          y: midPos.y + 1,
          type: STRUCTURE_LINK
        },
    
        // Extensions
        {
          x: midPos.x + 5,
          y: midPos.y - 1,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 3,
          y: midPos.y - 1,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 4,
          y: midPos.y - 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 3,
          y: midPos.y - 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 5,
          y: midPos.y + 1,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 5,
          y: midPos.y - 1,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 5,
          y: midPos.y - 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 4,
          y: midPos.y - 0,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 4,
          y: midPos.y - 1,
          type: STRUCTURE_EXTENSION
        },
    
        // Labs
        {
          x: midPos.x - 2,
          y: midPos.y - 2,
          type: STRUCTURE_LAB
        },
        {
          x: midPos.x - 3,
          y: midPos.y - 2,
          type: STRUCTURE_LAB
        },
        {
          x: midPos.x - 3,
          y: midPos.y - 3,
          type: STRUCTURE_LAB
        }
      ],
      [
        // * Controller level 7 //
        // Spawn
        {
          x: midPos.x + 5,
          y: midPos.y - 0,
          type: STRUCTURE_SPAWN,
          name: `${roomName}-1`
        },
    
        // Tower
        {
          x: midPos.x + 0,
          y: midPos.y - 2,
          type: STRUCTURE_TOWER
        },
    
        // Extension
        {
          x: midPos.x + 4,
          y: midPos.y - 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 3,
          y: midPos.y - 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 2,
          y: midPos.y - 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 1,
          y: midPos.y - 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 3,
          y: midPos.y - 4,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 2,
          y: midPos.y - 4,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 1,
          y: midPos.y - 4,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 0,
          y: midPos.y - 4,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 1,
          y: midPos.y - 5,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x - 0,
          y: midPos.y - 5,
          type: STRUCTURE_EXTENSION
        },
    
        // Labs
        {
          x: midPos.x - 3,
          y: midPos.y - 1,
          type: STRUCTURE_LAB
        },
        {
          x: midPos.x - 4,
          y: midPos.y - 2,
          type: STRUCTURE_LAB
        },
        {
          x: midPos.x - 4,
          y: midPos.y - 3,
          type: STRUCTURE_LAB
        },
    
        // Factory
        {
          x: midPos.x + 1,
          y: midPos.y - 1,
          type: STRUCTURE_FACTORY
        }
      ],
      [
        // * Controller level 8 //
        // Extension
        {
          x: midPos.x + 1,
          y: midPos.y - 5,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 2,
          y: midPos.y - 5,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 7,
          y: midPos.y + 1,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 7,
          y: midPos.y + 2,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 6,
          y: midPos.y + 3,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 5,
          y: midPos.y + 4,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 4,
          y: midPos.y + 5,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 3,
          y: midPos.y + 6,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 2,
          y: midPos.y + 7,
          type: STRUCTURE_EXTENSION
        },
        {
          x: midPos.x + 1,
          y: midPos.y + 7,
          type: STRUCTURE_EXTENSION
        },
    
        // Towers
        {
          x: midPos.x + 0,
          y: midPos.y + 2,
          type: STRUCTURE_TOWER
        },
        {
          x: midPos.x + 2,
          y: midPos.y - 0,
          type: STRUCTURE_TOWER
        },
        {
          x: midPos.x - 2,
          y: midPos.y - 0,
          type: STRUCTURE_TOWER
        },
    
        // Nuker
        {
          x: midPos.x - 1,
          y: midPos.y - 1,
          type: STRUCTURE_NUKER
        },
    
        // Observer
        {
          x: midPos.x + 0,
          y: midPos.y + 7,
          type: STRUCTURE_OBSERVER
        },
    
        // Labs
        {
          x: midPos.x - 2,
          y: midPos.y - 3,
          type: STRUCTURE_LAB
        },
        {
          x: midPos.x - 1,
          y: midPos.y - 3,
          type: STRUCTURE_LAB
        },
        {
          x: midPos.x - 3,
          y: midPos.y - 4,
          type: STRUCTURE_LAB
        },
        {
          x: midPos.x - 2,
          y: midPos.y - 4,
          type: STRUCTURE_LAB
        },
    
        // Spawn
        {
          x: midPos.x - 5,
          y: midPos.y - 0,
          type: STRUCTURE_SPAWN,
          name: `${roomName}-2`
        }
      ]
    ];

    // Return bunker
    return bunker
  }
}
//#endregion
