/*
* @Author: yankang
* @Date:   2019-10-26 21:57:58
* @Last Modified by:   yankang
* @Last Modified time: 2019-11-04 17:03:14
*/

const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron
const url = require('url')
const path = require('path')
// const httpServer = require('http-server')

let mainWindow
let contents
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  // ./static/sw.html
  mainWindow.loadURL('http://localhost:8888/sw.html')

  // workbox
  // mainWindow.loadURL('http://localhost:9999/')

  // mainWindow.loadFile('index.html')
  // mainWindow.loadURL(url.format({
	 //  pathname: path.join(__dirname, './build/index.html'),
	 //  protocol: 'file:',
	 //  slashes: true
  // }))

  mainWindow.webContents.openDevTools()
  mainWindow.maximize()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // contents = mainWindow.webContents
  // contents.executeJavaScript(
  //   document.querySelector('#reload').click(function(){
  //     console.log(contents)
  //     contents.reload()
  //   })
  // )
})

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
   // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})

// httpServer.createServer().listen(8888)

