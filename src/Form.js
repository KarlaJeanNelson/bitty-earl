import React, { Component } from 'react';
import {
	Button,
	Card,
	CardContent,
	TextField,
} from '@material-ui/core';

class Form extends Component {
	state = {
		longurl: '',
		shorturl: '',
	}

	onChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	onSubmit = event => {
		event.preventDefault();
		this.checkUrl(this.state.longurl)
	}

	checkUrl = () => {
		console.log(longurl);
		const { longurl } = this.state;
		if (!longurl.startsWith('http')) {
			this.setState({
				longurl: 'http://' + longurl
			})
		}
	}

  render() {
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
							value={this.state.longurl}
							onChange={this.onChange}
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