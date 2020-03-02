module.exports = {
    run: function(creep) {
        if (creep.ticksToLive < 50 && creep.carry.energy === 0) {
            creep.suicide()
        }
        else if (creep.ticksToLive < 50 && creep.carry.energy !== 0) {
            if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}
        }
        else if (creep.memory.working === true && _.sum(creep.carry) === 0 && creep.ticksToLive > 50) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity && creep.ticksToLive > 50) {
            creep.memory.working = true;
        }

        let room;
        function needsResource(resource, amount) {
            room = creep.room.name;
            let numberOfResourceTerminal = creep.room.terminal.store.getUsedCapacity([resource]);
            let numberOFResourceStorage = creep.room.storage.store.getUsedCapacity([resource]);
            return numberOfResourceTerminal < amount && numberOFResourceStorage > amount || numberOfResourceTerminal > amount && numberOfResourceTerminal > amount + 5000// && numberOFResourceStorage < amount
        }

        function needsResourceTerminal(resource, amount) {
            room = creep.room.name;
            let numberOfResourceTerminal = creep.room.terminal.store.getUsedCapacity([resource]);
            let numberOFResourceStorage = creep.room.storage.store.getUsedCapacity([resource]);
            return numberOfResourceTerminal < amount && numberOFResourceStorage > amount
        }
        function needsResourceStorage(resource, amount) {
            room = creep.room.name;
            let numberOfResourceTerminal = creep.room.terminal.store.getUsedCapacity([resource]);
            let numberOFResourceStorage = creep.room.storage.store.getUsedCapacity([resource])
            return numberOfResourceTerminal > amount// && numberOFResourceStorage < amount 
        }
     
        let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_LINK);
            }
        });

        let resource;
        let flag;
        let x;
        
        
        if (Game.flags["RESOURCE_HYDROGEN"] !== undefined && Game.flags["RESOURCE_HYDROGEN"].room === creep.room || needsResource(RESOURCE_HYDROGEN, 20000)) {
            resource = RESOURCE_HYDROGEN;
            flag = "RESOURCE_HYDROGEN";

            if (needsResource(resource, 20000) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 20000) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 20000) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_OXYGEN"] !== undefined && Game.flags["RESOURCE_OXYGEN"].room === creep.room || needsResource(RESOURCE_OXYGEN, 20000)) {
            resource = RESOURCE_OXYGEN;
            flag = "RESOURCE_OXYGEN";

            if (needsResource(resource, 20000) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 20000) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 20000) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_UTRIUM"] !== undefined && Game.flags["RESOURCE_UTRIUM"].room === creep.room || needsResource(RESOURCE_UTRIUM, 20000)) {
            resource = RESOURCE_UTRIUM;
            flag = "RESOURCE_UTRIUM";

            if (needsResource(resource, 20000) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 20000) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 20000) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_KEANIUM"] !== undefined && Game.flags["RESOURCE_KEANIUM"].room === creep.room || needsResource(RESOURCE_KEANIUM, 20000)) {
            resource = RESOURCE_KEANIUM;
            flag = "RESOURCE_KEANIUM";

            if (needsResource(resource, 20000) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 20000) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 20000) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_LEMERGIUM"] !== undefined && Game.flags["RESOURCE_LEMERGIUM"].room === creep.room || needsResource(RESOURCE_LEMERGIUM, 20000)) {
            resource = RESOURCE_LEMERGIUM;
            flag = "RESOURCE_LEMERGIUM";

            if (needsResource(resource, 20000) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 20000) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 20000) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_ZYNTHIUM"] !== undefined && Game.flags["RESOURCE_ZYNTHIUM"].room === creep.room || needsResource(RESOURCE_ZYNTHIUM, 20000)) {
            resource = RESOURCE_ZYNTHIUM;
            flag = "RESOURCE_ZYNTHIUM";

            if (needsResource(resource, 20000) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 20000) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 20000) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYST"] !== undefined && Game.flags["RESOURCE_CATALYST"].room === creep.room || needsResource(RESOURCE_CATALYST, 20000)) {
            resource = RESOURCE_CATALYST;
            flag = "RESOURCE_CATALYST";

            if (needsResource(resource, 20000) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 20000) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 20000) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,20000)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_HYDROXIDE"] !== undefined && Game.flags["RESOURCE_HYDROXIDE"].room === creep.room || needsResource(RESOURCE_HYDROXIDE, 4999)) {
            resource = RESOURCE_HYDROXIDE;
            flag = "RESOURCE_HYDROXIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_ZYNTHIUM_KEANITE"] !== undefined && Game.flags["RESOURCE_ZYNTHIUM_KEANITE"].room === creep.room || needsResource(RESOURCE_ZYNTHIUM_KEANITE, 4999)) {
            resource = RESOURCE_ZYNTHIUM_KEANITE;
            flag = "RESOURCE_ZYNTHIUM_KEANITE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_UTRIUM_LEMERGITE"] !== undefined && Game.flags["RESOURCE_UTRIUM_LEMERGITE"].room === creep.room || needsResource(RESOURCE_UTRIUM_LEMERGITE, 4999)) {
            resource = RESOURCE_UTRIUM_LEMERGITE;
            flag = "RESOURCE_UTRIUM_LEMERGITE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_GHODIUM"] !== undefined && Game.flags["RESOURCE_GHODIUM"].room === creep.room || needsResource(RESOURCE_GHODIUM, 4999)) {
            resource = RESOURCE_GHODIUM;
            flag = "RESOURCE_GHODIUM";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_UTRIUM_HYDRIDE"] !== undefined && Game.flags["RESOURCE_UTRIUM_HYDRIDE"].room === creep.room || needsResource(RESOURCE_UTRIUM_HYDRIDE, 4999)) {
            resource = RESOURCE_UTRIUM_HYDRIDE;
            flag = "RESOURCE_UTRIUM_HYDRIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_UTRIUM_OXIDE"] !== undefined && Game.flags["RESOURCE_UTRIUM_OXIDE"].room === creep.room || needsResource(RESOURCE_UTRIUM_OXIDE, 4999)) {
            resource = RESOURCE_UTRIUM_OXIDE;
            flag = "RESOURCE_UTRIUM_OXIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_KEANIUM_HYDRIDE"] !== undefined && Game.flags["RESOURCE_KEANIUM_HYDRIDE"].room === creep.room || needsResource(RESOURCE_KEANIUM_HYDRIDE, 4999)) {
            resource = RESOURCE_KEANIUM_HYDRIDE;
            flag = "RESOURCE_KEANIUM_HYDRIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_KEANIUM_OXIDE"] !== undefined && Game.flags["RESOURCE_KEANIUM_OXIDE"].room === creep.room || needsResource(RESOURCE_KEANIUM_OXIDE, 4999)) {
            resource = RESOURCE_KEANIUM_OXIDE;
            flag = "RESOURCE_KEANIUM_OXIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_LEMERGIUM_HYDRIDE"] !== undefined && Game.flags["RESOURCE_LEMERGIUM_HYDRIDE"].room === creep.room || needsResource(RESOURCE_LEMERGIUM_HYDRIDE, 4999)) {
            resource = RESOURCE_LEMERGIUM_HYDRIDE;
            flag = "RESOURCE_LEMERGIUM_HYDRIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_LEMERGIUM_OXIDE"] !== undefined && Game.flags["RESOURCE_LEMERGIUM_OXIDE"].room === creep.room || needsResource(RESOURCE_LEMERGIUM_OXIDE, 4999)) {
            resource = RESOURCE_LEMERGIUM_OXIDE;
            flag = "RESOURCE_LEMERGIUM_OXIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_ZYNTHIUM_HYDRIDE"] !== undefined && Game.flags["RESOURCE_ZYNTHIUM_HYDRIDE"].room === creep.room || needsResource(RESOURCE_ZYNTHIUM_HYDRIDE, 4999)) {
            resource = RESOURCE_ZYNTHIUM_HYDRIDE;
            flag = "RESOURCE_ZYNTHIUM_HYDRIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_ZYNTHIUM_OXIDE"] !== undefined && Game.flags["RESOURCE_ZYNTHIUM_OXIDE"].room === creep.room || needsResource(RESOURCE_ZYNTHIUM_OXIDE, 4999)) {
            resource = RESOURCE_ZYNTHIUM_OXIDE;
            flag = "RESOURCE_ZYNTHIUM_OXIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_GHODIUM_HYDRIDE"] !== undefined && Game.flags["RESOURCE_GHODIUM_HYDRIDE"].room === creep.room || needsResource(RESOURCE_GHODIUM_HYDRIDE, 4999)) {
            resource = RESOURCE_GHODIUM_HYDRIDE;
            flag = "RESOURCE_GHODIUM_HYDRIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_GHODIUM_OXIDE"] !== undefined && Game.flags["RESOURCE_GHODIUM_OXIDE"].room === creep.room || needsResource(RESOURCE_GHODIUM_OXIDE, 4999)) {
            resource = RESOURCE_GHODIUM_OXIDE;
            flag = "RESOURCE_GHODIUM_OXIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_UTRIUM_ACID"] !== undefined && Game.flags["RESOURCE_UTRIUM_ACID"].room === creep.room || needsResource(RESOURCE_UTRIUM_ACID, 4999)) {
            resource = RESOURCE_UTRIUM_ACID;
            flag = "RESOURCE_UTRIUM_ACID";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_UTRIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_UTRIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_UTRIUM_ALKALIDE, 4999)) {
            resource = RESOURCE_UTRIUM_ALKALIDE;
            flag = "RESOURCE_UTRIUM_ALKALIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_KEANIUM_ACID"] !== undefined && Game.flags["RESOURCE_KEANIUM_ACID"].room === creep.room || needsResource(RESOURCE_KEANIUM_ACID, 4999)) {
            resource = RESOURCE_KEANIUM_ACID;
            flag = "RESOURCE_KEANIUM_ACID";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_KEANIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_KEANIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_KEANIUM_ALKALIDE, 4999)) {
            resource = RESOURCE_KEANIUM_ALKALIDE;
            flag = "RESOURCE_KEANIUM_ALKALIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_LEMERGIUM_ACID"] !== undefined && Game.flags["RESOURCE_LEMERGIUM_ACID"].room === creep.room || needsResource(RESOURCE_LEMERGIUM_ACID, 4999)) {
            resource = RESOURCE_LEMERGIUM_ACID;
            flag = "RESOURCE_LEMERGIUM_ACID";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_LEMERGIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_LEMERGIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_LEMERGIUM_ALKALIDE, 4999)) {
            resource = RESOURCE_LEMERGIUM_ALKALIDE;
            flag = "RESOURCE_LEMERGIUM_ALKALIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_ZYNTHIUM_ACID"] !== undefined && Game.flags["RESOURCE_ZYNTHIUM_ACID"].room === creep.room || needsResource(RESOURCE_ZYNTHIUM_ACID, 4999)) {
            resource = RESOURCE_ZYNTHIUM_ACID;
            flag = "RESOURCE_ZYNTHIUM_ACID";
            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_ZYNTHIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_ZYNTHIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_ZYNTHIUM_ALKALIDE, 4999)) {
            resource = RESOURCE_ZYNTHIUM_ALKALIDE;
            flag = "RESOURCE_ZYNTHIUM_ALKALIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_GHODIUM_ACID"] !== undefined && Game.flags["RESOURCE_GHODIUM_ACID"].room === creep.room || needsResource(RESOURCE_GHODIUM_ACID, 4999)) {
            resource = RESOURCE_GHODIUM_ACID;
            flag = "RESOURCE_GHODIUM_ACID";
            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_GHODIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_GHODIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_GHODIUM_ALKALIDE, 4999)) {
            resource = RESOURCE_GHODIUM_ALKALIDE;
            flag = "RESOURCE_GHODIUM_ALKALIDE";
            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_UTRIUM_ACID"] !== undefined && Game.flags["RESOURCE_CATALYZED_UTRIUM_ACID"].room === creep.room || needsResource(RESOURCE_CATALYZED_UTRIUM_ACID, 4999)) {
            resource = RESOURCE_CATALYZED_UTRIUM_ACID;
            flag = "RESOURCE_CATALYZED_UTRIUM_ACID";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_UTRIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_CATALYZED_UTRIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_CATALYZED_UTRIUM_ALKALIDE, 4999)) {
            resource = RESOURCE_CATALYZED_UTRIUM_ALKALIDE;
            flag = "RESOURCE_CATALYZED_UTRIUM_ALKALIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_KEANIUM_ACID"] !== undefined && Game.flags["RESOURCE_CATALYZED_KEANIUM_ACID"].room === creep.room || needsResource(RESOURCE_CATALYZED_KEANIUM_ACID, 4999)) {
            resource = RESOURCE_CATALYZED_KEANIUM_ACID;
            flag = "RESOURCE_CATALYZED_KEANIUM_ACID";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_KEANIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_CATALYZED_KEANIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_CATALYZED_KEANIUM_ALKALIDE, 4999)) {
            resource = RESOURCE_CATALYZED_KEANIUM_ALKALIDE;
            flag = "RESOURCE_CATALYZED_KEANIUM_ALKALIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_LEMERGIUM_ACID"] !== undefined && Game.flags["RESOURCE_CATALYZED_LEMERGIUM_ACID"].room === creep.room || needsResource(RESOURCE_CATALYZED_LEMERGIUM_ACID, 4999)) {
            resource = RESOURCE_CATALYZED_LEMERGIUM_ACID;
            flag = "RESOURCE_CATALYZED_LEMERGIUM_ACID";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, 4999)) {
            resource = RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE;
            flag = "RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_ZYNTHIUM_ACID"] !== undefined && Game.flags["RESOURCE_CATALYZED_ZYNTHIUM_ACID"].room === creep.room || needsResource(RESOURCE_CATALYZED_ZYNTHIUM_ACID, 4999)) {
            resource = RESOURCE_CATALYZED_ZYNTHIUM_ACID;
            flag = "RESOURCE_CATALYZED_ZYNTHIUM_ACID";
            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, 4999)) {
            resource = RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE;
            flag = "RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE";
            
            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_GHODIUM_ACID"] !== undefined && Game.flags["RESOURCE_CATALYZED_GHODIUM_ACID"].room === creep.room || needsResource(RESOURCE_CATALYZED_GHODIUM_ACID, 4999)) {
            resource = RESOURCE_CATALYZED_GHODIUM_ACID;
            flag = "RESOURCE_CATALYZED_GHODIUM_ACID";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        else if (Game.flags["RESOURCE_CATALYZED_GHODIUM_ALKALIDE"] !== undefined && Game.flags["RESOURCE_CATALYZED_GHODIUM_ALKALIDE"].room === creep.room || needsResource(RESOURCE_CATALYZED_GHODIUM_ALKALIDE   , 4999)) {
            resource = RESOURCE_CATALYZED_GHODIUM_ALKALIDE;
            flag = "RESOURCE_CATALYZED_GHODIUM_ACID";

            if (needsResource(resource, 4999) && Game.flags[flag] === undefined) {creep.room.createFlag(10,10, [flag])}
            if (needsResource(resource, 4999) === false && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {Game.flags[flag].remove()}
            
            if (needsResource(resource, 4999) && Game.flags[flag] !== undefined && Game.flags[flag].room === creep.room) {
                if (needsResourceTerminal(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
                if (needsResourceStorage(resource,4999)) {
                    if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0) {
                        for (x of RESOURCES_ALL) {
                            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                            if (creep.transfer(creep.room.storage, x) === 0) {break}
                        }
                    }
                    else if (_.sum(creep.carry) == 0 && creep.carry[resource]  === 0) {
                        if (creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (_.sum(creep.carry) > 0 && creep.carry[resource]  > 0) {
                        if (creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.storage)
                        }
                    }
                }
            }
        }
        if (creep.memory.working === true) {
            if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 50000) {
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)
                }
            }
            else if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 50000 || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) == null) {
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }
        }
        else if (creep.memory.working === false) {            
            if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 50000 && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 1000 && target.energy < 500) {
                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)
                }
            }
            else if (target.energy > 500) {
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
        }
    }
};