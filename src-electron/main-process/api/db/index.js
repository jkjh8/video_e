import dbDictionary from './dbInit'

const db = {
  list: new dbDictionary('linst.db'),
  itmes: new dbDictionary('items.db'),
  setup: new dbDictionary('setup')
}

export default db
