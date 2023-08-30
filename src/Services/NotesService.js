import axios from "axios";
import { AppState } from "../Redux/Store";
import { populateAccountNotes } from "../Redux/Slices/NotesSlice";

class NotesService {
	async getAllNotes() {
		const res = await axios.get('api/notes');
		AppState.dispatch(populateAccountNotes(res.data));
	}
}

export const notesService = new NotesService();