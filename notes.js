const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes=notes.filter((note)=>note.title===title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title taken: "' + title + '"'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter((note) => note.title !== title)

    if (updatedNotes.length === notes.length) {
        console.log(chalk.red('Not found!'))
    } else {
        saveNotes(updatedNotes)
        console.log(chalk.green('Note removed!'))
    }
}

const listNotes = (withBody) => {
    const notes = loadNotes()

    if (notes.length === 0) {
        console.log(chalk.red.inverse('No notes found'))
    } else {
        console.log(':::YOUR NOTES:::\n')

        if (withBody) {
            notes.forEach((note) => {
                console.log(chalk.blue.inverse(note.title))
                console.log(note.body + '\n')
            })
        } else {
            notes.forEach((note) => {
                console.log(chalk.blue.inverse(note.title) + '\n')
            })
        }
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const match = notes.find((note) => note.title === title)

    if (match) {
        console.log(chalk.blue.inverse(match.title))
        console.log(match.body)
    } else {
        console.log(chalk.red('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}