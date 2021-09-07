/*
 * Created Date: Friday September 3rd 2021 9:53:44 pm
 * Author: Andrés X. Vargas
 * -----
 * Last Modified: Friday September 3rd 2021 9:53:46 pm
 * Modified By: the developer known as Andrés X. Vargas at <axvargas@fiec.espol.edu.ec>
 * -----
 * Copyright (c) 2021 MattuApps
 */
import express from 'express';

import Note, { schema as NoteSchema } from '../models/note';

const router = express.Router();


//Get all notes by student type
router.get('/', (req, res) => NoteSchema.get.validate(req.query)
  .then(() => Note.get(req.query, (err, notes) => {
    if (err) {
      return res.status(err.status).json(err);
    }
    return res.status(200).json({ notes });
  }))
  .catch(err => {
    console.log(err);
    return res.status(400).json({
      type: 'Validation Error',
      errors: err.errors,
      message: err.message
    });
  }));

//Upload new note
router.post('/', (req, res) => NoteSchema.create.validate(req.body)
  .then(() => Note.create(req.body, (err, note) => {
    if (err) {
      console.log(err);
      return res.status(err.status).json(err);
    }
    return res.status(200).json({ code: 'Ok',
      note });
  }))
  .catch((err) => {
    console.log(err);
    return res.status(400).json({
      type: 'Validation Error',
      errors: err.errors,
      message: err.message
    });
  })
);

//Update note
router.put('/:id', async (req, res) => {
  const noteId = req.params.id;
  try {
    await NoteSchema.update.validate(req.body);
  } catch (error: any) {
    return res.status(400).json({
      type: 'Validation Error',
      errors: error.errors,
      message: error.message
    });
  }
  try {
    const updatedNote = await Note.update(noteId, req.body);
    return res.status(200).json({ code: 'Successfully updated',
      updatedNote });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating note',
      error
    }); 
  }
});

//Delete note
router.delete('/:id', async (req, res) => {
  const noteId = req.params.id;
  try {
    const deletedNote = await Note.delete(noteId);
    return res.status(200).json({ code: 'Successfully deleted',
      deletedNote });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating note'
    }); 
  }
});


export default router;
