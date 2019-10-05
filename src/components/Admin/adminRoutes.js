// This file should serve as main Router config object
// for the whole admin panel

import Dashboard from './Dashboard';
import Users from './Users';
import RentalDataByAdmin from './RentalData/AddedByAdmin';
import RentalData from './RentalData';

const adminRoutes = [
  {
    path: '/control-panel',
    exact: true,
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/control-panel/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/control-panel/rental-data/rental-added',
    exact: true,
    name: 'RentalDataByAdmin',
    component: RentalDataByAdmin,
  },
  {
    path: '/control-panel/rental-data',
    name: 'RentalData',
    component: RentalData,
  },
];

export default adminRoutes;
