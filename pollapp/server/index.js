let markedArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let question = null;
let totalSubmision = 0;
const port = process.env.PORT || 5000;
const io = require("socket.io")(port, {
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
