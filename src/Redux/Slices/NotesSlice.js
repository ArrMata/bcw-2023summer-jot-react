import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
	name: 'notes',
	initialState: {
		notes: [],
		activeNote: {}
	},
	reducers: {
		populateAccountNotes: (state, action) => {
			state.notes = action.payload;
		},
		addNote: (state, action) => {
			state.notes.push(action.payload);
		},
		removeNote: (state, action) => {
			state.notes = state.notes.filter(note => note.id !== action.payload.id);
		},
		selectActiveNote: (state, action) => {
			state.activeNote = action.payload;
		}
	}
});

export const { populateAccountNotes, addNote, removeNote, selectActiveNote } = notesSlice.actions;

export const selectNotes = state => state.notes.notes;

export default notesSlice.reducer;