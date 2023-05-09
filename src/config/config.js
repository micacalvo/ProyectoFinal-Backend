import * as dotenv from 'dotenv';
import minimist from 'minimist';

dotenv.config()

//Configuro el parametro de minimist para el puerto del servidor
const argv = minimist(process.argv.slice(2), 
    {alias:
        {p: 'port',
        m: 'mode',
        a: 'auth'}, 
    default:
        {port: 8080,
        mode: 'FORK',
        auth: 'NO_AUTH',
        NODE_ENV: 'PROD'}
    })

//Esta función la debo usar en la ruta info
function getSpecs() {
    return {
        env: {description: 'entorno de ejecucion', value: argv.NODE_ENV },
        puerto: {description: 'puerto', value: argv.port },
        modo: {description: 'modo', value: argv.mode },
        argumentos: {description: 'argumentos de entrada', value: process.argv.slice(2).join(', ') },
        plataforma: {description: 'plataforma', value: process.platform },
        versionNode: {description: 'version de node', value: process.version },
        memoriaReservada: {description: 'memoria total reservada (MB)', value: parseInt(process.memoryUsage().rss / 1024 / 1024) },
        rutaEjecucion: {description: 'path de ejecucion del entorno', value: process.execPath },
        idProceso: {description: 'id de proceso', value: process.pid },
        directorioProyecto: {description: 'path del proyecto', value: process.cwd() },
    }
}

//Envio de mensajes y emails
export const userMailAdmin = process.env.USER_MAILADMIN
export const passMailAdmin = process.env.PASS_MAILADMIN
export const twilioMessagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
export const accountSid = process.env.TWILIO_ACCOUNT_SID
export const authToken = process.env.TWILIO_AUTH_TOKEN
export const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
export const twilioWhatsAppPhoneNumber = process.env.TWILIO_WHATSAPP_PHONE_NUMBER
export const adminWhatsAppPhoneNumber = process.env.ADMIN_WHATSAPP_PHONE_NUMBER
export const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER

export const urlMongo = process.env.MONGODB_REMOTE
export const secretSessionMongo = process.env.SECRET_SESSION_MONGO
export default {
    getSpecs,
    NODE_ENV: argv.NODE_ENV,
    port: argv.port,
    mode: argv.mode,
    auth: argv.auth,
}



