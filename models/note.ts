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
  delete: yup.object().shape({
    delete: yup.boolean().required()
  })
};

class Note {

  static get(params: any, callback: Callback) {
    console.log('Params:', params);
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

}

export default Note;
