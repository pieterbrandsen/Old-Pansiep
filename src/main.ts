//#region Require('./)
import { ErrorMapper, GlobalHandler } from "./utils/importer";
//#endregion

//#region Functions()
export const loop = ErrorMapper.wrapLoop((): void => {
  // Run main handler
  // This will call the rest of the handlers
  GlobalHandler();
});
//#endregion
