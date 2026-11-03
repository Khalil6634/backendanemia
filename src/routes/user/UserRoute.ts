import { Router } from "express";
import { handleGetTtdLogs } from "../../controler/user/getTTDLog.js";
import { handleGetCalendarView } from "../../controler/user/getLogTTDCalendar.js";
import { handleSignup } from "../../controler/user/Signup.js";
import { handleUpdateProfile } from "../../controler/user/editProfile.js";
import { handleUpdateTtd } from "../../controler/user/UpdateStatusTTD.js";
import { verifyToken } from "../../middleware/ValidateToken.js";
import { handleLogin } from "../../controler/Logint.js";

export const UserRouter = Router();

UserRouter.get("/getTTDLog", verifyToken, handleGetTtdLogs);
UserRouter.get("/getTTDKalendar", verifyToken, handleGetCalendarView);

UserRouter.post("/login", handleLogin);

UserRouter.post("/Signup", handleSignup);
UserRouter.patch("/UpdateUser", handleUpdateProfile);
UserRouter.patch("/UpdateTTD", verifyToken, handleUpdateTtd);
