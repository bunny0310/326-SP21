const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const LRUCache = require("./lru_cache");

const projectsCountCache = new LRUCache(5); // cache to store project counts for 5 users


module.exports = {app, http, io, projectsCountCache};