import express from "express";
import expressWs from "express-ws";
import { attendanceRoute, authRoute, classRoute, studentRoute } from "./routes";
import { connectToDb } from "./db";

const app = express();
const ws = expressWs(app);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running!",
  });
});




connectToDb()
app.use(express.json())
app.use("/auth", authRoute); 
app.use("/class", classRoute)
app.use("/student", studentRoute)
app.use("/attendance", attendanceRoute)

ws.app.ws("/ws", (socket, req) => {
  console.log("WebSocket client connected");

  socket.on("message", (message) => {
    const data = message.toString(); // ALWAYS parse explicitly
    console.log("Received:", data);

    socket.send(
      JSON.stringify({
        status: "ok",
        received: data,
      })
    );
  });

  socket.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
