// App Dependencies:
var path = require("path");
var fs = require("fs");

// Route
module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../../index.html"));
    });

    // GET Route: Notes
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../../notes.html"));
    });
    
    // GET API: Notes
    app.get("/api/notes", function(req, res) {
        var rawNotes = fs.readFileSync("db/db.json");
        noteData = JSON.parse(rawNotes);
        return res.json(noteData);
    })

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../../index.html"));
    });


    // POST API: Notes
    app.post("/api/notes", function(req, res) {
        var newNote = req.body;

        let id = noteData.length;
        newNote.id = id;

        noteData.push(newNote); 

        var stringNotes = JSON.stringify(noteData); 
        fs.writeFileSync("db/db.json", stringNotes); 

        return res.json(stringNotes); 
    })

    // DELETE Note
    app.delete("/api/notes/:id", function(req, res) {
        var deleteID = req.params.id;
        noteData.splice(deleteID, 1);

        for (var i = 0; i < noteData.length; i++) {
            noteData[i].id = i;
        }

        var stringNotes = JSON.stringify(noteData); 
        fs.writeFileSync("db/db.json", stringNotes); 

        return res.json(false);
    }); 
}