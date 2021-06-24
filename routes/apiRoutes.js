
const router = require('express').Router();
const store = require('../db/store');

// create a route that responds with all notes coming from the database
// Get note info
router.get('/notes', (req, res) => {
    store.getNotes()
        .then((notes) => {
            return res.json(notes)
        })
        .catch((err) => res.status(500).json(err))
})

// Post Notes
router.post('/notes', (req, res) => {
    store.addNote(req.body)
    .then((note) => {
        res.json(note)
    }) 
    .catch((err) => res.status(500).json(err))
})

// Delete Notes
router.delete('/notes/:id', (req, res) => {
    store.deleteNote(req.params.id)
    .then(() => {
         res.json({ ok: true })
    }) 
    .catch((err) => res.status(500).json(err))
})
// localhost:/3000/api/notes


module.exports = router;