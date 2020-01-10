const electron = require('electron');
//import electron from 'electron';
const url = require('url');
//import url from 'url';
const path = require('path');
//import path from 'path';
const dev = process.env.NODE_ENV === 'development';

const { app, BrowserWindow } = electron;

let mainWindow;

/** This function will create the mainWindow */
function createWindow() {
    
    mainWindow = new BrowserWindow({
        width: dev ? 800 : 420,
        height: dev ? 800 : 200,
        icon: path.join(__dirname, '/res/images/logo.png'),
        frame: false,
        webPreferences: {
            nodeIntegration: true
            //webSecurity: false,
            //allowRunningInsecureContent: true
        }        
    });

    //mainWindow.setMenu(null); 
    //mainWindow.setMenu();  
    mainWindow.setResizable(false);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }) + '?main');

    if(dev){
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function(){
        mainWindow = null;
        app.quit();
    });

}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function(){
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', function(){
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if(mainWindow === null){
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

