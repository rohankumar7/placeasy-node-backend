// const { Student } = require('./student')
// const { Company } = require('./company')

// // google 5fbf482d2ae3b421586ea78d
// // informatica 5fbf48826f73332b505de4ca

// const eligible = async (companyId) => {

//     const company = await Company.findById(companyId)
//     const student = await Student.find()

//     const filteredStudent = student
//         .filter(student =>
//             (
//                 company.branches.includes(student.branch) &&
//                 (
//                     student.academic._10th >= company.requirement._10th &&
//                     student.academic._12th >= company.requirement._12th &&
//                     student.academic.cgpa >= company.requirement.cgpa
//                 )
//             )
//         )
//         .filter(student => {
//             if (company.girlsOnly)
//                 return student.gender === 'female' ? true : false
//             return true
//         })
//         .filter(student => {
//             if (company.diplomaAllowed === false)
//                 return !student.isDiploma
//             return true
//         })

//     const rounds = company.placementRounds.map(round => ({ roundName: `${round}`, status: 'pending' }))
//     let eligible = []
//     eligible = filteredStudent.map(student => ({ studentId: `${student._id}`, name: `${student.fullName}`, universityNumber: `${student.universityNumber}`, rounds }))
//     // console.log(eligible)
//     const aptitude = ['2sd16cs015', '2sd16cs001', '2sd16cs045']
//     const pRounds = eligible.map(student => {
//         let updatedRounds = []
//         if (aptitude.includes(student.universityNumber)) {
//             updatedRounds = student.rounds.map(round => {
//                 if (round.roundName === 'technical') {
//                     return { ...round, status: 'success' }
//                 }
//                 return { ...round }
//             })
//         } else {
//             updatedRounds = student.rounds.map(round => {
//                 if (round.roundName === 'technical') {
//                     return { ...round, status: 'fail' }
//                 }
//                 return { ...round }
//             })
//         }
//         return { ...student, rounds: updatedRounds }
//     }).map(student => {
//         let rIndex = 0
//         let updatedRounds = []
//         student.rounds.map(round => {
//             if (round.status === 'fail') {
//                 return rIndex = rIndex + 1
//             }
//         })
//         updatedRounds = student.rounds.map((round, index) => {
//             if (rIndex != 0 && index > rIndex) {
//                 return { ...round, status: 'fail' }
//             }
//             return { ...round }
//         })
//         return { ...student, rounds: updatedRounds }
//     }).map(student => {
//         let rIndex = 0
//         let updatedRounds = []
//         student.rounds.map(round => {
//             if (round.status === 'success') {
//                 return rIndex = rIndex + 1
//             }
//         })
//         updatedRounds = student.rounds.map((round, index) => {
//             if (rIndex != 0 && index < rIndex) {
//                 return { ...round, status: 'success' }
//             }
//             return { ...round }
//         })
//         return { ...student, rounds: updatedRounds }
//     })
//     //console.log(pRounds)
//     const placed = pRounds.filter(student => {
//         const lastRound = student.rounds.find((round,index) => {
//             if(index === student.rounds.length - 1){
//                 return round
//             }
//         })
//         if(lastRound.status === 'pending'){
//             return student
//         }
//     })
//     console.log(placed)
// }
// eligible('5fbf48826f73332b505de4ca')



// {
//     "_id" : "2sd16cs073",
//         "fullName" : "rohan kumar",
//         "email" :"rohankumar08041998@gmail.com",
//         "password" : "1234",
//         "contactNumber" : "6360710657",
//         "isDiploma" : false,
//         "batch" : "2020",
//         "gender" : "male",
//         "branch" : "CS Engineering",
//         "academic" : {
//             "_10th" : 71,
//             "_12th" : 65,
//             "semesters" : [
//                 { "semester" : 1 , "sgpa" : 7.5 },
//                 { "semester" : 2 , "sgpa" : 8.6 },
//                 { "semester" : 3 , "sgpa" : 7.8 },
//                 { "semester" : 4 , "sgpa" : 8.5 },
//                 { "semester" : 5 , "sgpa" : 8.76 },
//                 { "semester" : 6 , "sgpa" : 9.13 }
//             ]
//         }
// }