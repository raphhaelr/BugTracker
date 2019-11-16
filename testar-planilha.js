const GoogleSpreadSheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')
const {promisify} = require('util')

const addRowToSheet = async()=>{
    const doc = new GoogleSpreadSheet('1sR0XU8FQbArem7hll115h-Gq810U8hwvpNg0WHJgcIY')
    await promisify(doc.useServiceAccountAuth)(credentials)
    console.log('Planilha aberta')
    const info = await promisify (doc.getInfo)()
    const worksheet = info.worksheets[0]
    await promisify(worksheet.addRow)({name: 'Raphael', email: 'Teste1'})

}
addRowToSheet()
/*
const doc = new GoogleSpreadSheet('1sR0XU8FQbArem7hll115h-Gq810U8hwvpNg0WHJgcIY')
doc.useServiceAccountAuth(credentials, (err) =>{
    if(err){
        console.log('Não foi possível abrir planilha')
    } else {
        console.log('Foi possível abrir a planilha')
        doc.getInfo((err, info)=>{
            const worksheet = info.worksheets[0]
            worksheet.addRow({name: 'Raphael', email: 'Teste'}, err => 
            console.log('linha inserida'))
        })
    }   
})*/

