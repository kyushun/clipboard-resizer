import { Notification, nativeImage } from 'electron';

class Notificator {
  showSuccessMessage(origin: nativeImage, resized: nativeImage) {
    this.showMessage({
      title: 'Clipboard Image Resized!',
      body:
        this.formattedImageDetails(origin) +
        ' → ' +
        this.formattedImageDetails(resized)
    });
  }

  showErrorMessage() {
    this.showMessage({
      title: 'Faild!',
      body: 'Clipboard is set no images.'
    });
  }

  showMessage(option: Electron.NotificationConstructorOptions) {
    const notification = new Notification(option);
    notification.show();
  }

  private formattedImageDetails(image: nativeImage) {
    return (
      image.getSize().width +
      'x' +
      image.getSize().height +
      ' (' +
      this.formatBytes(image.toPNG().byteLength) +
      ')'
    );
  }

  private formatBytes(bytes: number, decimals: number = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  }
}

export default new Notificator();
