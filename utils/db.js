'use strict';

//const mysql = require('mysql');
const config = require('config');
const { Pool, Client } = require('pg')
class Db {
	constructor() {
		this.connection = new Client({
			//connectionLimit: 100,
			host: 'ec2-3-216-113-109.compute-1.amazonaws.com',
			user: 'dslxpggkjhwcvv',
			password: '372f576fd09c3b0e9e33c8b45d2542a0a6efa2bc7c902cedaa747a94bf94e3a8',
			database: 'd2fu9p749184d7',
			port:5432,
			connectionString:'postgres://nxvwigwzratpff:372f576fd09c3b0e9e33c8b45d2542a0a6efa2bc7c902cedaa747a94bf94e3a8@ec2-52-73-149-159.compute-1.amazonaws.com:5432/d2fu9p749184d7',
			ssl: { rejectUnauthorized: false }
			//debug: false
		});
		this.connection.connect().then(() => {
			console.log('connected to database')
		})
  			.catch(err => console.error('connection error', err.stack))
	}
	// checking if it works
	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
				if (err)
					return reject(err);
				resolve(rows);
			});
		});
	}
	close() {
		return new Promise((resolve, reject) => {
			this.connection.end(err => {
				if (err)
					return reject(err);
				resolve();
			});
		});
	}
}
module.exports = new Db();
