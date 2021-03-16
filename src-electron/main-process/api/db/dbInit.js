import { app } from 'electron'
import Datastore from 'nedb-promises'

export default class dbInit {
  constructor (file) {
    this.db = new Datastore({
      filename: `${app.getPath('userData')}/.db/${file}`,
      timestampData: true,
      autoload: true
    })
  }
}
