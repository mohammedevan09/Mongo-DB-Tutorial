const express = require('express')
const app = express()
const connectDB = require('./models/users.connect')
const UserRoute = require('./routes/users.router')

const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello world</h1>')
})

app.use('/users', UserRoute)

app.listen(port, () => {
  console.log('Server is running is localhost:' + port)
  connectDB()
})
