const route = require('express').Router()
const {
  createUser,
  getAllUsers,
  getOneUser,
  deleteUsers,
  updateUsers,
} = require('../controllers/users.controller')

route
  .post('/', createUser)
  .get('/', getAllUsers)
  .get('/:id', getOneUser)
  .delete('/:id', deleteUsers)
  .put('/:id', updateUsers)

module.exports = route
