import dbDictionary from './dbInit'

const db = {
  list: dbDictionary('linst.db'),
  items: dbDictionary('items.db'),
  setup: dbDictionary('setup')
}

export default db
