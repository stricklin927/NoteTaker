const fs = require("fs");
const  uuidv1 = require("uuidv1");
const util = require("util");

class noteOp {
    read() {
        return fs.readFileSync("db/db.json", "utf8", function(err, data){
        if (err) console.log(err);
        });
    }

    write(note) {
        return fs.writeFileSync("db/db.json", JSON.stringify(note));
    }

    getNote(){
        var notes = this.read() 
        let parsedNoteData = [].concat(JSON.parse(notes)); 
        return parsedNoteData;
    }
 
    addNote(note){
        const { title, body } = note;
 
        const temp = {title, body, id: uuidv1()};

        return this.getNote()
        .then((n) => [...n, temp])
        .then((newNote) => this.write(newNote))
        .then(() => temp);
    }

    deleteNote(id) {
        return this.getNote()
        .then((n) => n.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new noteOp();