import async from 'async';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import db from '../database';
import { Callback } from '../interfaces';

class Note {

  static get(params: any, callback: Callback) {
    console.log('Params:', params);
    const notes = [
      {
        title: 'Note Title',
        content: 'Note Content',
        author: 'Enmanuel'
      }
    ];
    return callback(null, notes);
  }

  static add(note: any, callback: Callback) {
    note = {
      ...note,
      noteId: uuid(),
      createdAt: firebase.firestore.Timestamp.now()
    }
    console.log('Note data: ', note);

    return async.waterfall([
      (cb: Callback) => db
        .collection('notes')
        .doc(note.noteId)
        .set(note)
        .then(() => cb(null, note))
        .catch(err => cb({
          status: 500,
          error: err,
          message: 'Error adding note'
        }))
    ], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
}

export default Note;
