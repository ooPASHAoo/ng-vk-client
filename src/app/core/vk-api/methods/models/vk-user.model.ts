import {Stp} from '../../../../shared/supports/safe-type-parser';
import * as moment from 'moment';

export class VkUser {

  id: string;
  firstName: string;
  lastName: string;

  photoUrl200: string|null;
  photoUrl100: string|null;

  birthDay: Date|null;
  country: string|null;
  city: string|null;

  countFriends: number|null;
  countMutualFriends: number|null;


  /** @throws StpError */
  static parseItem(userData: object): VkUser {
    const stp = new Stp(userData);
    const user = new VkUser();

    user.id = stp.get(['id'], Number, true).toString();
    user.firstName = stp.get(['first_name'], String, true);
    user.lastName = stp.get(['last_name'], String, true);
    //
    user.photoUrl200 = stp.get(['photo_200_orig'], String);
    user.photoUrl100 = stp.get(['photo_100'], String);
    user.country = stp.get(['country', 'title'], String);
    user.city = stp.get(['city', 'title'], String);
    user.countFriends = stp.get(['counters', 'friends'], Number);
    user.countMutualFriends = stp.get(['counters', 'mutual_friends'], Number);
    const birthMoment = moment(stp.get(['bdate'], String), ['DD.MM.YYYY', 'D.MM.YYYY', 'DD.M.YYYY', 'D.M.YYYY']);
    user.birthDay = birthMoment.isValid() ? birthMoment.toDate() : null;

    return user;
  }

}
