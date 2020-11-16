//#region Require('./)
import { ManagerManager } from "Utils/importer/internals";
import {ErrorMapper} from "Utils/ErrorMapper"
//#endregion

//#region Functions()
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Run main handler
  // This will call the rest of the managers
  ManagerManager.runManagerManager();
});
//#endregion
