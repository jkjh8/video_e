import db from '../db'

export default {
  setLogo: async function (value) {
    status.logo = value
    await db.setup.update({ menu: 'logo' }, { $set: { value: value } }, { upsert: true })
  },
  getLogo: async function () {
    return await db.setup.find({ menu: 'logo' })
  }
}
