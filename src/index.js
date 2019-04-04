import React from 'react';
import ReactDOM from 'react-dom';
// import { CookiesProvider } from 'react-cookie';
import { MuiThemeProvider} from '@material-ui/core/styles';
import theme from './App.theme';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faUserCircle, faLock, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import App from './App';
// import * as serviceWorker from './serviceWorker';

library.add(faTimesCircle, faUserCircle, faLock, faCheckDouble )

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<App />
	</MuiThemeProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
