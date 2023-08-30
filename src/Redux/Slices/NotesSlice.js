import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
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
	}
});

export const { populateAccountNotes } = notesSlice.actions;

export default notesSlice.reducer;