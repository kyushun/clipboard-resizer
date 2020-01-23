import * as path from 'path';
import { app, Menu, Tray } from 'electron';
import { FitTypes } from './lib/types';
import Store from './lib/store';
import Resizer from './lib/resizer';

const isMac = process.platform === 'darwin';

const contextMenu = Menu.buildFromTemplate([
  { label: app.name + ' v' + app.getVersion(), enabled: false },
  { type: 'separator' },
  {
    label: 'Resize',
    submenu: [
      {
        label: 'by Percentage',
        submenu: [
          { label: 'Preset Percentages', enabled: false },
          {
            label: '75%',
            click: () => Resizer.init().resizeByPercentage(75)
          },
          {
            label: '50%',
            click: () => Resizer.init().resizeByPercentage(50)
          },
          {
            label: '25%',
            click: () => Resizer.init().resizeByPercentage(25)
          },
          {
            label: '10%',
            click: () => Resizer.init().resizeByPercentage(10)
          }
        ]
      },
      {
        label: 'by Dimentions',
        submenu: [
          { label: 'Fit Type', enabled: false },
          {
            label: 'Prefer Height',
            type: 'radio',
            click: () => (Store.FitType = FitTypes.Height),
            checked: Store.FitType === FitTypes.Height
          },
          {
            label: 'Prefer Width',
            type: 'radio',
            click: () => (Store.FitType = FitTypes.Width),
            checked: Store.FitType === FitTypes.Width
          },
          {
            label: 'Fill',
            type: 'radio',
            click: () => (Store.FitType = FitTypes.Fill),
            checked: Store.FitType === FitTypes.Fill
          },
          { type: 'separator' },
          { label: 'Preset Resolutions', enabled: false },
          {
            label: '4K (4096×2160)',
            click: () =>
              Resizer.init().resizeByDimentions(4096, 2160, Store.FitType)
          },
          {
            label: 'FHD (1920x1080)',
            click: () =>
              Resizer.init().resizeByDimentions(1920, 1080, Store.FitType)
          },
          {
            label: 'HD (1280x720)',
            click: () =>
              Resizer.init().resizeByDimentions(1280, 720, Store.FitType)
          }
        ]
      }
    ]
  },
  { type: 'separator' },
  { role: 'quit' }
]);

if (isMac) app.dock.hide();

let tray: Electron.Tray = null;
app.on('ready', () => {
  const iconPath = isMac
    ? '../icon/macTrayTemplate.png'
    : '../icon/winTrayIcon.png';
  tray = new Tray(path.join(__dirname, iconPath));
  tray.setToolTip(app.name);
  tray.setContextMenu(contextMenu);
});
