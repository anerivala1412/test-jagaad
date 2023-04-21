const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
    console.log({ header: req.headers })
    let token = req.session.token || req.headers.authorization?.split(' ')[1];;
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        req.userId = decoded.id;
        next();
    });
};



const authJwt = {
    verifyToken,
};
module.exports = authJwt;