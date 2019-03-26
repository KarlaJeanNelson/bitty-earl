import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';
import List from './List';
import './App.styles.css';
import {
	CssBaseline,
	Grid
} from '@material-ui/core'

class App extends Component {
	state ={
		urlList: []
	}

	fetchAll = () => {
		axios.get('/api/urls')
			.then(({data}) => this.setState({ urlList: data.docs }))
			.catch(e => console.log(e))
	}

	componentDidMount() {
		this.fetchAll();
	}

  render() {
		const { urlList } = this.state;
    return (
      <div className="Container">
				<CssBaseline />
				<Grid container spacing={16} direction="column">
					<Grid item>
						<Form fetchAll={this.fetchAll} />
					</Grid>
					<Grid item>
						<List
							urlList={urlList}
							fetchAll={this.fetchAll}
						/>
					</Grid>
				</Grid>
      </div>
    );
  }
}

export default App;
