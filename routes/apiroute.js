const router = require("express").Router();
const noteOp = require("../db/note");
const { route } = require("./htmlroute");


router.get("/notes", (req, res) => {
    noteOp.getNote()
    .then((n) => res.json(n))
});

router.post("/notes", (req,res) => {
    noteOp.addNote(req.body)
    .then((n) => res.json(n))
})

module.exports  = router;