module.exports = (company,students) => {

    const filteredStudent = students
        .filter(student =>
            (
                company.branches.includes(student.branch) &&
                (
                    student.academic._10th >= company.requirement._10th &&
                    student.academic._12th >= company.requirement._12th &&
                    student.academic.cgpa >= company.requirement.cgpa
                )
            )
        )
        .filter(student => {
            if (company.girlsOnly)
                return student.gender === 'female' ? true : false
            return true
        })
        .filter(student => {
            if (company.diplomaAllowed === false)
                return !student.isDiploma
            return true
        })
    console.log(filteredStudent)
    const rounds = company.placementRounds.map(round => ({ roundName: `${round}`, status: 'pending' }))
    let eligible = []
    eligible = filteredStudent.map(student => ({ studentId: `${student._id}`, rounds }))
    console.log(eligible)
    return eligible
}