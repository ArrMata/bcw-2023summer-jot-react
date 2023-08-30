import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { useEffect } from 'react';
import { accountService } from '../Services/AccountService';
import { api } from '../Services/AxiosService';
import { notesService } from '../Services/NotesService';

export const Login = () => {
	const { loginWithPopup, logout, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		const attachBearerToApi = async () => {
			const accessToken = await getAccessTokenSilently();
			api.defaults.headers.authorization = `Bearer ${accessToken}`;
			await notesService.getAllNotes();
		}
		if (isAuthenticated && !isLoading) {
			attachBearerToApi();
		}
	}, [isLoading, isAuthenticated, getAccessTokenSilently])

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (!isAuthenticated)
		return (
			<>
				<button onClick={() => loginWithPopup()} className='bg-blue-600 text-white px-6 py-2 text-xl rounded me-4'>
					Login
				</button>
			</>
		)

	return (
		<>
			<p>
				{user.picture}
			</p>
			<button onClick={() => logout()} className='bg-red-600 text-white px-6 py-2 text-xl rounded me-4'>
				Logout
			</button>
		</>
	)
}
