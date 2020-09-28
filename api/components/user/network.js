const express = require('express')
const router = express.Router()

const response = require('../../../network/response')
const Controller = require('./index')

//Routes
router.get('/', list)
router.get('/:id', get)
router.get('/', upsert)
router.get('/', upsert)

//Internal functions
function list(req, res) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500)
        })
}

function get(req, res) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500)
        })
}

function upsert(req, res) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500)
        })
}

// router.get('/:id', function (req, res) {
//     Controller.remove(req.params.id)
//         .then((user) => {
//             response.success(req, res, user, 200)
//         })
//         .catch((err) => {
//             response.error(req, res, err.message, 500)
//         })
// })

module.exports = router