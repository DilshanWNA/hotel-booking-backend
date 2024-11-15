import Review from "../models/review.js";
import { isUser } from "./userController.js";


export function persist(req, res) {
    if (!isUser(req)) {
        return res.status(401).json({ message: "User access required" });
    }
    if (req.user.email != req.body.email) {
        return res.status(401).json({ message: "Wrong User" });
    }

    const newReview = new Review(req.body);
    newReview.save()
        .then((review) => {
            res.status(201).json({
                message: "Review Save Successful",
                review: review
            })
        })
        .catch((err) => {
            if (err.message.includes("id_1")) {
                res.status(409).json({ message: "Id is already used" })
            }
            else {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            }
        })
}

export function retrieve(req, res) {
    Review.find()
        .then((reviews) => {
            if (reviews.length === 0) {
                return res.status(404).json({ message: "Review not found" });
            }
            res.status(200).json(reviews);
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}