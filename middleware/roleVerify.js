const createError = require('http-errors')

module.exports ={

    isStudent : (req,res,next) =>{
        if(req.user.role === 'student') return next()
        next(createError.Forbidden())
    },

    isAdmin : (req,res,next) =>{
        if(req.user.role === 'admin') return next()
        next(createError.Forbidden())
    }

}