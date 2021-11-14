const XLSX = require('xlsx');
const { Student } = require('../models/student')

module.exports = (eligibleList, filePath, _roundName) => {
    
    const workbook = XLSX.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const Students = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    const passedStudents = Students.map(student => (student.USN.toLowerCase()))

    const el = eligibleList.map(student => {
        let updatedRounds = []
        if (passedStudents.includes(student.studentId)) {
            updatedRounds = student.rounds.map(round => {
                if (round.roundName === _roundName) {
                    return { ...round, status: 'success' }
                }
                return round
            })
        } else {
            updatedRounds = student.rounds.map(round => {
                if (round.roundName === _roundName) {
                    return { ...round, status: 'fail' }
                }
                return round
            })
        }
        return { ...student, rounds: updatedRounds }
    }).map(student => {
        let rIndex = 0
        let updatedRounds = []
        student.rounds.map(round => {
            if (round.status === 'fail') {
                return rIndex = rIndex + 1
            }
        })
        updatedRounds = student.rounds.map((round, index) => {
            if (rIndex != 0 && index > rIndex) {
                return { ...round, status: 'fail' }
            }
            return { ...round }
        })
        return { ...student, rounds: updatedRounds }
    }).map(student => {
        let rIndex = 0
        let updatedRounds = []
        student.rounds.map(round => {
            if (round.status === 'success') {
                return rIndex = rIndex + 1
            }
        })
        updatedRounds = student.rounds.map((round, index) => {
            if (rIndex != 0 && index < rIndex) {
                return { ...round, status: 'success' }
            }
            return { ...round }
        })
        return { ...student, rounds: updatedRounds }
    })
    return el
}