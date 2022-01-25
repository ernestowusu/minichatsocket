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
			password: 'b1d1e5ea6f72eca0f6a4237e9b348c4a49015a43fb68ceaa029951767fbdbd1c',
			database: 'd6jrel113aen55',
			port:5432,
			connectionString:'postgres://dslxpggkjhwcvv:b1d1e5ea6f72eca0f6a4237e9b348c4a49015a43fb68ceaa029951767fbdbd1c@ec2-3-216-113-109.compute-1.amazonaws.com:5432/d6jrel113aen55'
			//debug: false
		});
		this.connection.connect().then(() => console.log('connected to database'))
  			.catch(err => console.error('connection error', err.stack))
	}
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
