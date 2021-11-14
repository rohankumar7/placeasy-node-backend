const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true
        })
    } catch (err) {
        console.log(err.message)
    }
    mongoose.connection.on('connected', () => {
        console.log('connected to database.')
    })
    mongoose.connection.on('error', (err) => {
        console.log(err.message)
    })
    mongoose.connection.on('disconnected', () => {
        console.log('database disconnected.')
    })
    process.on('SIGINT', async() => {
        await mongoose.connection.close()
        process.exit(0)
    })
}
module.exports = connectDB