export const routes = {
  DASHBOARD: "/control-panel/",
  USERS: "/control-panel/users",
  USERS_ALL: "/control-panel/users/",
  USERS_VERIFY: "/control-panel/users/verify",
  USERS_SUPER_REQ: "/control-panel/users/super-req",
  USERS_VERIFIED: "/control-panel/users/verified",
  USERS_SUPER: "/control-panel/users/super",
  RENTAL_DATA: "/control-panel/rental-data",
  RENTAL_DATA_ALL: "/control-panel/rental-data/",
  RENTAL_DATA_SINGLE: "/control-panel/rental-data/single-view",
  RENTAL_DATA_VERIFY: "/control-panel/rental-data/verify",
  RENTAL_DATA_VERIFIED: "/control-panel/rental-data/verified",
};

export const menuElements = [
  {
    title: "Dashboard",
    icon: "dashboard",
    route: "/",
  },
  {
    title: "Users",
    route: "/users",
    icon: "user",
    items: [
      // {
      //   title: "All",
      //   route: "/",
      // },
      {
        title: "My verified users",
        route: "/verified",
      },
      {
        title: "My super users",
        route: "/super",
      },
      {
        title: "Awaiting verification",
        route: "/verify",
      },
      {
        title: "Requested Street Rep",
        route: "/super-req",
      },

    ],
  },
  {
    title: "Rental Data",
    route: "/rental-data",
    icon: "bar-chart",
    items: [
      {
        title: "My members' data",
        route: "/",
      },
      // {
      //   title: "My verified data",
      //   route: "/verified",
      // },
      // {
      //   title: "Awaiting verification",
      //   route: "/verify",
      // },
      // {
      //   title: "My added data",
      //   route: "/rental-added",
      // },
    ],
  },
];
