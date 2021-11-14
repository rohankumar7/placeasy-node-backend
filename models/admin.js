const mongoose = require('mongoose')
const { Schema } = mongoose
const bcypt = require('bcrypt')

const adminSchema = new Schema({
    username : {
        type : String,
        default : 'admin'
    },
    password : {
        type : String,
        default : 'test'
    }
})
adminSchema.pre('save', async function(next){
    try {
        const hashed = await bcypt.hash(this.password,10)
        this.password = hashed
        next()   
    } catch (error) {
        next(error)
    }
})
adminSchema.methods.comparePassword = async function(password){
    try {
        return await bcypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}
const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin