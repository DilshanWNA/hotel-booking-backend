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