import db from '../db'
import { Menu } from 'electron'

export default {
  setLogo: async function (value) {
    status.logo = value
    await db.setup.update({ menu: 'logo' }, { $set: { value: value } }, { upsert: true })
    return status.logo
  },
  getLogo: async function () {
    const result = await db.setup.findOne({ menu: 'logo' })
    return result.value
  },
  setBgColor: async function () {
    if (status.background === 'black') {
      await db.setup.update({ menu: 'background' }, { $set: { value: 'white' } }, { upsert: true })
      return 'white'
    } else {
      await db.setup.update({ menu: 'background' }, { $set: { value: 'black' } }, { upsert: true })
      return 'black'
    }
  },
  getBgColor: async function () {
    const result = await db.setup.findOne({ menu: 'background' })
    return result.value
  }
}
