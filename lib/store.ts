import { FitTypes } from './types';
import * as ElectronStore from 'electron-store';

class Store {
  store = new ElectronStore();

  get FitType() {
    return this.store.get('preference.fitType', FitTypes.Height);
  }
  set FitType(value: FitTypes) {
    this.store.set('preference.fitType', value);
  }
}

export default new Store();
