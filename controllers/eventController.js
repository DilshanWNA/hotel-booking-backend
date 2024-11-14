import Event from "../models/event.js";
import { isAdmin } from "./userController.js";


export function persist(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    const newEvent = new Event(req.body);
    newEvent.save()
        .then((event) => {
            res.status(201).json({
                message: "Event Created Successful",
                event: event
            })
        })
        .catch((err) => {
            if (err.message.includes("name_1")) {
                res.status(409).json({ message: "Event is already created" })
            }
            else {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            }
        })
}