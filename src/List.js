import React from 'react';
import {
	Card,
	CardContent,
	IconButton,
	Link,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = {
	table: {
		maxwidth: 200,
		tableLayout: 'auto',
	},
	cell: {
		wordBreak: 'break-all',
		overflow: 'hidden'
	},
	longurl: {
		scope: 'col',
		width: '60%',
	},
	shorturl: {
	},
	hitcount: {
		scope: 'col',
		maxwidth: '10%',
		minwidth: 72
	}
}

const List = ({ urlList, deleteItem }) => (
	<Card>
		<CardContent>
			<Table padding="checkbox" style={styles.table}>
				<TableHead>
					<TableRow>
						<TableCell style={styles.longurl}>long url</TableCell>
						<TableCell style={styles.shorturl} align="center">short url</TableCell>
						<TableCell align="center" style={styles.hitcount}>hit count</TableCell>
						<TableCell align="center" style={{width: 72}}>delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{urlList.map(item => (
						<TableRow key={item._id} hover={true}>
							<TableCell style={styles.cell}>
								<Link href={item.longurl} target="_blank">
									{item.longurl}
								</Link>
							</TableCell>
							<TableCell style={styles.cell}>
								<Link href={item.longurl} target="_blank">
									{item.shorturl}
								</Link>
							</TableCell>
							<TableCell align="right" style={styles.cell}>{item.hitcount}</TableCell>
							<TableCell align="center" style={styles.cell}>
								<IconButton size="small" onClick={() => deleteItem(item._id)}>
									<FontAwesomeIcon icon="times-circle" size="xs" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
)

export default List;