import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './Slices/NotesSlice';

export const AppState = configureStore({
	reducer: {
		notes: notesReducer,
	}
});