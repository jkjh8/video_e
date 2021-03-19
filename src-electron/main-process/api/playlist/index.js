import { app } from 'electron'
import db from '../db'
import fs from 'fs'
import path from 'path'
import ff from '../files'
import { genThunbnail } from '../function'

const folderThumbnailPlaylist = path.join(app.getPath('userData'), 'tmp/thumbnail/playlist')

async function getList () {
  status.list = await db.list.find({}).sort({ createdAt: 1 })
  if (status.list.length === 0) {
    try {
      await db.list.insert({ name: 'default' })
      return await db.list.find({}).sort({ createdAt: 1 })
    } catch (err) {
      console.log('getList', err)
    }
  }
  if (status.listIdx > status.list.length - 1) {
    status.listIdx = status.list.length - 1
    status.currListName = status.list[status.listIdx].name
  }
  return status.list
}

async function getListItems (list = status.list[status.listIdx].name) {
  return await db.items.find({ playlist: list }).sort({ createdAt: 1 })
}

async function addList (list) {
  try {
    const result = await db.list.find({ name: list })
    if (result.length <= 0) {
      await db.list.insert({ name: list })
    }
  } catch (err) {
    console.log('addList', err)
  }
}

async function addListItem (item, playlist = status.currListName) {
  try {
    const itemObj = await ff.getFileObj(item, playlist)
    const result = await db.items.insert(itemObj)
    if (status.arch !== 'arm64') {
      await genThunbnail(result.file, result.uuid, 'playlist')
    }
  } catch (err) {
    console.log('addListItem', err)
  }
}

async function addListItems (items, playlist = status.currListName) {
  try {
    for (const item of items) {
      await addListItem(item, playlist)
    }
    return await db.items.find({ playlist: status.currListName }).sort({ createdAt: 1 })
  } catch (err) {
    console.log('addListItems', err)
  }
}

async function delList (list) {
  try {
    const items = await db.items.find({ playlist: list.name })
    for (const item of items) {
      await fs.unlinkSync(path.join(folderThumbnailPlaylist, `${item.uuid}.png`))
      await db.items.remove({ _id: item._id })
    }
    await db.list.remove({ _id: list._id })
    status.list = await getList()
    status.items = await getListItems(status.currListName)
  } catch (err) {
    console.log('delList', err)
  }
}

async function delListItem (item) {
  try {
    await db.items.remove({ _id: item._id })
    fs.unlinkSync(path.join(folderThumbnailPlaylist, `${item.uuid}.png`))
  } catch (err) {
    console.log('delListItem', err)
  }
}

async function delListItems (list) {
  try {
    for (const item of status.items) {
      await fs.unlinkSync(path.join(folderThumbnailPlaylist, `${item.uuid}.png`))
    }
    await db.items.remove({ playlist: list }, { multi: true })
  } catch (err) {
    console.log('delListItems', err)
  }
}

async function delAll () {
  try {
    const items = await db.items.find({})
    for (const item of items) {
      fs.unlinkSync(path.join(folderThumbnailPlaylist, `${item.uuid}.png`))
    }
    await db.list.remove({}, { multi: true })
  } catch (err) {
    console.log('delAll', err)
  }
  await db.items.remove({}, { multi: true })
  await db.list.remove({}, { multi: true })
  status.list = await getList()
  status.items = await getListItems('default')
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
    status.currListName = status.list[0].name
  }
  status.items = await db.items.find({ playlist: status.currListName })
  return status
}

async function next () {
  const itemsLength = status.items.length
  status.itemIdx = status.itemIdx + 1
  if (status.itemIdx >= itemsLength) {
    status.itemIdx = 0
  }
  const result = await ff.openFileIdx()
  return result
}

async function previous () {
  try {
    const itemsLength = status.items.length
    status.itemIdx = status.itemIdx - 1
    if (status.itemIdx < 0) {
      status.itemIdx = itemsLength - 1
    }
    const result = await ff.openFileIdx()
    return result
  } catch (err) {
    console.log(err)
  }
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
  refreshDb: refreshDb,
  next: next,
  previous: previous
}

export default dbFn
