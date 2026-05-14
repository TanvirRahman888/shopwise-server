import express from "express";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { protect } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/admin/all", protect, authorizeRoles("admin"), getAdminProducts);

router.post("/", protect, authorizeRoles("admin"), createProduct);
router.patch("/:id", protect, authorizeRoles("admin"), updateProduct);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

export default router;