const Users = require("../controller/auth.controller");
const TokenCheck = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/register", Users.register);
    app.post("/api/login", Users.login);
    app.get("/api/users", TokenCheck.authenticate, Users.getAll);
    app.get("/api/logout", Users.logout);

    // Connection Status
    app.get("/api", Users.index);
}

