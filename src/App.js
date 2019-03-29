import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import Form from './Form';
import List from './List';
import {
	CssBaseline,
	Grid
} from '@material-ui/core'

const styles = {
	container: {
		width: '100vw',
		minheight: '100vh',
		padding: 16
	}
}

class App extends Component {
	state = {
		signupMode: false,
		email: '',
		password: '',
		password2: '',
		userId: '',
		longurl: '',
		helperText: '',
		error: false,
		urlList: []
	};

	login = event => {
		event.preventDefault();
		const config = {
			method: 'post',
			url: 'api/users/login',
			withCredentials: true,
			data: {
				email: this.state.email.toLowerCase(),
				password: this.state.password
			}
		}
		axios(config)
		.then(({ data }) => this.setState({ userId: data.id }))
		.catch(e => this.handleApiError(e))
	}

	register = event => {
		event.preventDefault();
		this.setHelperText('', false);
		const { password, password2 } = this.state;
		password === password2 ? this.createUser(event)
		: this.setHelperText(`Passwords must match!`, true)
	}

	createUser = event => {
		const config = {
			method: 'post',
			url: '/api/users',
			data: {
				email: this.state.email.toLowerCase(),
				password: this.state.password
			}
		}
		axios(config)
			.then(this.login(event))
			.catch(e => this.handleApiError(e))
	}

	toggleMode = () => {
		this.setState({
			signupMode: !this.state.signupMode
		})
	}

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
		try {
			let myUrl = this.checkProtocol(longurl);
			myUrl = new URL(myUrl);
			this.setHelperText('Looing good! Testing URL...', false);
			this.saveUrl(myUrl.toString());
		} catch(e) {
			this.setHelperText(`Not a valid url.`, true)
		}
	}

	checkProtocol = longurl => {
		let newUrl = longurl.replace('www.', '')
		newUrl = (newUrl.startsWith('http://') || newUrl.startsWith('https://'))
		? newUrl : `https://${newUrl}`
		this.setState({
			longurl: newUrl
		})
		return newUrl;
	}

	// Set helpertext for form field
	setHelperText = (helperText, err, longurl='') => {
		this.setState({
			helperText,
			err,
			longurl
		})
		console.log(this.state);
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
			.catch(e => this.handleApiError(e))
	}

	handleApiError = e => {
		const message = e.response ? e.response.data.message
		: e.message
		this.setHelperText(message, true)
	}

	componentDidMount() {
		this.getUrls();
	}

  render() {
		const { urlList, longurl, helperText, email, password, signupMode } = this.state;
    return (
      <div style={styles.container}>
				<CssBaseline />
				<Grid container spacing={16} direction="column">
					<Grid item xs={12}>
						<Login
							email={email}
							password={password}
							signupMode={signupMode}
							helperText={helperText}
							onChange={this.onChange}
							login={this.login}
							register={this.register}
							toggleMode={this.toggleMode}
						/>
					</Grid>
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
