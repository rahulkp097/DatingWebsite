import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import chatRouter from "./routes/chatRoute.js";
import session from "express-session";
import crypto from "crypto";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 5000;
connectDB();
const app = express();

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET, PUT, POST, DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "https://youandmelove.me",
    methods: "GET, PUT, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

const secret = crypto.randomBytes(64).toString("hex");

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache");
  next();
});

app.use(express.json());
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/users/admin", adminRouter);
app.use("/api/users/chat", chatRouter);
app.use("/api/users/message", messageRouter);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(errorMiddleware);

const server = app.listen(port, () =>
  console.log(`Server connected on port ${port}`)
);

// const io = new Server(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: 'https://localhost:3000',

//   },
// });

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://youandmelove.me",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData && userData._id);

    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
