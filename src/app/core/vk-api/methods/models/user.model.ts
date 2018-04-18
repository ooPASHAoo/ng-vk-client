import * as moment from 'moment';
import * as stg from '../../../../shared/supports/safe-type-getter';

export class User {

  id: string;
  firstName: string;
  lastName: string;

  photoUrl200: string|null;
  photoUrl100: string|null;

  nickname: string|null;
  birthDay: Date|null;
  country: string|null;
  city: string|null;

  countAlbums: number|null;
  countAudios: number|null;
  countFollowers: number|null;
  countFriends: number|null;
  countGifts: number|null;
  countGroups: number|null;
  countNotes: number|null;
  countPages: number|null;
  countPhotos: number|null;
  countSubscriptions: number|null;
  countPhotosWithUser: number|null;
  countVideosWithUser: number|null;
  countVideos: number|null;
  countMutualFriends: number|null;

  static parseResponse(userData: object): User|null {

    if (!stg.isObj(userData)) {
      return null;
    }

    const user = new User();
    user.id = stg.getIsHas(userData, ['id'], stg.eType.Number).toString();
    user.firstName = stg.getIsHas(userData, ['first_name'], stg.eType.String);
    user.lastName = stg.getIsHas(userData, ['last_name'], stg.eType.String);
    user.photoUrl200 = stg.getIsHas(userData, ['photo_200_orig'], stg.eType.String);
    user.photoUrl100 = stg.getIsHas(userData, ['photo_100'], stg.eType.String);
    if (!user.id || !stg.isStr(user.firstName) || !stg.isStr(user.lastName) || (!user.photoUrl200 && !user.photoUrl100)) {
      return null;
    }
    user.nickname = stg.getIsHas(userData, ['nickname'], stg.eType.String);
    user.country = stg.getIsHas(userData, ['country', 'title'], stg.eType.String);
    user.city = stg.getIsHas(userData, ['city', 'title'], stg.eType.String);
    const birthDateString = stg.getIsHas(userData, ['bdate'], stg.eType.String);
    if (birthDateString) {
      const birthMoment = moment(birthDateString, ['DD.MM.YYYY', 'D.MM.YYYY', 'DD.M.YYYY', 'D.M.YYYY']);
      if (birthMoment.isValid()) {
        user.birthDay = birthMoment.toDate();
      }
    }
    const counters = stg.getIsHas(userData, ['counters'], stg.eType.Object);
    user.countAlbums = stg.getIsHas(counters, ['albums'], stg.eType.Number);
    user.countAudios = stg.getIsHas(counters, ['audios'], stg.eType.Number);
    user.countFollowers = stg.getIsHas(counters, ['followers'], stg.eType.Number);
    user.countFriends = stg.getIsHas(counters, ['friends'], stg.eType.Number);
    user.countGifts = stg.getIsHas(counters, ['gifts'], stg.eType.Number);
    user.countGroups = stg.getIsHas(counters, ['groups'], stg.eType.Number);
    user.countNotes = stg.getIsHas(counters, ['notes'], stg.eType.Number);
    user.countPages = stg.getIsHas(counters, ['pages'], stg.eType.Number);
    user.countPhotos = stg.getIsHas(counters, ['photos'], stg.eType.Number);
    user.countSubscriptions = stg.getIsHas(counters, ['subscriptions'], stg.eType.Number);
    user.countPhotosWithUser = stg.getIsHas(counters, ['user_photos'], stg.eType.Number);
    user.countVideosWithUser = stg.getIsHas(counters, ['user_videos'], stg.eType.Number);
    user.countVideos = stg.getIsHas(counters, ['videos'], stg.eType.Number);
    user.countMutualFriends = stg.getIsHas(counters, ['mutual_friends'], stg.eType.Number);

    return user;
  }
}
