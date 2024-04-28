import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import specialistRoutes from "./routes/specialistRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import publicFeedbackRoutes from "./routes/publicFeedbackRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminappointmentRoutes from "./routes/adminappointmentRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import webImageRoutes from "./routes/webImageRoutes.js";
import rateLimit from "express-rate-limit";

const port = process.env.PORT || 5000;
connectDB();

const app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/specialists", specialistRoutes);
app.use("/api/webimage", webImageRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/appointments", adminappointmentRoutes);
app.use(limiter);
app.use("/api/appointments", appointmentRoutes);
//app.set("trust proxy", true); //Need to resolve later with the correct IP. essentially, app.set('trust proxy', ['127.0.0.1', 'localhost'])
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/pfeedback", publicFeedbackRoutes);
const __dirname = path.resolve(); //set __dirname to current dir
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
