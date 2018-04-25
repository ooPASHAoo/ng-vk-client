export class VkTokenModel {

  constructor(public token: string,
              public expires: Date,
              public userId: string) {
  }

}
