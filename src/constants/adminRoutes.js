export const routes = {
  DASHBOARD: '/admin/',
  USERS: '/admin/users',
  USERS_ALL: '/admin/users/',
  USERS_VERIFY: '/admin/users/verify',
  USERS_SUPER_REQ: '/admin/users/super-req',
  USERS_VERIFIED: '/admin/users/verified',
  USERS_SUPER: '/admin/users/super',
  RENTAL_DATA: '/admin/rental-data',
  RENTAL_DATA_ALL: '/admin/rental-data/',
  RENTAL_DATA_VERIFY: '/admin/rental-data/verify',
  RENTAL_DATA_VERIFIED: '/admin/rental-data/verified',
};

export const menuElements = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    route: '/',
  },
  {
    title: 'Users',
    route: '/users',
    icon: 'user',
    items: [
      {
        title: 'All',
        route: '/',
      },
      {
        title: 'Awaiting verification',
        route: '/verify',
      },
      {
        title: 'Requested super user privileges',
        route: '/super-request',
      },
      {
        title: 'My verified users',
        route: '/verified',
      },
      {
        title: 'My super users',
        route: '/super',
      },
    ],
  },
  {
    title: 'Rental Data',
    route: '/rental-data',
    icon: 'bar-chart',
    items: [
      {
        title: 'All',
        route: '/',
      },
      {
        title: 'Awaiting verification',
        route: '/rental-verify',
      },
      {
        title: 'My verified data',
        route: '/rental-verified',
      },
    ],
  },
];