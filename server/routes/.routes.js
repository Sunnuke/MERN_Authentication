const EXAMPLE_Controller = require("../controller/EXAMPLE.controller");

module.exports = (app) => {
    // Connection Status
    app.get("/api", EXAMPLE_Controller.index);
    
    // Create
    app.post("/api/EXAMPLE/new", EXAMPLE_Controller.create_EXAMPLE);

    // Get ALL
    app.get("/api/EXAMPLE", EXAMPLE_Controller.all_EXAMPLE);
    
    // Get ONE
    app.get("/api/EXAMPLE/:id", EXAMPLE_Controller.one_EXAMPLE);

    // Update ONE
    app.put("/api/EXAMPLE/:id", EXAMPLE_Controller.Update_EXAMPLE);

    // Delete ONE
    app.delete("/api/EXAMPLE/:id", EXAMPLE_Controller.delete_EXAMPLE);
}
