// mongodb+srv://TrungLe2003:Trungcrazy2003@carsellingweb.amr1k.mongodb.net/
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import "./cron-jobs/cron.js"; //import để chạy cron
import { initSocket } from "./socket/socket.js";
import http from "http";
dotenv.config();
//
import RootRouter from "./routes/index.js";

await mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected database!");
});

const app = express();
app.use(express.json());
// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// };
const corsOptions = {
  origin: ["https://fe-spck4.onrender.com", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
//app.use(cors());

const server = http.createServer(app);
initSocket(server); // Truyền server HTTP vào

app.get("", (req, res) => {
  res.send({
    message: "Connected!",
  });
});

app.use("/api", RootRouter);

// server.listen(process.env.PORT || 8080, () => {
//   console.log("This is Car Selling Project");
// });
const PORT = process.env.PORT || 8080; //đặt biến port để render tự thêm vào
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
