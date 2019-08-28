const fs=require('fs')
const chalk=require('chalk')
const yargs=require('yargs')
const notes=require('./notes.js')

//customize yargs version
yargs.version('1.2.0')

//create add command
yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'Lists all the notes',
    builder: {
        wb: {
            describe: 'Lists all the notes with their bodies',
            demandOption: false
        }
    },
    handler(argv){
        notes.listNotes(argv.wb)
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'Shows a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse()

//console.log(yargs.argv)
