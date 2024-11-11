import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import passportMiddleware from './middleware/passportMiddleware';

const port = process.env.port || 8000;

const app = express();

// Week09 - Have to move this to TUser file
declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email?: string;
      password?: string;
      role?: string;
      githubId?: string | undefined;
    }
    interface Session {
      userId?: number;
      role?: string;
      activities?: Array<{
        timestamp: Date;
        activity: string;
      }>;
    }
  }
}

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
passportMiddleware(app);

// Data we've got from passport middleware
export const activeSessions: Record<string, { user: string, userId: string, role: string, sessionID: string }> = {};

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log((req.session as any).passport);

  if (req.session && req.user) {
    activeSessions[req.sessionID] = {
      user: req.user.id.toString(),
      userId: req.user.id.toString(),
      role: req.user.role || "unknown",
      sessionID: req.sessionID,
    };
  }
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
