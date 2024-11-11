import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { adminDashboard } from "../middleware/adminAccess";
import { ROLE } from "../models/userModel";
import { activeSessions } from "../app";
router.use(express.json());

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, adminDashboard(ROLE.ADMIN), (req, res) => {
  res.render("admin", {
    user: req.user,
    role: req.user?.role,
    activeSessions: Object.values(activeSessions),
  });
});

router.delete("/revoke-session/:sessionID", (req, res) => {
  const { sessionID } = req.params;

  if (activeSessions[sessionID]) {

    delete activeSessions[sessionID];

    console.log(`Session ${sessionID} has been revoked.`);
    res.json({
      success: true,
      message: `Session ${sessionID} successfully revoked.`,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Session not found.",
    });
  }
});

export default router;
