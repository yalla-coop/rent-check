const roles = {
  USER: "user",
  SUPERUSER: "superUser",
  ADMIN: "admin",
};

const roleEnum = Object.values(roles);

const status = {
  UNVERIFIED: "unverified",
  VERIFIED: "verified",
  REJECTED: "rejected",
  AWAITING_SUPER: "awaitingSuperUser",
};

const statusEnum = Object.values(status);

module.exports = { roles, roleEnum, status, statusEnum };
