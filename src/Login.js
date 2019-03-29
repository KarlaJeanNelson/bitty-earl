import React from 'react';
import {
	AppBar,
	Button,
	Card,
	CardContent,
	InputAdornment,
	Tabs,
	Tab,
	TextField,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = props => {
	const {
		email,
		password,
		password2,
		onChange,
		helperText,
		signupMode,
		toggleMode,
		register,
		login
	} = props;
	return (
		<Card>
			<AppBar position="static" elevation={0}>
				<Tabs value={Number(signupMode)} onChange={toggleMode} centered>
					<Tab label="Log in" />
					<Tab label="Sign up" />
				</Tabs>
			</AppBar>
			<CardContent>
				<form id="login" onSubmit={signupMode ? (e)=>register(e) : (e)=>login(e)}>
					<TextField
						autoFocus
						fullWidth
						required
						margin="normal"
						placeholder="myname@example.com"
						type="email"
						name="email"
						label="email"
						value={email}
						onChange={(e)=>onChange(e)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FontAwesomeIcon icon="user-circle" fixedWidth/>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						fullWidth
						required
						margin="normal"
						type="password"
						name="password"
						label="password"
						value={password}
						onChange={(e)=>onChange(e)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FontAwesomeIcon icon="lock" fixedWidth/>
								</InputAdornment>
							),
						}}
					/>
					{signupMode && 
						<TextField
							fullWidth
							required
							margin="normal"
							type="password"
							name="password2"
							label="retype password"
							value={password2}
							onChange={(e)=>onChange(e)}
							helperText={helperText}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon icon="check-double" fixedWidth/>
									</InputAdornment>
								),
							}}
						/>
					}
					<Button
						variant="contained"
						color="secondary"
						type="submit"
					>
						Submit
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

export default Login;