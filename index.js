const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const GoogleSpreadSheet = require('google-spreadsheet')
const credentials = require('./YOUR_GOOGLE_DRIVE_API_JSON_HERE')
const { promisify } = require('util')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

//configurações
const sendGridKey = 'YOUR_SENDGRID_API_KEY_HERE_WITH(process.env.SENDGRID_API_KEY)'
const docId = 'YOUR_GOOGLE_DOC_ID_HERE'
const worksheetIndex = 0


app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.render('home')
})

app.post('/', async (request, response) => {
    try {
        const doc = new GoogleSpreadSheet(docId)
        await promisify(doc.useServiceAccountAuth)(credentials)
        const info = await promisify(doc.getInfo)()
        const worksheet = info.worksheets[worksheetIndex]
        await promisify(worksheet.addRow)({
            name: request.body.name,
            email: request.body.email,
            userAgent: request.body.userAgent,
            userDate: request.body.userDate,
            issueType: request.body.issueType,
            source: request.query.source || 'direct',
            howToReproduce: request.body.howToReproduce,
            expectedOutput: request.body.expectedOutput,
            receivedOutput: request.body.receivedOutput
        })

        // If the bug is CRITICAL
        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        if (request.body.issueType === 'CRITICAL') {
            
            sgMail.setApiKey(sendGridKey);
            const msg = {
                to: 'YOUR_EMAIL_HERE',
                from: 'YOUR_EMAIL_HERE',
                subject: 'BUG CRÍTICO REPORTADO',
                text: `O usuario ${request.body.name} reportou um problema.`
                ,
                html: `<strong>O usuario ${request.body.name} reportou um problema.</strong>`,
            };
            await sgMail.send(msg);
        }
        response.render('sucesso')
    } catch (err) {
        response.send('Erro ao enviar o formulário')
        console.log(err)
    }
})

app.listen(3000, (err) => {
    if (err) {
        console.log('Aconteceu um erro', err)
    } else {
        console.log('BugTracker rodando na porta 3000')
    }
})