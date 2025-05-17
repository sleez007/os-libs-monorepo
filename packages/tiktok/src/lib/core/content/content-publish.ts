export class ContentPublishTicTok {
  constructor(private readonly token: string) {}

  async getCreatorInfo() {
    console.log(this.token);
    return true;
  }

  async postPhotos() {
    return true;
  }

  async sourceFileUpload() {
    return true;
  }

  async pullFromUrl() {
    return true;
  }
}
