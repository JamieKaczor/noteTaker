// look up uuid (util.promisify)- use ID in database
const util = require('util');
const fs = require('fs');
const { v4: uuidv4} = require('uuid')

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {

read(){
    return readFileAsync('./db/db.json', 'utf8')
}

write(note){
    return writeFileAsync('./db/db.json', JSON.stringify(note))
}

getNotes() {
    return this.read().then((notes) => {
         //parse notes to return them as parsed notes
         let parsedNotes
         try{
             parsedNotes=[].concat(JSON.parse(notes))
         } catch(error){
             parsedNotes=[]
         }
return parsedNotes

    })
}

addNote(note) {
    const { title, text } = note;
    const uniqueNote = { title, text, id: uuidv4() }

    return this.getNotes()
    .then((notes)=>[...notes, uniqueNote])
    .then((newNotes)=>this.write(newNotes))
    .then(()=>uniqueNote)
}


deleteNote(id) {
    return this.getNotes() 
    .then((notes)=> notes.filter(
        (note)=> note.id !== id))
        .then((filterNotes) => this.write(filterNotes))

}





}


module.exports = new Store();