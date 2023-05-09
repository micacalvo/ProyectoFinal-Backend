import { usuariosDao } from "../daos/index.js"
import { isValidPassword } from '../utils/crypt.js'

export const postLoginController = async (req, res, next) => {
    const usuarios = await usuariosDao.getAll()  
    const user = usuarios.find(usuario => usuario.email === req.body.username) 
    
    if (!user) {
        req.session.message = 'Usuario no encontrado'
    } else {
        if (!isValidPassword(req.body.password, user.password)) {
            req.session.message = 'Password incorrecto'
        }
    }

    const userData = {
        id: user.id,
        email: user.email,
        nombre: user.name,
        edad: user.age,
        direccion: user.address,
        telefono: user.phone,
        foto: user.photo
    }

    req.session.route = 'login'
    req.session.passport = { user: userData }
    next();
}

export const getLoginController = (req, res) => {
    res.render('pages/login')
}