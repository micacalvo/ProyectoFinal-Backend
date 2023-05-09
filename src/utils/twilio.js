import twilio from 'twilio'
import { authToken, accountSid, twilioMessagingServiceSid, twilioWhatsAppPhoneNumber, adminWhatsAppPhoneNumber } from '../config/config.js'
import { logger } from './logger.js'

const client = twilio(accountSid, authToken)

export const sendSMSToUser = async (newUser) => {

    const msg = `NUEVO USUARIO REGISTRADO
    NOMBRE: ${newUser.name}
    DIRECCION: ${newUser.address}
    EDAD: ${newUser.age}
    TELEFONO: ${newUser.phone}
    EMAIL: ${newUser.email}`

    try {
        const message = await client.messages.create({
            body: msg,
            from: '+15076688868',
            to: adminPhoneNumber               
        })
        logger.info(`SMS cart send`, message)

    } catch (error) {
        logger.error(error)
    }
}

export const sendWhatsAppNewUser = async (newUser) => {

    const msg = `NUEVO USUARIO REGISTRADO
    NOMBRE: ${newUser.name}
    DIRECCION: ${newUser.address}
    EDAD: ${newUser.age}
    TELEFONO: ${newUser.phone}
    EMAIL: ${newUser.email}`

    try {
        const message = await client.messages.create({
            body: msg,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${adminWhatsAppPhoneNumber}`
        })
        logger.info('WhatsApp new user send', message)

    } catch (error) {
        logger.error('Error al enviar', error)
    }
}

export const sendMessageNewCart = async (name, email, cart) => {  

    let listaProductosCarrito = `NUEVO CARRITO de ${name} ( email: ${email} ) \n`
    cart.productos.forEach(element => {
        listaProductosCarrito += `${element.title}   $${element.price} x ${element.cantidad} \n`
    });

    const msg = listaProductosCarrito + 'Total: $' + cart.total

//ENVIO DE WHATSAPP
    try {
        const message = await client.messages.create({
            body: msg,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${adminWhatsAppPhoneNumber}`
        })
        logger.info('WhatsApp new cart send', message)
    } catch (error) {
        logger.error('Error al enviar whatsapp new cart', error)
    }
//ENVIO DE SMS
    try {
        const message = await client.messages.create({
            body: msg,
            from: '+15076688868',
            to: adminPhoneNumber
        })

        logger.info('SMS new cart send', message)

    } catch (error) {
        logger.error('Error al enviar SMS new cart', error)
    }
}


