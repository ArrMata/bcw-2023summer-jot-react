import './App.css';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiClose, mdiFountainPen, mdiFountainPenTip, mdiViewList } from '@mdi/js';
import { useState, useEffect } from 'react';

function App() {

  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false)
  const [activeNote, setActiveNote] = useState(null)
  const [activeNoteContent, setActiveNoteContent] = useState(null)
  const [notesList, setNotesList] = useState([])


  const handleCloseOffcanvas = () => {
    if (isOffcanvasVisible)
      setIsOffcanvasVisible(false)
  }

  const selectActiveNote = (noteId) => {
    let foundNote = notesList.find(note => note.id === noteId)
    setActiveNote(foundNote)
    setActiveNoteContent(foundNote.content)
  }

  const handleEditActiveNote = (event) => {
    setActiveNoteContent(event.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/notes')
      .then(res => setNotesList(res.data))
      .catch(err => console.error(err))
  }, [])

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
          selectActiveNote={selectActiveNote}
        />

        {activeNote ?
          <ActiveNote
            handleEditActiveNote={handleEditActiveNote}
            activeNoteContent={activeNoteContent}
            activeNote={activeNote} /> : <ActiveNotePlaceholder />}

      </main>
    </>
  );
}

const NoteOffCanvas = ({ isOffcanvasVisible, handleCloseOffcanvas, notesList, selectActiveNote }) => {
  const computedNotes = notesList.map(note => {
    return <li className='mt-2 p-2 rounded-md transition-all ease-in-out duration-150 bg-slate-700 hover:bg-slate-500 hover:cursor-pointer'
      onClick={() => selectActiveNote(note.id)}
      key={note.id}>{note.title}</li>
  })

  return (
    <>
      <div className={`absolute top-0 right-full w-1/4 h-full z-50 overflow-x-hidden p-3 ${isOffcanvasVisible ? 'translate-x-full' : ''} rounded-md shadow-2xl shadow-black bg-slate-700 text-zinc-100 transition-all duration-300 ease-in-out`}>
        <div className='flex justify-between text-xl'>
          <h3>Notes: {notesList.length}</h3>
          <button className='hover:text-red-900 transition-colors' onClick={handleCloseOffcanvas}>
            <Icon path={mdiClose} size={1.5} />
          </button>
        </div>
        <ul className='text-3xl'>
          {computedNotes}
        </ul>
      </div>
    </>
  )
}

const ActiveNote = ({ activeNote, activeNoteContent, handleEditActiveNote }) => {
  return (
    <div className='flex bg-slate-800 border-4 rounded px-16 py-10 border-slate-600 py h-[40rem] w-4/5 m-auto mt-24'>
      <div className='w-1/4'>
        <h2 className=' text-white text-4xl'>{activeNote.title}</h2>
      </div>
      <textarea className='p-3 w-1/2 flex h-4/5 self-center resize-none text-black bg-gray-200'
        value={activeNoteContent}
        onChange={handleEditActiveNote}
      />
      <div className='w-1/4'>

      </div>
    </div>
  )
}

const ActiveNotePlaceholder = () => {
  return (
    <div className='flex flex-col text-5xl text-zinc-100 items-center'>
      <Icon
        path={mdiFountainPen}
        size={8}
      />
      <h2>Select or Create a Note!</h2>
    </div>
  )
}

export default App;
