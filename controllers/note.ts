import express from 'express';

import Note from '../models/note'

const router = express.Router();

router.get('/', (req, res) => {
  return Note.getNote(req.query, (err, notes) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ notes});
  });
});

export default router;