import {Stp} from '../../../../shared/supports/safe-type-parser';

export class VkGroup {

  id: string;
  name: string;
  photoUrl100: string;
  photoUrl200: string|null;


  /** @throws StpError */
  static parseItem(groupData: object): VkGroup {
    const stp = new Stp(groupData);
    const group = new VkGroup();

    group.id = stp.get(['id'], Number, true).toString();
    group.name = stp.get(['name'], String, true);
    group.photoUrl100 = stp.get(['photo_100'], String, true);
    group.photoUrl200 = stp.get(['photo_200'], String);

    return group;
  }

}
