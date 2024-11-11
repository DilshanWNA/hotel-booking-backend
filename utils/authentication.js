import jwt from "jsonwebtoken"

export default function authenticate(req, res, next) {

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (decoded) {
                req.user = decoded;
                console.log(decoded);

                next();
            }
            else if (err) {
                res.json("Unauthorized");
            }
            else next();
        })
    } else next();
}