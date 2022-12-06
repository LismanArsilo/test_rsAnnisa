import "dotenv/config";
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import models, { sequelize } from "./models/init-models";
import cors from "cors";
import routes from "./routes/indexRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

// Route Api
app.use("/api/user", routes.userRouter);
app.use("/api/doctor", routes.doctorRouter);
app.use("/api/jadwalDoctor", routes.jadwalDoctorRoute);

// Handle Error Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something bad wrong !!!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.info("Database do not drop");
  }
  app.listen(port, () => {
    console.info("App listen in port " + port);
  });
});

export default app;
