import axios from "axios";

class NotesService {
	async getAllNotes() {
		const res = await axios.get('api/notes');
		return res.data;
	}
}

export const notesService = new NotesService();