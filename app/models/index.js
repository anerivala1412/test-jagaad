const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require("./user.model");
db.Notification = require("./notification.model");

module.exports = db;