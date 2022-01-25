'user strict';

const DB = require('./db');
const path = require('path');
const fs = require('fs');

class Helper{

	constructor(app){
		this.db = DB;
	}

	async addSocketId(userId, userSocketId){
		try {
			var query = `UPDATE users SET socket_id = '${userSocketId}', online='Y' WHERE id = '${userId}'`;
			return await this.db.query(query);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async logoutUser(userSocketId){
		var query = `UPDATE users SET socket_id = '', online= 'N' WHERE socket_id = '${userSocketId}'`;
		return await this.db.query(query);
	}

	getChatList(userId){
		try {
			var query = `SELECT id, name, socket_id, online, updated_at FROM users WHERE id != '${userId}'`;
			return Promise.all([
				this.db.query(query)
			]).then( (response) => {
				return {
					chatlist : response[0]
				};
			}).catch( (error) => {
				console.warn(error);
				return (null);
			});
		} catch (error) {
			console.warn(error);
			return null;
		}
	}

	async insertMessages(params){
		try {
			var query = `INSERT INTO messages (type, file_format, file_path, from_user_id,to_user_id,message,date,time,ip) values ('${params.type}','${params.fileFormat}','${params.filePath}','${params.fromUserId}','${params.toUserId}','${params.message}','${params.date}','${params.time}','${params.ip}')`;
			return await this.db.query(query);
		} catch (error) {
			console.warn(error);
			return null;
		}
	}

	async getMessages(userId, toUserId){
		try {
			var query = `SELECT id,from_user_id as fromUserId,to_user_id as toUserId,message,time,date,type,file_format as fileFormat,file_path as filePath FROM messages WHERE (from_user_id = '${userId}' AND to_user_id = '${toUserId}' ) OR (from_user_id = '${toUserId}' AND to_user_id = '${userId}' ) ORDER BY id ASC`;
			return await this.db.query(query);
		} catch (error) {
			console.warn(error);
			return null;
		}
	}

	async mkdirSyncRecursive(directory){
		var dir = directory.replace(/\/$/, '').split('/');
        for (var i = 1; i <= dir.length; i++) {
            var segment = path.basename('uploads') + "/" + dir.slice(0, i).join('/');
            !fs.existsSync(segment) ? fs.mkdirSync(segment) : null ;
        }
	}
}
module.exports = new Helper();
