const express = require('express')
const fileUpload = require('express-fileupload')
const pageNotFound = require('./middleware/pageNotFound')
const error = require('./middleware/error')

const app = express()
require('./config/database')()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use('/api/student', require('./routes/student.route'))
app.use('/api/company', require('./routes/company.route'))
app.use('/api/auth/student', require('./routes/auth.student.route'))
app.use('/api/auth/admin', require('./routes/auth.admin.route'))
app.use(pageNotFound)
app.use(error)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
})