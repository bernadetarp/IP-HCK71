function errorHandler(error, req, res, next) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: error.errors[0].message });
    } else if (error.name === "EmailRequired") {
        res.status(400).json({ message: "Email is required" });
    } else if (error.name === "PasswordRequired") {
        res.status(400).json({ message: "Password is required" });
    } else if (error.name === "AlreadyPaid") {
        res.status(400).json({ message: "You have paid for this transaction" })
    } else if (error.name === "InvalidLogin") {
        res.status(401).json({ message: "Invalid Email or Password" });
    } else if (error.name === "Unauthorized") {
        res.status(401).json({ message: error.message });
    } else if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Invalid Token" });
    } else if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Expired Login Session" })
    } else if (error.name === "Forbidden") {
        res.status(403).json({ message: error.message });
    } else if (error.name === "DataUndefined") {
        res.status(404).json({ message: "Data Not Found" });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = errorHandler;