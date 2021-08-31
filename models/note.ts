import * as yup from 'yup';
import async from 'async';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import db from '../database';
import { Callback } from '../interfaces';

export const schema = {
  create: yup.object().shape({
    title: yup.string().required(),
    authorId : yup.number().required(),
    authorName : yup.string().required(),
    content: yup.string().required(),
    tags: yup.array().of(yup.string()).required(),
    shared : yup.array().of(yup.number()).required(),
    links : yup.array().of(yup.object().shape({
      label : yup.string().required(),
      url : yup.string().required()
    })),
  }),
  update: yup.object().shape({
    title: yup.string(),
    authorId : yup.number(),
    authorName : yup.string(),
    content: yup.string(),
    tags: yup.array().of(yup.string()),
    shared : yup.array().of(yup.number()),
    links : yup.array().of(yup.object().shape({
      label : yup.string(),
      url : yup.string()
    })),
  }),
};

class Note {

  static get(params: any, callback: Callback) {
    return async.waterfall([
      (cb: Callback) => db
        .collection('notes')
        .get()
        .then((querySnapshot) => {
          const data: Array<any> = [];
          querySnapshot.forEach((doc)=>{
            data.push(doc.data());
          });
          cb(null, data);
        })
        .catch(error => cb({
          error,
          status: 500,
          message: 'Error getting all notes'
        }))
    ], (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    });
  }

  static create(note: any, callback: Callback) {
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
        .catch(error => cb({
          error,
          status: 500,
          message: 'Error adding note'
        }))
    ], (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    });
  }

  static async update(noteId: string, note: any) {
    note = {
      ...note,
      updatedAt: firebase.firestore.Timestamp.now()
    };
    console.log('Note id: ', noteId);
    console.log('Note update data: ', note);
    let document = db.collection('notes').doc(noteId);
    await document.update(note);
    return (await document.get()).data();
  }

  static async delete(noteId: string) {
    console.log('Note id: ', noteId);
    let document = db.collection('notes').doc(noteId);
    let deletedNote = await document.get();
    await document.delete();
    return deletedNote.data();
  }
}

export default Note;
