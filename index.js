const dex_db = require('@calp-pro/dex-db')
const fn = require('path').join(__dirname, 'good')

var db

module.exports = () => {
    if (!db) {
        db = dex_db()
        db.load(fn)
    }
    return db
}