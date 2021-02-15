const mongoose = require("mongoose");

// Set mongoose to connect/create mongoDB server and console log activity
mongoose.connect("mongodb://localhost/log_and_reg_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(".config.js: Established connection to Database"))
    .catch(err => console.log("ERROR:", err));