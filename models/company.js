const mongoose = require('mongoose')
const { Schema } = mongoose
require('./student')

const companySchema = new Schema({
    companyName: {
        type: String,
    },
    placementRounds: {
        type: Array,
        default: []
    },
    girlsOnly: {
        type: Boolean,
    },
    diplomaAllowed: {
        type: Boolean,
    },
    requirement: {
        _10th: {
            type: Number,
        },
        _12th: {
            type: Number,
        },
        cgpa: {
            type: Number,
        },
        default : {}
    },
    jobDescription: {
        profile: {
            type: String,
        },
        package: {
            type: String,
        },
        location: {
            type: String,
        },
        default : {}
    },
    year: {
        type: String,
    },
    branches: [{
        type: String,
    }],
    eligible: {
        type : Array,
        default : []
    },
    status : {
        type : String,
        default : 'draft',
        enum : ['draft','complete']
    }
}, {timestamps : true },{ minimize: false })

const Company = mongoose.model('Company', companySchema)
exports.Company = Company

// async function createComp() {
//     let company = new Company({
//         companyName: 'Mercedes Benz',
//         branches: ['CS Engineering','IS Engineering'],
//         requirement: {
//             _10th: 60,
//             _12th: 60,
//             cgpa: 6.0
//         },
//         girlsOnly : true,
//         jobDescription: { profile : 'R&D', location : 'Hydrabad'},
//         year: '2020',
//         placementRounds: ['aptitude', 'HR']
//     })
//     company = await company.save()
//     console.log(company)
// }
// createComp()

// async function find(cid){
//     const company = await Company.find({_id : cid}).populate('eligible.studentId', 'fullName email branch rounds')
//     const eligible = company[0].eligible
//     console.log(eligible)
// }
// find('5fbf2126f7ca113bf8b8a1e1')
