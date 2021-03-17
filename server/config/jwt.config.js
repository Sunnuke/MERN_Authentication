const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        console.log("#################################################################### TOKEN:");
        console.log(req.cookies.usertoken);
        console.log("#################################################################### SECRET KEY:");
        console.log(process.env.SECRET_KEY);
        console.log("#################################################################### ERRORS:");
        console.log(err);
        console.log("#################################################################### PAYLOAD:");
        console.log(payload);
        if (err) { 
            res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}