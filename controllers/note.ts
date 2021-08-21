import express from 'express';

import Note from '../models/note';

const router = express.Router();


//Get all notes by student type
router.get('/', (req, res) => {
  return Note.get(req.query, (err, notes) => {
    if (err) {
      return res.status(err.status).json(err);
    }
    return res.status(200).json({ notes });
  });
});

//Upload new note
router.post('/', (req, res) => {
  return Note.add(req.body, (err, note) => {
    if (err) {
      return res.status(err.status).json(err);
    }
    return res.status(200).json({ note });
  });
});

//Update note (like, dislike, comment)


//Delete note


export default router;