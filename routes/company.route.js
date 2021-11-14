const router = require('express').Router()
require('mongoose')
const { Company } = require('../models/company')
const { Student } = require('../models/student')
const createEligibleList = require('../helpers/createEligibleList')
const conductRound = require('../helpers/conductRound')
const createError = require('http-errors')
const auth = require('../middleware/verifyAccessToken')
const { isAdmin } = require('../middleware/roleVerify')


router.get('/company-list', auth, isAdmin, async (req, res, next) => {
    try {
        const companies = await Company.find()
        res.send(companies)
    } catch (error) {
        next(error)
    }

})

router.post('/add-company', auth, isAdmin, async (req, res, next) => {
    try {

        const company = new Company()
        await company.save()
        res.send(company)
    } catch (error) {
        next(error)
    }
})

router.put('/edit-name/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { companyName: req.body.companyName }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-10th/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { "requirement._10th": req.body.value }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-12th/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { "requirement._12th": req.body.value }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-cgpa/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { "requirement.cgpa": req.body.value }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-diploma-allowed/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { diplomaAllowed: req.body.value }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-girls-only/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { girlsOnly: req.body.value }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-year/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { year: req.body.value }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-job-profile/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { "jobDescription.profile": req.body.value }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-job-location/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { "jobDescription.location": req.body.value }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-job-package/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $set: { "jobDescription.package": req.body.value }
        }, { new: true })
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-placement-rounds/:id/:action', auth, isAdmin, async (req, res, next) => {
    try {
        let company
        if (req.params.action === 'add') {
            company = await Company.findByIdAndUpdate(req.params.id, {
                $push: { placementRounds: req.body.value }
            }, { new: true })
        } else {
            company = await Company.findByIdAndUpdate(req.params.id, {
                $pull: { placementRounds: req.body.value }
            }, { new: true })
        }
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/edit-company-branches-allowed/:id/:action', auth, isAdmin, async (req, res, next) => {
    try {
        let company
        if (req.params.action === 'selected') {
            company = await Company.findByIdAndUpdate(req.params.id, {
                $push: { branches: req.body.value }
            }, { new: true })
        } else {
            company = await Company.findByIdAndUpdate(req.params.id, {
                $pull: { branches: req.body.value }
            }, { new: true })
        }
        if (!company) throw createError.NotFound('company with the given Id not found.')
        res.sendStatus(200)
    }
    catch (error) {
        next(error)
    }
})

router.get('/get-company/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id)
        if (!company) throw createError.NotFound('company with the given Id was not found.')
        res.send(company)
    } catch (err) {
        next(err)
    }
})

router.delete('/delete-company/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id)
        if (!company) throw createError.NotFound('company with the given Id was not found.')
        res.send(company)
    } catch (err) {
        next(err)
    }
})

router.get('/create-eligible-list/:id', auth, isAdmin, async (req, res, next) => {
    try {
        let company = await Company.findById(req.params.id)

        if (!company) throw createError.NotFound('company with the given Id was not found.')

        const student = await Student.find()

        company.eligible = createEligibleList(company, student)

        await company.save()
        res.send(company)
    } catch (error) {
        next(error)
    }
})

router.post('/update-round/:id', auth, isAdmin, async (req, res, next) => {
    try {
        if (!req.files || Object.entries(req.files).length === 0) throw createError.BadRequest('No file were uploaded')

        if (req.files.file.name.split('.')[1] !== 'csv') throw createError.BadRequest('Only csv file are allowed')

        if (!req.body.round) throw createError.BadRequest('round name not found.')

        let company = await Company.findById(req.params.id)

        if (!company) throw createError.NotFound('company with the given Id was not found.')

        if (!company.placementRounds.includes(req.body.round)) throw createError.BadRequest('invalid round name.')

        if (company.eligible.length === 0) throw createError.NotFound('Please create eligible list first.')

        company.eligible = conductRound(company.eligible, req.files.file.tempFilePath, req.body.round)
        await company.save()
        res.send(company)

    } catch (err) {
        next(err)
    }
})

router.get('/conduct-round/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const company = await Company
            .findById(req.params.id)
        if (!company) throw createError.BadRequest('company with the given ID was not found.')  
        res.send(company.eligible)
    } catch (error) {
        next(error)
    }
})

module.exports = router