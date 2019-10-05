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

export const renderUserDetails = (userRole, userStatus) => {
  switch (userRole) {
    case roles.ADMIN:
      return 'Admin';
    case roles.SUPERUSER:
      return 'Street Rep';
    default:
      return userStatus !== 'unverified' ? 'Verified' : '';
  }
};
