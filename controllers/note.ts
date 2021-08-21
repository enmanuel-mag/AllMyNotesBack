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
router.post('/', (req, res) => Note.schema.validate(req.body)
  .then(() => Note.create(req.body, (err, note) => {
    if (err) {
      console.log(err);
      return res.status(err.status).json(err);
    }
    return res.status(200).json({ note });
  }))
  .catch((err) => res.status(400).json({
    type: 'Validation Error',
    errors: err.errors,
    message: err.message
  }))
);

//Update note (like, dislike, comment)


//Delete note


export default router;