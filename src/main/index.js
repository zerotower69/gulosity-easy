import { app, BrowserWindow,dialog,ipcMain } from 'electron'
// import db from  '../renderer/datastore'
import fs from 'fs-extra';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const templates=[
  {
      label:'文件',
      submenu:[
          {
              label:'新建笔记',
              click:()=>{
                const files=  db.read().get("workplace").value();
                let count=0;
                files.forEach(file=>{
                    if(/Untitled/.test(file.name)){ count++}
                })
                db.get("workplace").push({
                    id:files.length+1,
                    name:count===0?'Untitled':'Untitled'+(new String(count)),
                    save:false
                }).write()
                ipcMain.emit("reload-workplace","aa")
              //   location.reload()
              }

          },
          {
              label:'打开工作区',
              click:()=>{
                  dialog.showOpenDialog({
                      properties:['openDirectory']
                  },(result)=>{
                      if(result!==''){
                          db.set("current",result[0]).write();
                          fs.readdir(result[0],function(err,results){
                              if(err!==null) return;
                              else{
                                  let count=1;
                                  let files=[]
                                  results.forEach(file=>{
                                      console.log(file);
                                      const index=file.lastIndexOf(".");
                                      const ext=file.substr(index+1);
                                      if(ext==='md'){
                                          files.push({
                                              id:count,
                                              name:file,
                                              save:true
                                          });
                                          count++;
                                      }
                                  })
                                  db.set("workplace",files).write();
                                  console.log(files);
                                  dialog.showMessageBox(mainWindow,{title:'友情提示',message:'加载成功'},()=>{

                                  })
                              }
                          })
                      }
                  })
              }
          }
      ]
  }
]
// 读取文件
ipcMain.on("chooseFile",(event,arg)=>{
  let choosedPath="";
  dialog.showOpenDialog(mainWindow,{
    title:"选择markdown文件",
    buttonLabel:'走起',
    properties:['openFile'],
    filters:[{
      name:"Text",extensions:['md']
    }]
  },function(path,mark){
    console.log(path,mark);
    choosedPath=path;
    event.sender.send("choose-file-reply",path);
  })
})

/** 保存文件 */
ipcMain.on("outputFile",(event,arg)=>{
  console.log(arg);
  dialog.showSaveDialog(mainWindow,{
    title:'保存markdown文件到本地',
    defaultPath:'D:\\myself.md',
    buttonLabel:'去也',
    filters:[
      {
        name:'text',extensions:['md']
      }
    ]
  },function(fileName,bookmark){
    // console.log(fileName)
    event.sender.send("output-file-reply",fileName);
  })
})

/**
 * reading file or writing
 * 
 */
// ipcMain.on("asynchronous-readdir",function(){
//   const  current=db.get("current").value();
//   fs.readdir(current,(err,result)=>{
//     let files=[];
//     let count=0;
//     result.forEach((file) => {
//         // console.log(file)
//       let index = file.lastIndexOf(".");
//       let ext = file.substr(index + 1);
//         // console.log(ext)
//       if (ext === "md") {
//         db.get("files").push({id:count,name:file}).write();
//         count++;
//       }
//     });
//     const num=db.read().get("files").toLength()
//     console.log(num)
//     if(num>0){
//       console.log("读取到的文件",num);
//       dialog.showMessageBox(mainWindow,{
//         title:'友情提醒',
//         message:'读取文件成功'
//       },()=>{})

//     }
//     else{
//       console.log("暂时无法读取")
//     }

//   })
// })


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
