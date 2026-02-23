import express from "express";
import { getRecommendations, matchCounselors, getJobs } from "../controllers/careerController.js";

const router = express.Router();

router.post("/ai/recommendations", getRecommendations);
router.post("/counselors/match", matchCounselors);
router.get("/jobs", getJobs);

export default router;
