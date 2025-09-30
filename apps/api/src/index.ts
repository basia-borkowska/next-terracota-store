import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import pino from "pino";
import cookieParser from "cookie-parser";
import session from "express-session";
import pinoHttp from "pino-http";
import { env } from "./env.js";
import { health } from "./routes/health.js";
import { products } from "./routes/products.js";
import { campaigns } from "./routes/campaigns.js";
import { auth } from "./routes/auth.js";

const app = express();

if (env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
}

app.use(helmet());
app.use(
  cors({
    origin: env.WEB_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  pinoHttp({
    logger: pino({ level: env.NODE_ENV === "development" ? "debug" : "info" }),
  })
);

// session middleware
app.use(
  session({
    name: env.SESSION_NAME,
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
    },
  })
);

// routes
app.use("/api", health);
app.use("/api", products);
app.use("/api", campaigns);
app.use("/api", auth);

// error handler
app.use(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction
  ) => {
    req.log?.error({ err }, "Unhandled error");
    const status = err?.status || 500;
    res.status(status).json({
      error: err?.message || "Internal server error",
      status,
    });
  }
);

app.listen(env.PORT, () => {
  console.log(`Server listening on port http://localhost:${env.PORT}`);
});
