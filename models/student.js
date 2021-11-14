const mongoose = require('mongoose')
const bcypt = require('bcrypt')
const { Schema } = mongoose
require('dotenv').config()
require('./company')
// mongoose.connect(`mongodb+srv://rohan123:rohan123@cluster0.zgwtv.mongodb.net/storybooks?retryWrites=true&w=majority`, {
//         useCreateIndex: true,
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useFindAndModify: true
//     }).then(()=>{
//         console.table('connected')
//     })
// mongoose.connection.on('connected', () => {
//     console.log('connected to database.')
// })
const academicSchema = new Schema({
    _10th: {
        type: Number,
        required: true
    },
    _12th: {
        type: Number,
        required: true
    },
    semesters: [
        {
            semester: {
                type: Number,
                required: true
            },
            sgpa: {
                type: Number,
                required: true
            }
        }
    ],
    cgpa: {
        type: Number
    }
})
const notificationSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true
    }
})
const studentSchema = new Schema({
    _id: String,
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    isDiploma: {
        type: Boolean,
        required: true,
        default: false
    },
    batch: {
        type: String,
        required: false
    },
    branch: {
        type: String,
        required: true,
        enum: ['CS Engineering', 'IS Engineering', 'E&C Engineering', 'E&E Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Chemical Engineering']
    },
    academic: {
        type: academicSchema
    },
    notification: [{
        type: notificationSchema,
        default :[]
    }],
    placed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        default : []
    }]
})
studentSchema.pre('save', async function(next){

    let totalSgpa = 0

    this.academic.semesters.map(semester => (totalSgpa = totalSgpa + semester.sgpa))
    this.academic.cgpa = (totalSgpa / this.academic.semesters.length).toFixed(2)
    
    try {
        const hashed = await bcypt.hash(this.password,10)
        this.password = hashed
        next()   
    } catch (error) {
        next(error)
    }

})
studentSchema.methods.comparePassword = async function(password){
    try {
        return await bcypt.compare(password,this.password)
    } catch (error) {
        throw error
    }
}
const Student = mongoose.model('Student', studentSchema)
exports.Student = Student

// const create = async () => {
//     let student = new Student({
//         _id : '2sd16is088',
//         fullName : 'tarun k',
//         email :'tk08041998@gmail.com',
//         password : '12345',
//         contactNumber : '6360710657',
//         isDiploma : false,
//         batch : '2020',
//         gender : 'male',
//         branch : 'IS Engineering',
//         academic : {
//             _10th : 71,
//             _12th : 65,
//             semesters : [
//                 { semester : 1 , sgpa : 7.5 },
//                 { semester : 2 , sgpa : 8.6 },
//                 { semester : 3 , sgpa : 7.8 },
//                 { semester : 4 , sgpa : 9.5 },
//                 { semester : 5 , sgpa : 8.76 },
//                 { semester : 6 , sgpa : 9.13 }
//             ]
//         }
//     })
//     student = await student.save()
//     console.log(student)
// }
// create()
