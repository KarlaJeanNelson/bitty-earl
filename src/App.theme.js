import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
			main: '#05324b'
		},
		secondary: {
			main: '#ee4035'
		}
	},
	shape: {
		borderRadius: 2
	},
	typography: {
		useNextVariants: true
	}
});

export default theme;