import { usuariosDao } from '../daos/index.js';
import { logger } from '../utils/logger.js';

export const getChat = async (req, res) => {
  if (req.isAuthenticated()) {
    const user = await usuariosDao.getAll(req.session.passport.user);
    const userData = {
        id: user[0].id,
        email: user[0].email,
    }
    res.render('pages/chat.ejs', { email: userData.email, active: 'chat'});
  } else {
    res.render('pages/login.ejs');
  }
};
