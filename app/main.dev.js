/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow } from 'electron';
import MenuBuilder from './menu';
const {ipcMain} = require('electron');
const fs = require('fs');
const path = require('path');

let CWD = process.cwd();
let workerWindow=null;
// if (process.env.NODE_ENV === 'production') {
//
//   updater.init({
//     checkUpdateOnStart: true,
//     autoDownload: true,
//     url: '../updates.json',
//   });
//
//   updater.on('update-downloaded', () => {
//     menuBuilder.informAboutUpdate();
//   });
//
//   updater.on('checking-for-update', () => {
//     console.log('Clays Code: checking for updates...');
//   });
//
//   updater.on('update-available', () => {
//     console.log('Clays Code: update is available!');
//   });
//
//   updater.on('update-downloading', () => {
//     console.log('Clays Code: downloading update...');
//   });
// }

let mainWindow = null;


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    height:728,
    width:1024,
    minHeight:728,
    minWidth:1024,
    center:true,

  });
  workerWindow = new BrowserWindow({
    show: false,
    height:728,
    width:1024,
    minHeight:728,
    minWidth:1024
  });
  let dbDirectory = path.join(__dirname, process.env.NODE_ENV ==='development' ? '/prescription.html' : '/prescription.html');
  if (process.env.NODE_ENV ==='production'){
    dbDirectory = path.join(process.resourcesPath , '/prescription.html');
  }

  workerWindow.loadFile(dbDirectory);
//  workerWindow.hide();
  workerWindow.webContents.closeDevTools();

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {

    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

  });

  workerWindow.webContents.on('did-finish-load', () => {

    if (!workerWindow) {
      throw new Error('"workerWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      workerWindow.minimize();
    } else {
      workerWindow.hide();
     // workerWindow.focus();
    }

  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    workerWindow = null;
  });
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

});

ipcMain.on('resize-me-please', (event, arg) => {
  console.log(mainWindow.isResizable());
  if (arg) {
    mainWindow.unmaximize();
    mainWindow.setResizable(false);
  }else{
    mainWindow.maximize();
    mainWindow.setResizable(false);
  }
});

ipcMain.on("printPDF", (event: any, content: any) => {
  workerWindow.webContents.send("printPDF", content);
});

ipcMain.on("readyToPrintPDF", (event, options) => {
  workerWindow.webContents.print(options);
});

ipcMain.on('fetch-system-printers', (event, arg) => {
  event.returnValue = mainWindow.webContents.getPrinters();
});

ipcMain.on('generate-pdf', (event, arg) => {
  try {
    appLog('info', `PDF generate request`);
    workerWindow.webContents.printToPDF({}, (error, data) => {
      if (error) appLog('error', `error while generating or saving pdf: ${error}`);
      event.returnValue = data;//send the pdf as raw data
      //do not write the pdf to file system
      // fs.writeFile('/print.pdf', data, (error) => {
      //   if (error) throw error;
      // });
    });
  }catch (e) {
    appLog('error', `error while generating or saving pdf: ${e.stack}`);
  }

});

ipcMain.on("updateTemplateRequest", (event: any, content: any) => {
  workerWindow.webContents.send("updateTemplate", content);
});


//Function which writes two levels of LOGS
function appLog(level, message) {
  const origMsg = `${level} : ${message} EOL`;
  fs.appendFileSync(path.join(CWD, 'app-info.log'), origMsg)
}
