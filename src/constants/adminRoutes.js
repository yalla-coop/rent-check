export const routes = {
  DASHBOARD: "/admin",
  USERS: "/admin/users",
};


export const menuElements = [
  {
    title: "Dashboard",
    route: "/"
  },
  {
    title: "Users",
    route: "/users",
    items: [
      {
        title: "All",
        route: "/"
      },
      {
        title: "Awaiting verification",
        route: "/users-verify"
      },
      {
        title: "Requested super user privileges",
        route: "/super-request"
      },
      {
        title: "My verified users",
        route: "/my-verified"
      },
      {
        title: "My super users",
        route: "/my-super"
      }
    ]
  },
  {
    title: "Rental Data",
    route: "/rental-data",
    items: [
      {
        title: "All",
        route: "/"
      },
      {
        title: "Awaiting verification",
        route: "/rental-verify"
      },
      {
        title: "My verified data",
        route: "/rental-verified"
      }
    ]
  },
];