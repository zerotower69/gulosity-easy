import Datastore  from 'lowdb'
import LodashId from 'lodash-id'   //add id
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import {remote,app} from 'electron'

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

//初始化的userData未创建而data.json已经被加载
if (process.type !== 'renderer') {
    if (!fs.pathExistsSync(STORE_PATH)) {
      fs.mkdirpSync(STORE_PATH)
    }
  }

const adapter = new FileSync(path.join(STORE_PATH, '/settings.json'))

const db = Datastore(adapter)
db._.mixin(LodashId)

export default db  //接口暴露