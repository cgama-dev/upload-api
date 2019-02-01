const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('./../config/multer')

const { query, getById, create, destroy } = require('./controller/post.controller')

router.get('/',  query)
router.post('/', multer(multerConfig).single('file'), create)
router.get('/:id', getById)
router.delete('/:id', destroy)

module.exports = router