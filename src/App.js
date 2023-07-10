import './App.css';
import axios from 'axios';
import Icon from '@mdi/react';
import Swal from 'sweetalert2';
import {
  mdiClose,
  mdiFountainPen,
  mdiFountainPenTip,
  mdiTrashCan,
  mdiViewList,
  mdiPlus
} from '@mdi/js';
import { useState, useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';

const _generateId = () => {
  let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (
    Math.random() * 16 | 0).toString(16)).toLowerCase();
}

function App() {

  const reactSwal = withReactContent(Swal)
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false)
  const [activeNote, setActiveNote] = useState(null)
  const [activeNoteContent, setActiveNoteContent] = useState(null)
  const [notesList, setNotesList] = useState([])
  const [isNotesListLoading, setNotesListLoading] = useState(true)
  const [newNoteTitle, setNewNoteTitle] = useState("")

  const submitNewNote = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3001/notes', { title: newNoteTitle, content: "Jot down your thoughts!" })
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
    axios.get('http://localhost:3001/notes')
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

const NoteOffCanvas = ({ isOffcanvasVisible,
  handleCloseOffcanvas,
  notesList,
  selectActiveNote,
  isLoading,
  newNoteTitle,
  submitNewNote,
  handleEditNewNoteTitle }) => {
  let computedNotes = <></>

  if (isLoading)
    computedNotes = <>
      <li className='animate-pulse w-full h-7 bg-slate-500 mt-2 pt-2 rounded-md'></li>
      <li className='animate-pulse w-full h-7 bg-slate-500 mt-2 pt-2 rounded-md'></li>
      <li className='flex animate-pulse justify-center w-full h-4 mt-2'>
        <div className='w-4 h-full bg-slate-500 rounded-full'></div>
        <div className='w-4 h-full mx-2 bg-slate-500 rounded-full'></div>
        <div className='w-4 h-full bg-slate-500 rounded-full'></div>
      </li>
    </>
  else {
    computedNotes = notesList.map(note => {
      return <li className='mt-2 p-2 rounded-md transition-all ease-in-out duration-150 bg-slate-700 hover:bg-slate-500 hover:cursor-pointer'
        onClick={() => selectActiveNote(note.id)}
        key={note.id}>{note.title}</li>
    })
  }

  return (
    <>
      <div className={`absolute flex flex-col top-0 right-full w-1/4 h-full z-50 overflow-x-hidden p-3 ${isOffcanvasVisible ? 'translate-x-full' : ''} rounded-md shadow-2xl shadow-black bg-slate-700 text-zinc-100 transition-all duration-300 ease-in-out`}>
        <div className='flex justify-between text-xl'>
          <h3>Notes: {notesList.length}</h3>
          <button className='hover:text-red-900 transition-colors' onClick={handleCloseOffcanvas}>
            <Icon path={mdiClose} size={1.5} />
          </button>
        </div>
        <ul className='text-3xl flex-1'>
          {computedNotes}
        </ul>
        <form onSubmit={submitNewNote} className='w-full'>
          <div className='flex items-center h-8'>
            <input value={newNoteTitle} onChange={handleEditNewNoteTitle} minLength={3} maxLength={15} className='rounded-md bg-slate-400 p-3 flex-1 h-full' type="text" />
            <input className='rounded-md h-full mx-2' type="color" />
            <button className='rounded-md bg-green-800 h-full hover:bg-green-600 transition-all duration-200'><Icon path={mdiPlus} size={1.25} /></button>
          </div>
        </form>
      </div>
    </>
  )
}

const ActiveNote = ({ activeNote, activeNoteContent, handleEditActiveNote, setActiveNote }) => {

  const reactSwal = withReactContent(Swal)

  const saveNote = () => {
    axios.patch(`http://localhost:3001/notes/${activeNote.id}`, { content: activeNoteContent })
      .then(() => {
        reactSwal.fire({
          title: <p className='text-xl'>💾 Note has been saved!</p>,
          toast: true,
          timerProgressBar: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000
        })
      })
  }

  const deleteNote = () => {
    reactSwal.fire({
      icon: "warning",
      title: <p className='text-xl'>Are you sure you want to delete this note?</p>,
      text: "You will note be able to revert this.",
      iconColor: "red",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonColor: "light blue",
      confirmButtonText: "Delete Note"
    }).then((result) => {
      if (result.isConfirmed) {
        reactSwal.fire({
          title: <p className='text-xl'>👋 Note has been deleted!</p>,
          toast: true,
          timerProgressBar: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000
        })
        axios.delete(`http://localhost:3001/notes/${activeNote.id}`)
        setActiveNote(null)
      }
    })
  }

  return (
    <div className='flex bg-slate-800 border-4 rounded-2xl px-16 py-10 border-slate-600 py h-[40rem] w-4/5 m-auto mt-24'>
      <div className='w-1/4'>
        <h2 className=' text-white text-4xl'>{activeNote.title}</h2>
      </div>
      <textarea className='p-3 w-1/2 flex h-4/5 rounded-lg self-center resize-none text-black bg-gray-200'
        value={activeNoteContent}
        onChange={handleEditActiveNote}
      />
      <div className='flex items-end justify-end w-1/4'>
        <div className='flex items-center'>
          <button onClick={saveNote}
            className='bg-green-600 text-gray-50 py-2 px-4 rounded-md text-3xl transition-all duration-200 hover:bg-green-950'>Save</button>
          <button onClick={deleteNote}
            className='text-red-500 transition-all duration-200 hover:text-red-900'><Icon path={mdiTrashCan} size={2.5} /></button>
        </div>
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
