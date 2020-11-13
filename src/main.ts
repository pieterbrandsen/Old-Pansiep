//#region Require('./)
import { ErrorMapper } from "utils/ErrorMapper";
import { MainHandler } from "./handlers/mainHandler";
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
//#endregion

//#region Game loop
export const loop = ErrorMapper.wrapLoop(() => {
  // Run main handler
  // This will call the rest of the handlers
  MainHandler();
});
//#endregion
