const router = require('express').Router()
const mongoose = require('mongoose')
const { Student } = require('../models/student')
const auth = require('../middleware/verifyAccessToken')
const { isStudent } = require('../middleware/roleVerify')
const createError = require('http-errors')


router.get('/dashboard', auth, isStudent, async (req, res, next) => {
    try {
        const student = await Student.findById(req.user.id).select('-password')
        if (!student) throw createError.BadRequest('Student with the given Id was not found.')
        res.send(student)
    } catch (error) {
        next(error)
    }
})

router.put('/edit', auth, isStudent, async (req, res, next) => {
    try {
        const student = Student.findByIdAndUpdate(req.user.id, req.body, { new: true })
        if (!student) throw createError.BadRequest('Student with the given Id was not found.')
        res.send(student)
    } catch (error) {
        next(error)
    }
})

router.delete('/delete' , auth, isStudent, async (req, res, next) => {
    try {
        const student = Student.findByIdAndRemove(req.user.id)
        if (!student) throw createError.BadRequest('Student with the given Id was not found.')
        res.send(student)
    } catch (error) {
        next(error)
    }
})

router.get('/change-password', auth, isStudent, async(req,res,next) => {
    try {
        const { oldPassword , newPassword } = req.body
        if(! oldPassword || ! newPassword) throw createError.BadRequest()
        const student = await Student.findById({_id: req.user.id})
        student.password = newPassword
        await student.save()
    } catch (error) {
        next(error)
    }
})
module.exports = router