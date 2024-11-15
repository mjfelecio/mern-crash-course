import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

// Routes are something that we use to guide the user to a specific path depending purpose
// In the case of backend, these are api endpoints that the front end can access to get a specific information.
// If it were in the frontend, routes are something that points to a specific page on a website.
// Eg. wishlist.com/wishlist, wishlist.com/add-wish, or wishlist.com/edit-wish
// Depending on what is put on the "/" will determine what page you are accessing

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

// :id - means that the value there can be dynamic, like a variable
router.delete("/:id", deleteProduct);

// Use app.patch if you only want to update some fields in the resource
// Use app.put otherwise. Though it's not that important for general stuff
router.put("/:id", updateProduct);

export default router;