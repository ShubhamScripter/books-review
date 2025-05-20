const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("auth middleware called");
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
        console.log("token is:",token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token is:",decoded);
        req.user = decoded;
        next();
    } catch(error) {
        res.status(401).json({ message: error.message });
    }
};
