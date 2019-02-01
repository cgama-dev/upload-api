const multer = require('multer')

const path = require('path')

const crypto = require('crypto')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {

            crypto.randomBytes(16, (err, hash) => {

                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                cb(null, fileName)
            })
        }
    }),
    dev: multer.memoryStorage()
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    storage: storageTypes['dev'],
    
    limits: {
        filesize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMines = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]
        //Verifica se a extensão do arquivo é está dentro dos arquivos válidos
        if (allowedMines.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type"))
        }
    }
}
