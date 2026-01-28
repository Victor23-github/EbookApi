import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import routes from "./Routes/index.route.js";
import { storage } from "./config/multer.js";

const app = express();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024000,
  },
});

//security middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan(":method :url :status :response-time ms"));

//body parsing
app.use(upload.single("image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MAIN OR ROOT URL
app.get("/", (req, res) => {
  res.send("Welcome to Vantage Publishers International website");
});

app.use("/api", routes);

export default app;
