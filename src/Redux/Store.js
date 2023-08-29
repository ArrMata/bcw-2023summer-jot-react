import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './Slices/NotesSlice';

export default configureStore({
	reducer: {
		notes: notesReducer,
	}
});