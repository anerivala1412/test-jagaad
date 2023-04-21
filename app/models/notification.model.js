const mongoose = require("mongoose");

const Notification = mongoose.model(
    'Notification',
    new mongoose.Schema({
        email: String,
        notifications: [{
            type: String,
            required: true
        }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }

    }, {
        timestamps: true
    })
)
module.exports = Notification