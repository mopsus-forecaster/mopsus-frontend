import { ROLES_ENUM } from '../PrivateRoutes';

export const defaultRouteByRole = (roles) => {
  if (roles.includes(ROLES_ENUM.admin)) {
    return 'inicio';
  }

  if (roles.includes(ROLES_ENUM.reports_operator)) {
    return 'inicio';
  }
  if (roles.includes(ROLES_ENUM.sales_operator)) {
    return 'ventas';
  }

  if (roles.includes(ROLES_ENUM.incomes_operator)) {
    return 'productos';
  }
};
