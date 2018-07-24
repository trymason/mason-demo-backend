const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server)


require("dotenv").config();


// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT || process.argv[2] || 3000;
const host = process.env.HOST;

// If we're running this file directly, start up the server
if (require.main === module) {
  server.listen(port, () => {
    console.log(`Listening on: http://${host}:${port}`)
  })
}

// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require("morgan");
const highlight = require("cli-highlight").highlight;

const format = [
  ":separator",
  ":newline",
  ":method ",
  ":url ",
  ":status ",
  ":res[content-length] ",
  "- :response-time ms",
  ":newline",
  ":newline",
  ":data",
  ":newline",
  ":separator",
  ":newline",
  ":newline"
].join("");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(format));
}

morgan.token("separator", () => "****");
morgan.token("newline", () => "\n");

// Set data token to output
// req query params and body
morgan.token("data", (req) => {
  let data = [];

  if (/\.[\w]+$/.test(req.url)) {
    return "";
  }

  ["query", "params", "body", "session", "user"].forEach(key => {
    if (req[key]) {
      const capKey = key[0].toUpperCase() + key.substr(1);
      const value = JSON.stringify(req[key], null, 2);
      data.push(`${capKey}: ${value}`);
    }
  });
  data = highlight(data.join("\n"), {
    language: "json",
    ignoreIllegals: true
  });
  return `${data}`;
});

// ---------------------------------------
// Mongoose init
// ---------------------------------------
const mongoose = require("mongoose");
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./utils/mongo")(req).then(() => next());
  }
});

// ---------------------------------------
// Sockets
// ---------------------------------------
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('new chat message', function(data){
    console.log('message: ' + data.message);
    io.emit('new chat message', data)
  });
});

require("./config/init")(app);
module.exports = app;
