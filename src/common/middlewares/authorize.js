export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.User) {
      return res.status(403).json({ message: "Không xác thực" });
    }

    if (!allowedRoles.includes(req.User.role)) {
      return res.status(403).json({ message: "Không đủ quyền" });
    }

    next();
  };
};
