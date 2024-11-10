import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token =
    req.cookies?.jwt_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden", error: err.message });
    }
    req.user = decoded;
    next();
  });
};

export default authenticateToken;
