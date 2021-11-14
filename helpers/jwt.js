const jwt = require('jsonwebtoken')
const createError = require('http-errors')
require('dotenv').config()
const RefreshToken = require('../models/refreshToken')
module.exports = {
    signAccessToken: (userId, role) => {
        return new Promise((resolve, reject) => {
            const payload = {
                id:userId,
                role
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '1h',
                issuer: 'placeasy.com'
            }
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {console.log(err.message) 
                    reject(createError.InternalServerError())}
                resolve(token)
            })
        })
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                id:userId
            }
            const secret = process.env.REFRESH_TOKEN_SECRET
            const options = {
                expiresIn: '1y',
                issuer: 'placeasy.com',
            }
            jwt.sign(payload, secret, options, async (err, token) => {
                if (err){
                    reject(createError.InternalServerError())}
                try {
                    const doesExists = await RefreshToken.findOne({userId:userId})
                    if(!doesExists){
                        const reftoken = new RefreshToken({userId:userId,token:token})
                        await reftoken.save()
                    }
                    else await RefreshToken.updateOne({userId:userId},{token:token})
                    resolve(token)
                } catch (error) {
                    reject(createError.InternalServerError())
                }
            })
        })
    },
    verifyRefreshToken : (refreshToken) => {
        return new Promise((resolve,reject)=>{
            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, async(err,payload)=>{
                if(err) reject(createError.Unauthorized('token expired'))
                try {
                    const token = await RefreshToken.find({userId:payload.id})
                    if(token.length > 0 && token[0].token === refreshToken) resolve(payload.id)
                    else reject(createError.Unauthorized())
                } catch (error) {
                    reject(createError.InternalServerError())
                }
            })
        })
    }
}