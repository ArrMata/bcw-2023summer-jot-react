const express = require('express')
const cors = require('cors')
const app = express()

let notes = [
    {
        "title": "testing note",
        "content": "Jot down your thoughts!",
        "color": "#c10000",
        "id": 1
    },
    {
        "title": "new note!",
        "content": "Jot down your thoughts!",
        "color": "#2fe0ff",
        "id": 2
    },
    {
        "title": "new note?",
        "content": "Jot down your thoughts!",
        "color": "#f4f4f5",
        "id": 3
    }
]

app.use(express.json())
app.use(cors())

app.get('/api/notes', (req, res, next) => {
    return res.json(notes)
})

app.get('/api/notes/:noteId', (req, res, next) => {
    const noteId = Number(req.params.noteId)
    const foundNote = notes.find(note => note.id === noteId)
    if (!foundNote)
        return res.status(404).send(`no note found with id: ${noteId}`).end()
    return res.send(foundNote)
})

app.delete('/api/notes/:noteId', (req, res, next) => {
    const noteId = Number(req.params.noteId)
    notes = notes.filter(note => note.id !== noteId)

    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const note = req.body
    res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
