import { Home, Product } from "../pages";

export default [
  {
    path: ["/home", "/"],
    exact: true,
    component: Home,
  },
  {
    path: "/product",
    component: Product,
  },
];
