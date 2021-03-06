import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import profileRouter from "./routes/profileRoute.js";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";
// import replyCommentRoute from "./routes/replyCommentRoute.js";
// import uploadRouter from "./routes/uploadRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database
connectDB();

app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
// app.use("/api/replies", replyCommentRoute);
// app.use("/api/uploads", uploadRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
