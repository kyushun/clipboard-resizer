import { clipboard } from 'electron';
import Notificator from './notificator';
import { FitTypes } from './types';

export default class Resizer {
  constructor(public input?: Electron.nativeImage) {
    if (!input) {
      this.input = this.readImageFromClipboard();
    }
  }

  static init(input?: Electron.nativeImage) {
    return new this(input);
  }

  resizeByPercentage(percentage: number) {
    if (this.input.isEmpty()) {
      Notificator.showErrorMessage();
      return;
    }

    const { width, height } = this.input.getSize();
    this.resize({
      width: Math.round((width * percentage) / 100),
      height: Math.round((height * percentage) / 100)
    });
  }

  resizeByDimentions(width: number, height: number, type: FitTypes) {
    if (this.input.isEmpty()) {
      Notificator.showErrorMessage();
      return;
    }

    if (type === FitTypes.Width) {
      this.resize({ width });
    } else if (type === FitTypes.Fill) {
      this.resize({ width, height });
    } else {
      this.resize({ height });
    }
  }

  private resize(option: { width?: number; height?: number }) {
    const resized = this.input.resize(option);
    this.writeImageToClipboard(resized);

    Notificator.showSuccessMessage(this.input, resized);
  }

  private readImageFromClipboard(): Electron.nativeImage {
    return clipboard.readImage();
  }

  private writeImageToClipboard(image: Electron.nativeImage) {
    clipboard.writeImage(image);
  }
}
