const Users = require("../controller/auth.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/register", Users.register);
    app.post("/api/login", Users.login);
    // app.get("/api/users", authenticate, Users.getAll);


    // // Connection Status
    // app.get("/api", EXAMPLE_Controller.index);
    
    // // Create
    // app.post("/api/EXAMPLE/new", EXAMPLE_Controller.create_EXAMPLE);

    // // Get ALL
    // app.get("/api/EXAMPLE", EXAMPLE_Controller.all_EXAMPLE);
    
    // // Get ONE
    // app.get("/api/EXAMPLE/:id", EXAMPLE_Controller.one_EXAMPLE);

    // // Update ONE
    // app.put("/api/EXAMPLE/:id", EXAMPLE_Controller.Update_EXAMPLE);

    // // Delete ONE
    // app.delete("/api/EXAMPLE/:id", EXAMPLE_Controller.delete_EXAMPLE);
}

