import db from '../db'

const files = require('../files')

async function getList () {
  const result = await db.list.find({})
  if (result.length === 0) {
    try {
      await db.list.insert({ name: 'default' })
      return await db.list.find()
    } catch (err) {
      console.log('getList', err)
    }
  }
  return result
}

async function getListItems (list) {
  return await db.items.find({ playlist: list })
}

async function addList (list) {
  try {
    const result = await db.list.find({ name: list })
    console.log(result)
    if (result.length <= 0) {
      await db.list.insert({ name: list })
    }
  } catch (err) {
    console.log('addList', err)
  }
}

async function addListItem (item) {
  try {
    const itemObj = await files.getFileObj(item)
    itemObj.playlist = status.currListName
    await db.items.insert(itemObj)
  } catch (err) {
    console.log('addListItem', err)
  }
}

async function addListItems (items) {
  try {
    items.forEach(async (item) => {
      await addListItem(item)
    })
  } catch (err) {
    console.log('addListItems', err)
  }
}

async function delList (list) {
  try {
    await db.items.remove({ playlist: list.name })
    await db.list.remove({ _id: list._id })
  } catch (err) {
    console.log('delList', err)
  }
}

async function delListItem (item) {
  try {
    await db.items.remove({ _id: item._id })
  } catch (err) {
    console.log('delListItem', err)
  }
}

async function delListItems (list) {
  try {
    await db.items.remove({ playlist: list })
  } catch (err) {
    console.log('delListItems', err)
  }
}

async function delAll () {
  try {
    await db.list.remove()
    await db.items.remove()
  } catch (err) {
    console.log('delAll', err)
  }
}

async function getSetup (item) {
  return await db.setup.getSetup(item)
}

async function updateSetup (item, value) {
  return await db.setup.updateSetup(item, value)
}

async function refreshDb (status, first = false) {
  status.list = await db.list.find()
  if (status.list.length === 0) {
    try {
      await db.list.add({ name: 'default' })
      status.list = await db.list.find()
    } catch (err) {
      console.log('getList', err)
    }
  }
  if (first) {
    console.log('first')
    status.currListName = status.list[0].name
  }
  status.items = await db.items.find({ playlist: status.currListName })
  return status
}

const dbFn = {
  getList: getList,
  getListItems: getListItems,
  addList: addList,
  addListItem: addListItem,
  addListItems: addListItems,
  delList: delList,
  delListItem: delListItem,
  delListItems: delListItems,
  delAll: delAll,
  getSetup: getSetup,
  updateSetup: updateSetup,
  refreshDb: refreshDb
}

export default dbFn
