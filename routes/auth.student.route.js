const router = require('express').Router()
const createError = require('http-errors')
const { Student } = require('../models/student')
const { signAccessToken, signRefreshToken,verifyRefreshToken } = require('../helpers/jwt')
const { RefreshToken } = require('../models/refreshToken')

router.post('/register', async (req, res, next) => {
    try {

        const doesExists = await Student.findOne({_id : req.body._id})
        if (doesExists) throw createError.Conflict(`${req.body._id} already exists.`)

        const student = new Student(req.body)
        await student.save()
        res.send({message:'Successfully registered!'})

    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {

    try {
        const student = await Student.findById(req.body.id)

        if(!student) throw createError.Unauthorized('student not registerd.')
        
        const isValidPassword = await student.comparePassword(req.body.password)
        if(!isValidPassword) throw createError.Unauthorized('invalid usn / password.')

        const accessToken = await signAccessToken(student.id, 'student')
        const refreshToken = await signRefreshToken(student.id)
        
        res.send({accessToken,refreshToken})

    } catch (error) {
        next(error)
    }
})

router.post('/refresh-token', async(req,res,next) => {
    try {
        const { refreshToken } = req.body
        if(!refreshToken) throw createError.BadRequest()

        const studentId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(studentId,'student')
        const refToken = await signRefreshToken(studentId)
        
        res.send({accessToken,refreshToken: refToken})

    } catch (error) {
        next(error)
    }
})

router.delete('/logout', async(req,res,next)=>{
    try {
        const { refreshToken } = req.body
        if(!refreshToken) throw createError.BadRequest()

        const studentId = await verifyRefreshToken(refreshToken)
        await RefreshToken.deleteOne({userId:studentId})
        
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = router