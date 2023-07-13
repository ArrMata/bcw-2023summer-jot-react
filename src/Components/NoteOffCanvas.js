import Icon from "@mdi/react"
import { mdiClose, mdiPlus } from "@mdi/js"

export const NoteOffCanvas = ({ isOffcanvasVisible,
    handleCloseOffcanvas,
    notesList,
    selectActiveNote,
    isLoading,
    newNoteTitle,
    submitNewNote,
    handleEditNewNoteTitle,
    newNoteColor,
    setNewNoteColor }) => {
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
            return <li className='flex items-center mt-2 p-2 rounded-md transition-all ease-in-out duration-150 bg-slate-700 hover:bg-slate-500 hover:cursor-pointer'
                onClick={() => selectActiveNote(note.id)}
                key={note.id}>
                <div className='w-6 h-6 rounded-full me-2' style={{ backgroundColor: `${note.color}` }}></div>
                <p className='pb-2'>{note.title}</p>
            </li>
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
                        <input value={newNoteColor} onChange={(event) => setNewNoteColor(event.target.value)} className='rounded-md h-full mx-2' type="color" />
                        <button className='rounded-md bg-green-800 h-full hover:bg-green-600 transition-all duration-200'><Icon path={mdiPlus} size={1.25} /></button>
                    </div>
                </form>
            </div>
        </>
    )
}