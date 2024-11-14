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

export function retrieve(req, res) {
    Event.find()
        .then((events) => {
            if (events.length === 0) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.json(events)
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function update(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Event.updateOne({ name: req.body.name }, req.body)
        .then(() => {
            res.status(200).json({ message: "Event Update Successful" });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function remove(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Event.deleteOne({ name: req.params.name })
        .then(() => {
            res.status(200).json({ message: "Event Delete Successful" });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}