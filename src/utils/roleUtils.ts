export const hasRequiredRole = (userRoles: string[], requiredRole: string, hierarchy: string[]) => {
  const userHighestRole = hierarchy.find((role) => userRoles.includes(role));
  const requiredLevel = hierarchy.indexOf(requiredRole);

  return userHighestRole && hierarchy.indexOf(userHighestRole) <= requiredLevel;
};

export const roleHierarchy = ["ROOT", "ADMIN", "USER"];
