import Room from "../models/room.js";
import { isAdmin } from "./userController.js";

export function persist(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    const newRoom = new Room(req.body);
    newRoom.save()
        .then((room) => {
            res.status(201).json({
                message: "Room added successful",
                room: room
            })
        })
        .catch((err) => {
            if (err.message.includes("number_1")) {
                res.status(409).json({ message: "Room is already created" })
            }
            else {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            }

        })
}