import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
	name: 'account',
	initialState: {
		authSettled: false,
		account: {},
	},
	reducers: {
		authSettled: state => {
			state.authSettled = true;
		},
		setAccount: (state, action) => {
			state.account = action.payload;
		}
	}
});