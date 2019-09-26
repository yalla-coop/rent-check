export const roles = {
  USER: 'user',
  SUPERUSER: 'superUser',
  ADMIN: 'admin',
};

export const roleEnum = Object.values(roles);

export const status = {
  UNVERIFIED: 'unverified',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  AWAITING_SUPER: 'awaitingSuperUser',
};

export const statusEnum = Object.values(status);

export const renderUserDetails = {
  // role
  user: 'User',
  superUser: 'Super User',
  admin: 'Admin',
  // status
  unverified: 'Unverified',
  verified: 'Verified',
  rejected: 'Rejected',
  awaitingSuperUser: 'Awaiting Super User',
};
