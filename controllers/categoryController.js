import Category from "../models/category.js";
import { isAdmin } from "./userController.js";

export function persist(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required"});
    }

    const newCategory = new Category(req.body);
    newCategory.save()
        .then((category) => {
            res.json({
                message: "Category creation Successful",
                category: category
            })
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}