const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    minlength: [3, 'minimum length should be 3'],
    maxlength: [15, 'maximum length should be 15'],
    trim: true,
    // lowercase:true,
    // uppercase:true
    // enum: ['evan', 'rahul'],
    // validate: {
    //   validator: function (v) {
    //     return v.length === 10
    //   },
    //   message: (props) => `${props.value} is not a valid name`,
    // },
  },
  age: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required'],
    validate: {
      validator: (v) => {
        return /^\d{10}$/.test(v)
      },
      message: (props) => `${props.value} is not a valid number`,
    },
  },
})

const Users = mongoose.model('Users', usersSchema)

module.exports = Users
