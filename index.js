'use strict';

const express = require('express');
const http = require('http');
var cors = require('cors')
const socketio = require('socket.io');
const socketEvents = require('./utils/socket');


class Server {
	constructor(cors) {
		this.port = process.env.PORT || 3000;
        this.host = process.env.HOST || `ernestminichatsocket.herokuapp.com`;

        this.app = express();
        this.app.use(cors())
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
	}

	appRun(){
		new socketEvents(this.socket).socketConfig();
		this.app.use(express.static(__dirname + '/uploads'));
        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }
}

const app = new Server(cors);
app.appRun();
