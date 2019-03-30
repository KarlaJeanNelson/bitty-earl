import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Login from './Login';
import Form from './Form';
import List from './List';
import {
	CssBaseline,
	Grid,
	Button
} from '@material-ui/core'

const styles = {
	container: {
		width: '100vw',
		minheight: '100vh',
		padding: 16
	}
}

const reset = {
	signupMode: false,
	email: '',
	password: '',
	password2: '',
	_id: '',
	longurl: '',
	helperText: '',
	error: false,
	urlList: []
};

class App extends Component {
	state = {
		signupMode: false,
		email: '',
		password: '',
		password2: '',
		_id: '',
		longurl: '',
		helperText: '',
		error: false,
		urlList: []
	};

	getUser = () => {
		axios.get('/api/users', { withCredentials: true })
			.then(({ data }) => {
				this.setState({ ...reset, _id: data._id })
				this.getUrls()
			})
			.catch(e => this.handleApiError(e))
	}

	register = event => {
		event.preventDefault();
		const { password, password2 } = this.state;
		this.setHelperText('', false);
		if (password.length < 8 ) {
			this.setHelperText('Password must at least 8 characters', true)
		} else if (password !== password2 ) {
			this.setHelperText('Passwords must match!', true)
		} else {
			this.createUser(event)
		}
	}

	createUser = event => {
		const config = {
			method: 'post',
			url: '/api/users',
			withCredentials: true,
			data: {
				email: this.state.email.toLowerCase(),
				password: this.state.password
			}
		}
		axios(config)
			.then(this.login(event))
			.catch(e => this.handleApiError(e))
	}

	login = event => {
		event.preventDefault();
		const config = {
			method: 'post',
			url: '/api/users/login',
			data: {
				email: this.state.email.toLowerCase(),
				password: this.state.password
			}
		}
		this.setHelperText('', false)
		axios(config)
		.then(({data}) => {
			this.setState({ _id: data._id });
			this.getUser();
		})
		.catch(e => this.handleApiError(e))
	}

	logout = event => {
		event.preventDefault();
		axios.post('/api/users/logout')
		.then(this.setState(reset))
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
			.then(({data}) => {
				this.setHelperText(data.message, false)
				this.getUrls()
			})
			.catch(e => this.handleApiError(e))
	}

	handleApiError = e => {
		// console.log(e);
		const message = !e.response ? e.message : e.response.data.message
		this.setHelperText(message, true)
	}

	LoginForm = () => {
		const { helperText, email, password, signupMode } = this.state;
		return (
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
		)
	}

	UrlFormAndList = () => {
		const { urlList, longurl, helperText } = this.state;
		return (
			<Fragment>
				<Grid item xs={12} container justify="flex-end">
					<Button
						color="secondary"
						variant="contained"
						onClick={this.logout}
					>
						Logout
					</Button>
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
			</Fragment>
		)
	}

	componentDidMount() {
		this.getUser();
	}

  render() {
    return (
      <div style={styles.container}>
				<CssBaseline />
				<Grid container spacing={16} direction="column">
					{ this.state._id ? <this.UrlFormAndList /> : <this.LoginForm /> }
				</Grid>
      </div>
    );
  }
}

export default App;
