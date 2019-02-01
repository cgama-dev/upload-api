require("dotenv").config();

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const router = require('./routes')

const port = process.env.PORT || 5000


mongoose.connect(process.env.MONGODB, {
    useCreateIndex: true,
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', () => console.log('Erro ao conectar ao banco'))
db.once('open', () => console.log(`Conexão estabelecida com sucesso ${new Date()}`))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/posts', router)

app.listen(port, () => console.log(`Api uploads rodando na porta:${port}`))