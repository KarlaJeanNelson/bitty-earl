import React, { Component } from 'react';
import {
	Card,
	CardContent,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core';

class List extends Component {

	componentDidMount() {
		console.log(this.props.urlList);
	}

	render() {
		const { urlList } = this.props;
    return (
			<Card>
				<CardContent>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{urlList.map(item => (
								<TableRow key={item._id}>
									<TableCell>{item.longurl}</TableCell>
									<TableCell>{item.shorturl}</TableCell>
									<TableCell></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
    );
  }
}

export default List;