import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'


dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser } // only admin user will have access
        })
        await Product.insertMany(sampleProducts)

        console.log('DATA IMMPORTED!'.green.inverse) // to check 
        
        process.exit() //to come out of it after the import is done

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1) // 1 indicates failure
    }
}

const destroyData = async () => { // if admin wants to delete the data
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('DATA DESTROYED!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1) // 1 indicates failure
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}