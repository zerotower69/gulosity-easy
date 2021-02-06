import os from 'os';
import path from 'path';
import fs from "fs";
// import fse from 'fs-extra';
import {remote, app} from "electron";
const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块
const STORE_PATH = APP.getPath("userData") // 获取electron应用的用户目录
import store from "../../store"  

/*
*
**/
function FILE(){
}

/**
 * 
 * @param {String} dirName   文件夹名
 * @param {Function} callback  回调
 */
FILE.prototype.loading=function loadingFiles(dirName,callback){
    let lists;
    let error;
    fs.readdir(dirName,(err,result)=>{
        error=err;
        lists=result;
    })
    setImmediate( function(){
        callback(error,lists);
    })
}

const file=new FILE()

/**  读取指定目录下的所有文件 */


export default file;