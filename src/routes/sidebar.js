/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Tablero", // name that appear in Sidebar
  },
  {
    path: "/app/orders",
    icon: "CartIcon",
    name: "Pedidos",
  },
  {
    icon: "TruckIcon",
    name: "Productos",
    routes: [
      {
        path: "/app/all-products",
        name: "Todos los Productos",
      },
      {
        path: "/app/add-product",
        name: "Agregar Producto",
      },
      {
        path: "/app/categories",
        name: "Categorías",
      },
      {
        path: "/app/add-category",
        name: "Agregar Categoría",
      },
    ],
  },
  {
    path: "/app/settings",
    icon: "OutlineCogIcon",
    name: "Configuración",
  },
  {
    path: "/app/logout",
    icon: "OutlineLogoutIcon",
    name: "Cerrar Sesión",
  },
];

export default routes;
