import React, { Component } from 'react';
import { CssBaseline } from '@material-ui/core';
import Form from './Form'
import './App.styles.css'

class App extends Component {
  render() {
    return (
      <div className="Container">
				<CssBaseline />
				<Form />
      </div>
    );
  }
}

export default App;
