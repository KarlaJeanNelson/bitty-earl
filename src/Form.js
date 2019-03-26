import React, { Component } from 'react';
import axios from 'axios';
import url from 'url';
import {
	Button,
	Card,
	CardContent,
	TextField,
} from '@material-ui/core';

class Form extends Component {
	state = {
		longurl: 'https://www.google.com',
		helperText: 'Enter your url.',
		error: false,
		urlList: []
	}

	onChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	// If url formatted correctly, see if it exists.
	// If url is not formatted correctly, set helper text appropriately.
	onSubmit = event => {
		event.preventDefault();
		const { longurl } = this.state;
		try {
			const myUrl = new URL(longurl);
			this.setHelperText('Looing good! Testing URL...');
			this.saveUrl(myUrl);
		} catch(e) {
			const urlObj = url.parse(longurl)
			const message = !urlObj.protocol ? `Invalid protocol (try beginning with 'https://' or 'http://'.)`
			: `Not a valid URL string`
			this.setHelperText(message)
		}
	}

	// Set helpertext for form field
	setHelperText = message => {
		this.setState({
			helperText: message
		})
	}

	saveUrl = url => {
		const config = {
			method: 'post',
			url: '/api/urls',
			data: { newUrl: url },
			withCredentials: true,
		}
		axios.request(config)
			.then(({data}) => this.handleResponse(data))
			.catch(e => this.handleResponse({
				status: 0,
				error: true,
				message: e.message
			}))
	}

	handleResponse = data => {
		const { error, message } = data;
		const { fetchAll } = this.props;
		this.setState({
			...this.state,
			error: error,
			helperText: message
		})
		fetchAll();
	}

  render() {
		const { longurl, helperText } = this.state;
    return (
      <form id="url-form" onSubmit={this.onSubmit}>
				<Card>
					<CardContent>
						<TextField
							autoFocus
							fullWidth
							margin="normal"
							variant="outlined"
							name="longurl"
							value={longurl}
							onChange={this.onChange}
							helperText={helperText}
						/>
						<Button
							variant="contained"
							color="secondary"
							type="submit"
						>
							Create URL
						</Button>
					</CardContent>
				</Card>
      </form>
    );
  }
}

export default Form;