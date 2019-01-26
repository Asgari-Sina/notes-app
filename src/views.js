import moment from 'moment'
import { sortNotes, getNotes } from './notes'
import { getFilters } from './filters'


// Generate the DOM structure for a note
const generateNoteDOM = function (note) {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    
    // setup the note title
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')

    noteEl.appendChild(textEl)

    noteEl.setAttribute('href', `/note.html#${note.id}`)
    noteEl.classList.add('list-item')

    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}


// Render application notes
const renderNotes = function() {
    const notesEl = document.querySelector("#notes")
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filterdNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesEl.innerHTML = ''
    
    if (filterdNotes.length > 0) {
        filterdNotes.forEach(function (note) {
            const noteEL = generateNoteDOM(note)
            notesEl.appendChild(noteEL)
        })
    } else {
        const emptyMesssage = document.createElement('p')
        emptyMesssage.textContent = 'No notes to show'
        emptyMesssage.classList.add('empty-message')
        notesEl.appendChild(emptyMesssage)
    }
}


const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')

    const notes = getNotes()
    const note = notes.find(function (note) {
        return note.id === noteId
    })

    if (!note) {
        location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
}


// Generate the last edited message
const generateLastEdited = function (timestamp) {
    return `last edited ${moment(timestamp).fromNow()}`
}

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage }