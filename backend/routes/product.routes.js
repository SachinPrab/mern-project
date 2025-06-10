import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controllers.js";
const router = express.Router();

router.post("/", createProduct);
router.get("/", getProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;