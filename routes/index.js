import  authRouter from "./auth.js";
import { Router } from "express";
import utilityRoute from "./utilityRoutes.js";
const route = Router();

route.use("/user",authRouter)
route.use('/utils',utilityRoute)
export default route