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
  setFullscreenStart: async function (value) {
    await db.setup.update({ menu: 'fullscreenStart' }, { $set: { value: value } }, { upsert: true })
    return status.fullscreenStart
  },
  getFullscreenStart: async function () {
    const r = await db.setup.findOne({ menu: 'fullscreenStart' })
    return r.value
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
  },
  getBgColorDefalut: async function () {
    const result = await db.setup.findOne({ menu: 'background' })
    return result.value ? 'white' : 'black'
  },
  setLicense: async function (value) {
    await db.setup.update({ menu: 'license' }, { $set: { value: value } }, { upsert: true })
  },
  getLicense: async function () {
    return await db.setup.findOne({ menu: 'license' })
  }
}
