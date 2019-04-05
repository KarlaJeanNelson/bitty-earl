import React, { Component, Fragment } from 'react';
import axios from 'axios';
// import { withCookies, Cookies } from 'react-cookie';
// import { instanceOf } from 'prop-types';
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
	state = { ...reset };

	getUser = () => {
		axios.get('/api/users', { withCredentials: true })
			.then(({ data }) => {
				this.setState({ ...reset, _id: data._id })
				this.getUrls()
			})
			.catch(e => {
				this.handleApiError(e)
				this.logout()
			})
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
			this.createUser()
		}
	}

	createUser = () => {
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
			.then(({data}) => {
				this.setHelperText(data.message, false)
				this.login()
			})
			.catch(e => this.handleApiError(e))
	}

	login = (event = '') => {
		if (event) { event.preventDefault() }
		const config = {
			method: 'post',
			url: '/api/users/login',
			data: {
				email: this.state.email.toLowerCase(),
				password: this.state.password
			}
		}

		axios(config)
		.then(({data}) => {
			// console.log(data)
			this.setState({ _id: data._id, helperText: data.message });
			this.getUser();
		})
		.catch(e => {
			if (e.response && e.response.data.message && e.response.data.message.startsWith('Email')) {
				this.toggleMode();
			}
			this.handleApiError(e)
		})
	}

	logout = (event='') => {
		if (event) {event.preventDefault();}
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
			.catch(e => this.handleApiError(e))
	}

	onChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	onSubmit = event => {
		event.preventDefault();
		const { longurl } = this.state;
		const config = {
			method: 'post',
			url: '/api/urls',
			data: {
				longurl
			},
			withCredentials: true
		}
		this.apiCall(config);
	}

	// Set helpertext for form field
	setHelperText = (helperText, err, longurl='') => {
		this.setState({
			helperText,
			err,
			longurl
		})
	}

	deleteItem = id => {
		const config = {
			method: 'delete',
			url: `/api/urls/${id}`,
			withCredentials: true
		}
		this.apiCall(config);
	}

	linkClick = url => {
		axios(url)
		.then(({data}) => {
			window.open(data.longurl, '_blank')
		})
		.catch(e => this.handleApiError(e))
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
						linkClick={this.linkClick}
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

// App.propTypes = {
// 	cookies: instanceOf(Cookies).isRequired
// };

// export default withCookies(App);
export default App;
