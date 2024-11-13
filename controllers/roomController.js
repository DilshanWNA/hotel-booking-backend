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

export function retrieve(req, res) {
    Room.find()
        .then((rooms) => {
            if (rooms.length === 0) {
                return res.status(404).json({ message: "Rooms not found" });
            }
            res.status(200).json(rooms)
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function update(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Room.updateOne({ number: req.body.number }, req.body)
        .then(() => {
            res.status(200).json({ message: "Room Update Successful" });
        })
        .catch(() => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function remove(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Room.deleteOne({ number: req.params.number })
        .then(() => {
            res.status(200).json({ message: "Room Delete Successful" });
        })
        .catch(() => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}