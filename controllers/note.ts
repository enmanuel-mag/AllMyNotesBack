import express from 'express';

import Note from '../models/note'

const router = express.Router();


//Get all notes by student type
router.get('/', (req, res) => {
  return Note.getNote(req.query, (err, notes) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ notes});
  });
});

//Upload new note


//Update note (like, dislike, comment)


//Delete note



export default router;