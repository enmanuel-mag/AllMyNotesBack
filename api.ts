import express from 'express';
import note from './controllers/note';

const router = express.Router();

router.use('/note', note);

export default router;
