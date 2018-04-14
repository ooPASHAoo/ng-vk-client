export class VkTokenModel {
  constructor(public token: string,
              public expires: Date,
              public userId: string) {
  }

  isExpired(): boolean {
    const now = new Date();
    const timeLeft = this.expires.getTime() - now.getTime();
    return timeLeft > 0;
  }
}
