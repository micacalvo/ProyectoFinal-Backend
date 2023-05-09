import cluster from 'cluster';
import { cpus } from 'os'

import { server } from './main.js'
import config from '../src/config/config.js'


if (config.mode == 'CLUSTER' && cluster.isPrimary) {

    const numCPUs = cpus().length
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })

} else {

    process.on('exit', code => {
        console.log('Salida con código de error: ' + code)
    })

    const app = server()
    try {
        const connectedServer = await app.listen(config.port)
        console.log(`proceso #${process.pid} escuchando en el puerto ${connectedServer.address().port}`)
    } catch (error) {
        console.log(`Error en servidor ${error}`)
    }
}