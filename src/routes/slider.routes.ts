import express from "express";
import {
  createSlider,
  deleteSlider,
  getActiveSliders,
  getSliders,
  updateSlider,
} from "../controllers/slider.controller";
import { protect } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = express.Router();

router.get("/active", getActiveSliders);

router.get("/", protect, authorizeRoles("admin"), getSliders);
router.post("/", protect, authorizeRoles("admin"), createSlider);
router.patch("/:id", protect, authorizeRoles("admin"), updateSlider);
router.delete("/:id", protect, authorizeRoles("admin"), deleteSlider);

export default router;