import { Router } from 'express'
import { getLogoutController } from '../controller/logout.Controller.js'

export const logout = Router();

logout.get('/' ,  getLogoutController)
