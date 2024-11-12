import Category from "../models/category.js";
import { isAdmin } from "./userController.js";

export function persist(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    const newCategory = new Category(req.body);
    newCategory.save()
        .then((category) => {
            res.status(201).json({
                message: "Category Creation Successful",
                category: category
            })
        })
        .catch((err) => {
            const errorMessage = err.errorResponse.errmsg;
            if (errorMessage.includes("name_1")) {
                res.status(409).json({ message: "Category is already created" })
            }
            else {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            }
        })
}

export function retrieve(req, res) {
    Category.find().then((categories) => {
        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(categories);
    }).catch((err) => {
        res.status(500).json({ message: "Server error occurred", error: err.message });
    })
}