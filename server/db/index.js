//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require ('./models/Product')

User.hasMany(Product)

module.exports = {
  db,
  models: {
    User,
  },
}
