// src/shared/lib/pathnames.ts

export const pathnames = {
  login: "/login",
  register: "/register",
  logout: "/logout",
  home: "/",
  products: "/products",
  product: (id: string) => `/products/${id}`,
  compare: "/compare",
  wishList: "/wishlist",
  newProducts: "/new-products",
  inspirations: "/inspirations",
  checkout: {
    root: "/checkout",
    shipping: "/checkout/shipping",
    payment: "/checkout/payment",
    review: "/checkout/review",
    confirmation: "/checkout/confirmation",
  },
} as const;

export const withLocale = (locale: string, path: string) => `/${locale}${path}`;
