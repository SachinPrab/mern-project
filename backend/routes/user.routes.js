import express from 'express';
import usersControllers from '../controllers/user.controllers.js';
import requireAuth from '../../middleware/requireAuth.js';

const router = express.Router();

// Auth routes
router.post('/signup', usersControllers.signup);
router.post('/login', usersControllers.login);
router.post('/logout', usersControllers.logout);
router.get('/check-auth', requireAuth, usersControllers.checkAuth);

export default router;

