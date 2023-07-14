import './App.css';
import axios from 'axios';
import Icon from '@mdi/react';
import Swal from 'sweetalert2';
import {
  mdiFountainPenTip,
  mdiViewList,
} from '@mdi/js';
import { useState, useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import { ActiveNote } from './Components/ActiveNote';
import { NoteOffCanvas } from './Components/NoteOffCanvas';
import { ActiveNotePlaceholder } from './Components/ActiveNotePlaceholder';

function App() {

  const reactSwal = withReactContent(Swal)
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false)
  const [activeNote, setActiveNote] = useState(null)
  const [activeNoteContent, setActiveNoteContent] = useState(null)
  const [notesList, setNotesList] = useState([])
  const [isNotesListLoading, setNotesListLoading] = useState(true)
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [newNoteColor, setNewNoteColor] = useState("#f4f4f5")

  const submitNewNote = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3001/notes', { title: newNoteTitle, content: "Jot down your thoughts!", color: newNoteColor })
      .then(res => {
        setActiveNote(res.data)
        setActiveNoteContent(res.data.content)
        handleCloseOffcanvas()
        setNewNoteTitle("")
        reactSwal.fire({
          title: <p className='text-xl'>🛠 Note Created</p>,
          toast: true,
          timerProgressBar: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000
        })
      })
      .catch(error => console.log(error))
  }

  const handleCloseOffcanvas = () => {
    if (isOffcanvasVisible)
      setIsOffcanvasVisible(false)
  }

  const selectActiveNote = (noteId) => {
    let foundNote = notesList.find(note => note.id === noteId)
    reactSwal.fire({
      title: <p className='text-xl'>📝 Note Selected</p>,
      toast: true,
      timerProgressBar: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000
    })
    setActiveNote(foundNote)
    setActiveNoteContent(foundNote.content)
    handleCloseOffcanvas()
  }

  const handleEditActiveNote = (event) => {
    setActiveNoteContent(event.target.value)
  }

  const handleEditNewNoteTitle = (event) => {
    setNewNoteTitle(event.target.value)
  }

  useEffect(() => {
    setNotesListLoading(true)
    axios.get('http://localhost:3001/api/notes')
      .then(res => {
        setNotesList(res.data)
        setNotesListLoading(false)
      })
      .catch(err => {
        console.error(err)
        setNotesListLoading(false)
      })
  }, [activeNote])

  return (
    <>
      <header className='flex items-center justify-between px-8 py-4'>
        <div className='flex items-center'>
          <Icon className='text-yellow-100'
            path={mdiFountainPenTip}
            size={2} />
          <h1 className='text-zinc-100 text-3xl'>Take Note</h1>
        </div>
        <button
          onClick={() => setIsOffcanvasVisible(!isOffcanvasVisible)}>
          <Icon className='p-2 rounded bg-slate-500 text-zinc-100 hover:bg-slate-400 transition-all ease-linear'
            path={mdiViewList}
            size={2}
          />
        </button>
      </header>

      <main>
        <NoteOffCanvas
          isOffcanvasVisible={isOffcanvasVisible}
          handleCloseOffcanvas={handleCloseOffcanvas}
          notesList={notesList}
          isLoading={isNotesListLoading}
          selectActiveNote={selectActiveNote}
          newNoteTitle={newNoteTitle}
          handleEditNewNoteTitle={handleEditNewNoteTitle}
          submitNewNote={submitNewNote}
          newNoteColor={newNoteColor}
          setNewNoteColor={setNewNoteColor}
        />

        {activeNote ?
          <ActiveNote
            handleEditActiveNote={handleEditActiveNote}
            activeNoteContent={activeNoteContent}
            setActiveNote={setActiveNote}
            activeNote={activeNote} /> : <ActiveNotePlaceholder />}

      </main>
    </>
  );
}

export default App;
