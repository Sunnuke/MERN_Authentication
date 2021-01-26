// Import/Install Express, cors, socket.io
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

// Set Express to a variable (app), and set the selected port to a variable(port), this part is Optional.
const app = express();
const port = 8000;

// Import config file
require("./server/config/mongoose.config");

// Use "app.use()" with cors(), and express: .json() and .urlencoded({extended: true})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Import routes file and address app
require("./server/routes/ROUTES_NAME_HERE.routes")(app);

// Set app to listen for selected port and console.log a message to verify connectivity
const server = app.listen(port, () => console.log(`server.js: Listening to port ${port}`));

// Socket.io
const io = socket(server, {cors: true});

io.on("connection", socket => {
    console.log("A user has connected",socket.id);
    console.log("Nice to meet you. (shake hand)");
    socket.emit("Hello Human!");
    socket.on("NAME_EVENT_LISTENER", (data) => {
        console.log(data);
        socket.broadcast.emit("NAME_EVENT", {"Example": data.EXAMPLE})
    })
});