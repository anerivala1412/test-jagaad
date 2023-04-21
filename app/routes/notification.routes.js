const controller = require("../controller/notification.controller");
const authJwt = require("../middleware/authJwt");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/add-notification", [authJwt.verifyToken],
        controller.addNotification
    );
    app.get(
        "/api/message", [authJwt.verifyToken],
        controller.getNotificationList
    );
};