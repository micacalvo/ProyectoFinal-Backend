import { usuariosDao, productosDao } from "../daos/index.js"

export const getHomeController = async (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.session.passport.user);
        //verificamos si es admin o no
        if (req.session.passport.user === '645a89e50fe3dd37c4da148b') {
            res.redirect('/admin/home')
        }
        const nombre = (await usuariosDao.getAll(req.session.passport.user))[0].name
        global.productos = await productosDao.getAll()
        res.render('pages/home', {
            nombre: nombre,
            productos: global.productos,
            active: 'home' 
        })
    } else {
        res.redirect('/login')
    }
}
