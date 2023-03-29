const { Database } = require('sqlite3');
const { path, IOOptions } = require('./settings.json');
const nodepath = require('path');

class AppDAO {
	constructor() {
		this.oldDB = new Database(nodepath.join(process.cwd(), path.db, IOOptions.inputSQLFile), (err)=>{
			if (err) console.error(err);
		});
		this.newDB = new Database(nodepath.join(process.cwd(), path.db, IOOptions.outSQLFile), (err)=>{
			if (err) console.error(err);
		});
	}
	async getOldAll() {
		const sql = 'SELECT * FROM json';

		return new Promise((resolve, reject) => {
			this.oldDB.all(sql, [], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
	async postNewUser(data) {

		const sql = 'INSERT INTO users(userid, balance, colors, backgrounds, badges, banners, mythicals) VALUES(?, ?, ?, ?, ?, ?, ?)';

		return this.newDB.run(sql, data, err => console.error(err));
	}

	async postNewItem(table, data) {
		const sql = `INSERT INTO ${table}(name) VALUES (?)`;

		return this.newDB.run(sql, data, err => console.error(err));
	}
}

module.exports = AppDAO;