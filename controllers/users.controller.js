const Users = require('../models/users.data')

const createUser = async (req, res) => {
  try {
    // const newUsers = new Users({
    //   name: req.body.name,
    //   age: req.body.age,
    //   phone: req.body.phone,
    // })
    const newUsers = new Users(req.body)
    const usersData = await newUsers.save()

    // const usersData = await Users.insertMany([
    //   {
    //     name: 'synthia',
    //     age: 20,
    //   },
    //   {
    //     name: 'zakir',
    //     age: 34,
    //   },
    // ])

    res.status(201).send(usersData)
  } catch (error) {
    res.status(500).send({
      message: error.message,
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const age = req.query.age
    let users
    if (age) {
      users = await Users.find({
        $and: [{ age: { $gt: age } }, { age: { $lt: 49 } }],
      })
    } else {
      users = await Users.find()
      //   users = await Users.find().countDocuments()
      //   users = await Users.find().sort({ age: -1 })
      //   users = await Users.find().select({ age: -1, _id: 0 })
    }
    if (users) {
      res.status(200).send({
        success: true,
        data: users,
      })
    } else {
      res.status(404).send({
        message: 'users not found',
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    })
  }
}

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id
    const users = await Users.findOne({ _id: id })
    // const users = await Users.find({ _id: id })
    // const users = await Users.findOne({ _id: id }).select({
    //   name: 1,
    //   _id: 0,
    //   age: 1,
    // })
    // res.send(users)
    if (users) {
      res.status(200).send(users)
    } else {
      res.status(404).send({
        message: 'users not found',
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    })
  }
}

const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id
    const users = await Users.deleteOne({ _id: id })
    // const users = await Users.deleteMany({ _id: id })
    // const users = await Users.findByIdAndDelete({ _id: id })
    if (users) {
      res.status(200).send({
        success: true,
        data: users,
      })
    } else {
      res.status(404).send({
        message: 'users not found',
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    })
  }
}

const updateUsers = async (req, res) => {
  try {
    const id = req.params.id
    // const updatedUsers = await Users.updateOne(
    // const updatedUsers = await Users.updateMany(
    const updatedUsers = await Users.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
        },
      },
      { new: true }
    )
    if (updatedUsers) {
      res.status(200).send({
        success: true,
        data: updatedUsers,
      })
    } else {
      res.status(404).send({
        message: 'users not found',
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    })
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  deleteUsers,
  updateUsers,
}
