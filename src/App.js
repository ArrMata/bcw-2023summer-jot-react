import './App.css';
import Icon from '@mdi/react';
import Swal from 'sweetalert2';
import {
  mdiFountainPenTip,
  mdiViewList,
} from '@mdi/js';
import { useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import { ActiveNote } from './Components/ActiveNote';
import { NoteOffCanvas } from './Components/NoteOffCanvas';
import { ActiveNotePlaceholder } from './Components/ActiveNotePlaceholder';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Login } from './Components/Login';

function App() {

  const reactSwal = withReactContent(Swal);
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  // const [activeNoteContent, setActiveNoteContent] = useState(null);

  const handleCloseOffcanvas = () => {
    if (isOffcanvasVisible)
      setIsOffcanvasVisible(false)
  }

  // const selectActiveNote = (noteId) => {
  //   let foundNote = notesList.find(note => note.id === noteId)
  //   reactSwal.fire({
  //     title: <p className='text-xl'>📝 Note Selected</p>,
  //     toast: true,
  //     timerProgressBar: true,
  //     position: 'bottom-end',
  //     showConfirmButton: false,
  //     timer: 2000
  //   })
  //   setActiveNote(foundNote)
  //   setActiveNoteContent(foundNote.content)
  //   handleCloseOffcanvas()
  // }

  // const handleEditActiveNote = (event) => {
  //   setActiveNoteContent(event.target.value)
  // }

  return (
    <>
      <header className='flex items-center justify-between px-8 py-4'>
        <div className='flex items-center'>
          <Icon className='text-yellow-100'
            path={mdiFountainPenTip}
            size={2} />
          <h1 className='text-zinc-100 text-3xl'>Take Note</h1>
        </div>
        <div className='flex'>
          <Login />
          <button
            onClick={() => setIsOffcanvasVisible(!isOffcanvasVisible)}>
            <Icon className='p-2 rounded bg-slate-500 text-zinc-100 hover:bg-slate-400 transition-all ease-linear'
              path={mdiViewList}
              size={2}
            />
          </button>
        </div>
      </header>

      <main>
        <NoteOffCanvas
          isOffcanvasVisible={isOffcanvasVisible}
          handleCloseOffcanvas={handleCloseOffcanvas}
        />

        {/* {activeNote ?
          <ActiveNote
            // handleEditActiveNote={handleEditActiveNote}
            activeNoteContent={activeNoteContent}
            setActiveNote={setActiveNote}
            activeNote={activeNote} /> : <ActiveNotePlaceholder />} */}

      </main>
    </>
  );
}

export default App;
