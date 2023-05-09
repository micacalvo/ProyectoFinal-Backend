import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import session from 'express-session'
import { mongoSession } from './session/mongoSession.js'
import passport from 'passport'
import { login } from './routes/login.js'
import { register } from './routes/register.js'
import { error } from './routes/error.js'
import { home } from './routes/home.js'
import { cart } from './routes/cart.js'
import { logout } from './routes/logout.js'
import { profile } from './routes/profile.js'
import { chat } from './routes/chat.js'
import {adminWebRouter} from './routes/admin.js'
import { apiProducts } from './api/products.js'
import { logger } from './utils/logger.js'
import chatWs from "./routes/ws/chat.js";
import productsWs from "./routes/ws/home.js";
import cartWs from "./routes/ws/cart.js";
import adminHomeWs from "./routes/ws/admin-home.js";
import adminChatWs from "./routes/ws/admin-chat.js";

function server(){
const app = express()
const httpServer = new HttpServer(app)

//Configuracion de Socket.io
const io = new Socket(httpServer)

io.on("connection", async (socket) => {
    chatWs(socket);
    productsWs(socket);
    cartWs(socket);
    adminHomeWs(socket);
    adminChatWs(socket);
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Configuracion EJS
app.set('views', './views')
app.set('view engine', 'ejs')

//Session
app.use(session(mongoSession))

//PassPORT
app.use(passport.initialize())
app.use(passport.session())

//RUTAS
app.use('/login', login)
app.use('/logout', logout)
app.use('/register', register)
app.use('/error', error)
app.use('/home', home)
app.use('/cart', cart)
app.use('/profile', profile)
app.use('/chat', chat)
app.use('/api/products', apiProducts)
app.use('/admin', adminWebRouter)

app.get('*', (req, res) => {
    res.redirect('/login')
})

return {
    //Configuracion Server
    listen: port => new Promise((resolve, reject) => {
        const connectedServer = httpServer.listen(port, () => {
            resolve(connectedServer)
        })
        connectedServer.on('error', error => {
            reject(error)
        })
    })
}
}

export {server}