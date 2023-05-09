import { usuariosDao } from '../daos/index.js';
import { logger } from '../utils/logger.js';

export const getProfile = async (req, res) => {
  if (req.isAuthenticated()) {
    const user = await usuariosDao.getAll(req.session.passport.user);

    const userData = {
        id: user[0].id,
        email: user[0].email,
        nombre: user[0].name,
        edad: user[0].age,
        direccion: user[0].address,
        telefono: user[0].phone,
        avatar: user[0].photo
    }
    logger.info(userData);
    res.render('pages/profile', {
        name: userData.nombre,
        email: userData.email,
        age: userData.edad,
        address: userData.direccion,
        phone: userData.telefono,
        avatar: userData.avatar,
      active: 'profile',
    });
  } else {
    res.redirect('/login');
  }
};