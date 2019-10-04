export const routes = {
  DASHBOARD: '/control-panel/',
  USERS: '/control-panel/users',
  USERS_ALL: '/control-panel/users/',
  USERS_VERIFY: '/control-panel/users/verify',
  USERS_SUPER_REQ: '/control-panel/users/super-req',
  USERS_VERIFIED: '/control-panel/users/verified',
  USERS_SUPER: '/control-panel/users/super',
  RENTAL_DATA: '/control-panel/rental-data',
  RENTAL_DATA_ALL: '/control-panel/rental-data/',
  RENTAL_DATA_SINGLE: '/control-panel/rental-data/single-view',
  RENTAL_DATA_VERIFY: '/control-panel/rental-data/verify',
  RENTAL_DATA_VERIFIED: '/control-panel/rental-data/verified',
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
        route: '/super-req',
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
