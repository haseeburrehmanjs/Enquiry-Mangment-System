import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.cookie('fullName', 'haseeb ur rehamn js')
    res.send('cookies saved sucessfully')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})