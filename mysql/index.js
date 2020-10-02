const express = require('express')
const bodyarser = require('body-parser')

const config = require('../config')
const router = require('./network')

const app = express()

app.use(bodyarser.json())

//Routes
app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('Servicio de mysql escuchando en el puerto', config.mysqlService.port);
})