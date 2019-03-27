import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';
import List from './List';
import {
	CssBaseline,
	Grid
} from '@material-ui/core'
import { toUnicode } from 'punycode';

const styles = {
	container: {
		width: '100vw',
		minheight: '100vh',
		padding: 16
	}
}

class App extends Component {
	state = {
		longurl: '',
		helperText: 'Enter your url.',
		error: false,
		urlList: []
	};

	getUrls = () => {
		const config = {
			url: '/api/urls',
			withCredentials: true,
		}
		axios(config)
			.then(({data}) => this.setState({ urlList: data.docs }))
			.catch(e => this.setHelperText(e.message, true))
	}

	onChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	// Make sure url starts with http:// or https://
	// If url is not formatted correctly, set helper text appropriately.
	onSubmit = event => {
		event.preventDefault();
		const { longurl } = this.state;
		let myUrl = this.checkProtocol(longurl);
		try {
			new URL(myUrl);
			this.setHelperText('Looing good! Testing URL...', false);
			this.saveUrl(longurl);
		} catch(e) {
			this.setHelperText(`Not a valid url.`, true)
		}
	}

	checkProtocol = longurl => {
		if (longurl.startsWith('http://') || longurl.startsWith('https://')) {
			return longurl
		} else {
			const newUrl = `https://${longurl}`;
			this.setState({
				longurl: newUrl
			})
			return newUrl;
		}
	}

	// Set helpertext for form field
	setHelperText = (helperText, err) => {
		this.setState({
			helperText,
			err
		})
	}

	saveUrl = longurl => {
		const config = {
			method: 'post',
			url: '/api/urls',
			data: { longurl },
			withCredentials: true,
		}
		this.apiCall(config);
	}

	deleteItem = id => {
		const config = {
			method: 'delete',
			url: `/api/urls/${id}`,
			withCredentials: true
		}
		this.apiCall(config);
	}

	apiCall = config => {
		axios(config)
			.then(({data}) => this.setHelperText(data.message, false))
			.then(this.getUrls())
			.catch(e => this.setHelperText(e.response ? e.response.data.message
				: e.message, true))
	}

	componentDidMount() {
		this.getUrls();
	}

  render() {
		const { urlList, longurl, helperText } = this.state;
    return (
      <div style={styles.container}>
				<CssBaseline />
				<Grid container spacing={16} direction="column">
					<Grid item xs={12}>
						<Form
							longurl={longurl}
							helperText={helperText}
							onChange={this.onChange}
							onSubmit={this.onSubmit}
						/>
					</Grid>
					<Grid item xs={12}>
						<List
							urlList={urlList}
							getUrls={this.getUrls}
							deleteItem={this.deleteItem}
						/>
					</Grid>
				</Grid>
      </div>
    );
  }
}

export default App;
