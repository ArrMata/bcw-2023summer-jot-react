import { AppState } from "../Redux/Store";
import { addNote, populateAccountNotes } from "../Redux/Slices/NotesSlice";
import { api } from "./AxiosService";

class NotesService {
	async getAllNotes() {
		const res = await api.get('api/notes');
		AppState.dispatch(populateAccountNotes(res.data));
	}

	async createNote(noteData) {
		const res = await api.post('api/notes', noteData);
		AppState.dispatch(addNote(res.data));
	}
}

export const notesService = new NotesService();