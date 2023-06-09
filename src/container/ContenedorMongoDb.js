import mongoose from 'mongoose'
import transformMongoObject from '../utils/objectUtils.js'
import { urlMongo } from '../config/config.js'
import { logger } from '../utils/logger.js'

await mongoose.connect(urlMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => logger.info('Base de datos mongo conectada'))
    .catch(error => logger.error("Base de datos mongo no conectada"))


class ContenedorMongoDb {
    constructor(nombreCollection, esquema) {
        this.collection = mongoose.model(nombreCollection, esquema)
    }

    async getById(id) {
        try {
            const res = await this.collection.find({ _id: id })

            return transformMongoObject(res)
        } catch (error) {
            logger.error(error)
            return false
        }
    }

    async getAll() {
        try {
            const res = await this.collection.find({})
            if (res.length == 0) {
                return res
            } else {
                return transformMongoObject(res)
            }
        } catch (error) {
            logger.error(error)
            return false
        }
    }

    async save(elemento) {
        try {
            const res = await this.collection.create(elemento)
            return transformMongoObject(res)
        } catch (error) {
            logger.error(error)
            return false
        }
    }

    async update(id, newElemento) {
        try {
            await this.collection.updateOne({ _id: id }, { $set: newElemento })
            return true
        } catch (error) {
            logger.error(error)
            return false
        }
    }

    async deleteById(id) {
        try {
            const res = await this.collection.deleteOne({ _id: id })
            return res.acknowledged
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteAll() {
        try {
            const res = await this.collection.deleteMany()
            return res.acknowledged
        } catch (error) {
            logger.error(error)
            return false
        }
    }
}

export default ContenedorMongoDb
