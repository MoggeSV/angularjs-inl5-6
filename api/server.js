const port = process.env.SERVER_PORT || 9999;
const http = require("http");
const db = require("mongoose");
const app = require("./apiapp.js");

// WEB SERVER
http.createServer(app).listen(port, function() {
    console.log(`WEB SERVER online on port ${port}.`);
})

// MONGO DB

db.connect(process.env.MONGODB, { useNewUrlParser: true })
.then(function() { console.log("MongoDB online on port 27017") })
.catch(function(err) { console.log(err) });

db.set("useCreateIndex", true);