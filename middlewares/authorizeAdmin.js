// middleware/authorizeAdmin.js
const authorizeAdmin = (req, res, next) => {
  if (req.user.type !== "admin") {
    return res.status(403).send("Access denied. Admins only.");
  }
  next();
};

export default authorizeAdmin;
