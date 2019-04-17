const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.PRIVATE_SECRET_KEY);
        req.userData = decoded;
        next();
    }
    catch {
        return res.status(401).json({ message: "Authorization failed." });
    }
}