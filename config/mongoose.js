// require lib
const mongoose = require('mongoose')

// connect database

mongoose.connect('mongodb://127.0.0.1:27017/myapp')

// acquire connection

const db= mongoose.connection;

// err

db.on('error',console.error.bind(console,'error connecting to db'))

// 

db.once('open',() => {
   console.log('sucessfuly connected to database')
})