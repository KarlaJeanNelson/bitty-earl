import React from 'react';
import { Button, Card, CardContent, TextField } from '@material-ui/core';

const Form = ({ onChange, onSubmit, longurl, helperText }) => (
	<form id="url-form" onSubmit={onSubmit}>
		<Card>
			<CardContent>
				<TextField
					autoFocus
					fullWidth
					margin="normal"
					variant="outlined"
					placeholder="https://www.example.com"
					name="longurl"
					value={longurl}
					onChange={onChange}
					helperText={helperText}
				/>
				<Button variant="contained" color="secondary" type="submit">
					Create URL
				</Button>
			</CardContent>
		</Card>
	</form>
);

export default Form;
