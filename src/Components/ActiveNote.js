import axios from "axios"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { mdiTrashCan } from "@mdi/js"
import Icon from "@mdi/react"

export const ActiveNote = ({ activeNote, activeNoteContent, handleEditActiveNote, setActiveNote }) => {

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
                axios.delete(`http://localhost:3001/notes/${activeNote.id}`)
                    .then(() => {
                        reactSwal.fire({
                            title: <p className='text-xl'>👋 Note has been deleted!</p>,
                            toast: true,
                            timerProgressBar: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        setActiveNote(null)
                    })
            }
        })
    }

    return (
        <div className='flex bg-slate-800 border-4 rounded-2xl px-16 py-10 border-slate-600 py h-[40rem] w-4/5 m-auto mt-24'>
            <div className='w-1/4 flex items-start'>
                <div className='flex w-full items-center'>
                    <div className='h-8 w-1/12 rounded-full me-2' style={{ backgroundColor: `${activeNote.color}` }}></div>
                    <h2 className=' text-white text-3xl'>{activeNote.title}</h2>
                </div>
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