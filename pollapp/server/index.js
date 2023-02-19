// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const session = require("client-sessions");
// const dbUrl = "mongodb://localhost:27017/pollDB";
// const secret = "random string";
// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:")); //This file will run every time So there is no need to connect with mongodb further
// db.once("open", function () {
//   console.log("Connected");
// });
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   if ("OPTIONS" == req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });
// app.use(
//   session({
//     cookieName: "session",
//     secret,
//     duration: 30 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000,
//     cookie: {
//       httpOnly: true,
//       //secure:true,
//       expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     },
//   })
// );
// app.post("/api", (req, res) => {
//   res.send("React & Node Connected");
// });
// app.listen(5000, () => {
//   console.log("Listening.....");
// });
let markedArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let question = null;
let totalSubmision = 0;

const io = require("socket.io")(5000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
io.on("connection", (socket) => {
  socket.on("send_question", (obj) => {
    markedArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    totalSubmision = 0;
    question = obj;
    io.emit("recieved_question", obj);
  });
  socket.on("get_question", () => {
    if (question) {
      io.emit("recieved_question", question);
    }
  });
  socket.on("submit_answer", (obj) => {
    const index = obj.questionObj.options.indexOf(obj.marked);
    markedArray[index] += 1;
    totalSubmision += 1;
    io.emit("recieved_answer", {
      markedArray,
      totalSubmision,
      questionObj: obj.questionObj,
    });
  });
});
