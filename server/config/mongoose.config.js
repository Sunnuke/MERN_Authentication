const mongoose = require("mongoose");

// Set mongoose to connect/create mongoDB server and console log activity
mongoose.connect("mongodb://localhost/NAME_DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(".config.js: Established connection to Database"))
    .catch(err => console.log("ERROR:", err));