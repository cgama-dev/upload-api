const PostModel = require('./../models/post.model')

const UploadStorageService = require('./../services/upload-storage.service')()

const query = async (req, res) => {
    try {

        const posts = await PostModel.find({})

        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({ message: 'Erro ao buscar todos os posts' })

    }
}
const getById = async (req, res) => {
    try {

        const idPost = req.params.id;

        const post = await PostModel.findById(idPost)

        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({ message: 'Erro ao buscar post' })

    }
}

const create = async (req, res) => {

    try {

        let { originalname: name, size, filename: key, url = "" } = req.file

        if (process.env.STORAGE_TYPE === 'dev') {

            key = await UploadStorageService.crypto(req.file.originalname)

            let file = { ...req.file, originalname: key }

            url = await UploadStorageService.upload(file)
        }

        const post = await PostModel.create({
            name,
            size,
            key,
            url: ((!req.file.path) ? url : req.file.path)
        })

        return res.status(200).send(post)
    } catch (error) {
        res.status(400).send({ message: 'Erro ao criar post', error: error })
    }
}



const destroy = async (req, res) => {
    try {

        const idPost = req.params.id;

        const post = await PostModel.findByIdAndRemove(idPost)

        res.status(200).send(post)

    } catch (error) {
        res.status(400).send({ message: 'Erro ao deletar post' })

    }
}

module.exports = {
    query,
    getById,
    create,
    destroy
}