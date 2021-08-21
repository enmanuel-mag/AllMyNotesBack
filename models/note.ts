import { Callback } from '../interfaces'

class Note {

  static getNote(params: any, callback: Callback) {
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

}

export default Note;
