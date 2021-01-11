// #region Require('./)
import {} from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class MemoryHelper {
  public static getOnlyObjectsFromIDs<T>(idArray: string[]): T[] {
    if (idArray.length === 0) {
      return [];
    }

    const objects: T[] = [];
    _.forEach(idArray, (id: string) => {
      const object: T | null = Game.getObjectById(id);
      if (object !== null) {
        objects.push(object);
      }
    });

    return objects;
  }
}
// #endregion
