const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

const connectToDB = async () => {
    try {
        await mongoose.set('strictQuery', false).connect(url)
        console.log('connected to mongoDB')
    } catch(error) { 
        console.log("Error to connecting to db", error.message)
    }
}

module.exports = connectToDB