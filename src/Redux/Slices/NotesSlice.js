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
	}
});

export const { populateAccountNotes } = notesSlice.actions;

export default notesSlice.reducer;