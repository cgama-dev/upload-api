
const firebase = require('firebase');

const { Storage } = require('@google-cloud/storage');

const format = require('util').format;

const crypto = require('crypto')

const storage = new Storage({
    projectId: "upload-posts-7f9b0"
});

const UploadStorageService = () => {
    const service = {
        upload: (file) => {
            return new Promise((resolve, reject) => {

                const bucket = storage.bucket('upload-posts-7f9b0.appspot.com');
                
                const fileUpload = bucket.file(file.originalname);

                const blobStream = fileUpload.createWriteStream({
                    metadata: {
                        contentType: file.mimetype
                    }
                });

                blobStream.on('error', err => {
                    resolve(false)
                });

                blobStream.on('finish', () => {

                    const publicUrl = format(
                        `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
                    );
                    resolve(publicUrl)
                });

                blobStream.end(file.buffer);
            })
        },
        crypto: (filename) => {
            return new Promise((resolve, reject) => {
                if (!filename) {
                    reject(false)
                }
                crypto.randomBytes(16, (err, hash) => {
                    const fileName = `${hash.toString('hex')}-${filename}`
                    resolve(fileName)
                })
            })
        }
    }

    return service
}

module.exports = UploadStorageService