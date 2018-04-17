import * as stg from '../../../../shared/supports/safe-type-getter';

export class Group {

  id: string;
  name: string;
  photoUrl100: string;

  static parseItem(groupData: object): Group|null {
    const group = new Group();

    group.id = stg.getIsHas(groupData, ['id'], stg.eType.Number);
    group.id = group.id ? group.id.toString() : null;
    group.name = stg.getIsHas(groupData, ['name'], stg.eType.String);
    group.photoUrl100 = stg.getIsHas(groupData, ['photo_100'], stg.eType.String);

    if (!group.id) {
      console.warn('Группа без id!', groupData);
    } else if (!group.name) {
      console.warn('Группа без name!', groupData);
    } else if (!group.photoUrl100) {
      console.warn('Группа без фото!', groupData);
    }

    return group;
  }

}
