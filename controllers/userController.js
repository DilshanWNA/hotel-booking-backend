import User from "../models/user.js";
import passwordHash from "password-hash"


export function persist(req, res) {

    const regex = /^0\d{9}$/;
    if (!regex.test(req.body.whatsappNo)) {
        return res.json({ message: "Please enter valid whatsapp number" })
    }
    if (!regex.test(req.body.phoneNo)) {
        return res.json({ message: "Please enter valid phone number" })
    }

    req.body.password = passwordHash.generate(req.body.password); // password hash
    const newUser = new User(req.body);
    newUser.save().then((user) => {
        res.json({
            message: "User Registration Successful",
            user: user
        })
    }).catch((err) => {
        const errorMessage = err.errorResponse.errmsg;
        if (errorMessage.includes("email_1")) {
            res.json({ message: "User is already registered" })
        }
        else if (errorMessage.includes("whatsappNo_1")) {
            res.json({ message: "WhatsApp number is already used" })
        }
        else if (errorMessage.includes("phoneNo_1")) {
            res.json({ message: "Phone number is already used" })
        }
        else {
            res.json({ message: "User Registration Fail", error: err })
        }
    })
}