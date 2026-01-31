export const permission = (requiredRoles) => {
  return async (req, res, next) => {
    const userRoles = (req.user && req.user.roles) || [];
    const required = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    const hasRole = required.some((r) => userRoles.includes(r));

    if (!hasRole) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don't have permissions" });
    }

    next();
  };
};
