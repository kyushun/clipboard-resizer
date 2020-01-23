import * as path from 'path';
import { app, Menu, Tray } from 'electron';
import { FitTypes } from './lib/types';
import Store from './lib/store';
import Resizer from './lib/resizer';

const isMac = process.platform === 'darwin';

const Presets = {
  Percentages: [75, 50, 25, 10],
  Dimentions: [
    { name: '4K', width: 3840, height: 2160 },
    { name: 'WQHD', width: 2560, height: 1440 },
    { name: 'FHD', width: 1920, height: 1080 },
    { name: 'HD', width: 1280, height: 720 },
    { name: '480p', width: 854, height: 480 },
    { name: '360p', width: 640, height: 360 },
    { name: '240p', width: 426, height: 240 }
  ]
};

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
          ...Presets.Percentages.map(v => {
            return {
              label: v + '%',
              click: () => Resizer.init().resizeByPercentage(v)
            };
          })
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
          ...Presets.Dimentions.map(v => {
            return {
              label: `${v.name} (${v.width}x${v.height})`,
              click: () =>
                Resizer.init().resizeByDimentions(
                  v.width,
                  v.height,
                  Store.FitType
                )
            };
          })
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
