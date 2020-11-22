// #region Require('./)
import { ManagerManager, ErrorMapper } from "Utils/importer/internals";
// #endregion

// #region Functions()
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Run main manager
  // This will call the all the managers
  ManagerManager.runManagerManager();
});
// #endregion
