import User from "../models/user.js";
import passwordHash from "password-hash"
import jwt from "jsonwebtoken"


export function persist(req, res) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNoRegex = /^0\d{9}$/;

    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ message: "Please enter valid email address" })
    }
    if (!phoneNoRegex.test(req.body.whatsappNo)) {
        return res.status(400).json({ message: "Please enter valid whatsapp number" })
    }
    if (!phoneNoRegex.test(req.body.phoneNo)) {
        return res.status(400).json({ message: "Please enter valid phone number" })
    }

    req.body.password = passwordHash.generate(req.body.password); // password hash
    const newUser = new User(req.body);
    newUser.save().then((user) => {
        res.status(201).json({
            message: "User Registration Successful",
            user: user
        })
    }).catch((err) => {
        const errorMessage = err.errorResponse.errmsg;
        if (errorMessage.includes("email_1")) {
            res.status(409).json({ message: "User is already registered" })
        }
        else if (errorMessage.includes("whatsappNo_1")) {
            res.status(409).json({ message: "WhatsApp number is already used" })
        }
        else if (errorMessage.includes("phoneNo_1")) {
            res.status(409).json({ message: "Phone number is already used" })
        }
        else {
            res.status(500).json({ message: "User Registration Fail", error: err })
        }
    })
}

export function login(req, res) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ message: "Please enter valid email address" })
    }

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user || user.disabled) {
                return res.status(400).json({ message: "User not found" });
            }
            if (!passwordHash.verify(req.body.password, user.password)) {
                return res.status(400).json({ message: "Password is incorrect" });
            }

            const payload = {
                email: user.email,
                firstName: user.firstName,
                phoneNo: user.phoneNo,
                type: user.type
            }
            const token = jwt.sign(payload, process.env.JWT_KEY) // jWT token generate
            res.status(201).json({
                message: "User Login Successful",
                user: payload,
                token: token
            })

        }).catch((err) => {
            res.status(500).json({ message: "User Login Fail", error: err })
        })
}

export function retrieve(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    User.find()
        .then((users) => {
            if (users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function update(req, res) {
    if (!isHaveUser(req)) {
        return res.status(401).json({ message: "Registered user access required" });
    }

    User.updateOne({ email: req.body.email }, req.body)
        .then(() => {
            res.status(200).json({ message: "User Update Successful" });
        }).catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function remove(req, res) {
    if (!isHaveUser(req)) {
        return res.status(401).json({ message: "Registered user access required" });
    }
    if (isUser(req) && req.user.email != req.params.email) {
        return res.status(401).json({ message: "Actual user access required" });
    }

    User.deleteOne({ email: req.params.email })
        .then(() => {
            res.status(200).json({ message: "User Delete Successful" });
        }).catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function findByPhoneNo(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    User.findOne({ phoneNo: req.params.phoneNo })
        .then((user) => {
            if (user) {
                res.status(200).json({
                    message: "User found",
                    user: user
                });
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        })
}

// Check if user exists
export function isHaveUser(req) {
    if (req.user) {
        return true
    }
    return false
}

// Check if the existing user is an admin
export function isAdmin(req) {
    if (req.user && req.user.type == "admin") {
        return true
    }
    return false
}

// Check if the existing user is a normal user
export function isUser(req) {
    if (req.user && req.user.type == "user") {
        return true
    }
    return false
}