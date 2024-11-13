import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

// :id - means that the value there can be dynamic, like a variable
router.delete("/:id", deleteProduct);

// Use app.patch if you only want to update some fields in the resource
// Use app.put otherwise. Though it's not that important for general stuff
router.put("/:id", updateProduct);

export default router;