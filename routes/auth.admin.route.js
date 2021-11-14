const router = require('express').Router()
const Admin = require('../models/admin')
const createError = require('http-errors')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt')
const { RefreshToken } = require('../models/refreshToken')
const auth = require('../middleware/verifyAccessToken')
const { isAdmin } = require('../middleware/roleVerify')

router.post('/login', async(req,res,next) =>{
    try {
        const admin = await Admin.findOne({username : req.body.username})
        if(!admin) throw createError.BadRequest('username / password not valid.')
        const isValidPassword = await admin.comparePassword(req.body.password)
        if(!isValidPassword) throw createError.BadRequest('username / password not valid.')
        const accessToken = await signAccessToken(admin.id,'admin')
        const refreshToken = await signRefreshToken(admin.id)
        res.send({accessToken, refreshToken})

    } catch (err) {
        next(err)
    }
})

router.post('/refresh-token', async (req,res,next) => {
    try {
        const { refreshToken } = req.body
        if(!refreshToken) throw createError.BadRequest()

        const adminId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(adminId,'admin')
        const refToken = await signRefreshToken(adminId)

        res.send({accessToken:accessToken,refreshToken : refToken})

    } catch (error) {
        next(error)
    }
})

router.post('/logout', auth, isAdmin, async(req,res,next)=>{
    try {
        const { refreshToken} = req.body

        if(!refreshToken) throw createError.BadRequest()
        const adminId = await verifyRefreshToken(refreshToken)
        await RefreshToken.deleteOne({userId:adminId})

        res.sendStatus(204)
        
    } catch (error) {
        next(err)
    }
})
// router.get('/change-password', auth, isAdmin, async (req, res, next) => {
//     try {
//         const { oldPassword, newPassword } = req.body
//         if (!oldPassword || !newPassword) throw createError.BadRequest()
//         const admin = await Admin.findById({ _id: req.user.id })
//         admin.password = newPassword
//         await admin.save()
//         res.send(204)
//     } catch (error) {
//         next(error)
//     }
// })
module.exports = router