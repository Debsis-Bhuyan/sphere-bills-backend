import { Router } from "express";
const router = Router();


import { feedbackForm, helpForm, sendInvoice } from "../controller/utilityController.js";
import authenticateUser from "../middleware/authMiddleware.js";

router.post("/feedback",authenticateUser, feedbackForm);
router.post("/help", helpForm);
router.post('/generate-invoice-pdf', sendInvoice )
// app.post("/api/generate-invoice-pdf", (req, res) => {

export default router;
