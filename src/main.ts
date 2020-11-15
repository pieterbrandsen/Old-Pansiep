//#region Require('./)
import { ErrorMapper, GlobalHandler } from "./Utils/importer";
import "./Prototypes/prototype.Room.structures";
import "./Prototypes/traveler";
//#endregion

//#region Functions()
export const loop = ErrorMapper.wrapLoop((): void => {
  // Run main handler
  // This will call the rest of the handlers
  GlobalHandler();
});
//#endregion
