const express = require('express')
const router = express.Router()

const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')

//Routes
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secure('update'), upsert)

//Internal functions
function list(req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200)
        })
        .catch(next)
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(next)

}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(next)
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