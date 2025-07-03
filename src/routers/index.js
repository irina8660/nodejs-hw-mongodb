import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contact.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
