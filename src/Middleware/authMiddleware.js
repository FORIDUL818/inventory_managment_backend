let jwt=require("jsonwebtoken");
const userVarify=(req, res, next) => {
    let token = req.headers["token"];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ status: "fail", message: "Unauthorized" });
        } else {
            let email = decoded.email; 
            req.headers.email =email; 
            next();
        }
    });
};
 
module.exports = userVarify 