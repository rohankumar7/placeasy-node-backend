const createError = require('http-errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req,res,next) =>{
    
    if(!req.headers['authorization']) return next(createError.Unauthorized())
    const bearerToken = req.headers['authorization']
    const token = bearerToken.split(' ')[1]

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,payload)=>{
        if(err){
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return next(createError.Unauthorized(message))
        } 
        req.user = payload
        next()
    })
}