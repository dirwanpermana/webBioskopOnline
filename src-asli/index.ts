import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import connectDB from "./utils/database";
import adminRoutes from "./routes/adminRoutes";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import cors from "cors";
import { handleTopupBalance } from "./controllers/walletController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
// buka akses folder asset ke folder public
app.use(express.static("public"));

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// app.post("/api/global/handle-payment", handleTopupBalance);
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
