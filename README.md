# innoMarket

A single-page marketplace application built as a frontend internship task. Storefront plus a self-contained back-office (admin panel), with routing, global state, cached API data, and a hand-written Webpack build.

**Live demo:** https://innomarket.netlify.app/

## Features

**Storefront**

- Catalog with search, brand / category / colour / price / sale-on filters, and price sorting.
- Product detail page with an image gallery, specs, and add-to-cart / favourite actions.
- Favourites (likes) and reservations (cart) pages, both backed by global state.
- All shops, Become a merchant, and About us pages.
- Log in to an account page; the cart and favourites persist across reloads.

**Admin panel** (`/admin`)

- Maintain Items table: search, per-row and bulk delete for locally-added items, statuses, and an "Add an Item" modal.
- Add New User page (`/admin/users/new`).
- Items created in the admin panel appear on the storefront as well.

## Tech stack

- **React 18** — function components and hooks.
- **React Router 6** — `createBrowserRouter` + `RouterProvider`.
- **Redux Toolkit 2** with **RTK Query** for data fetching and caching.
- **Native CSS** only (one stylesheet per component, BEM-ish class names); no UI component libraries. `react-icons` is used for icons.
- **Custom Webpack 5** build — no Create React App, no Vite.

Data comes from the [DummyJSON](https://dummyjson.com/) API.

## Getting started

Requires Node.js 18+ and npm.

```bash
npm install      # install dependencies
npm run dev      # webpack dev server on http://localhost:3000
npm run build    # production build into dist/
```

`npm start` is an alias of `npm run dev`. The dev server opens a browser, enables hot reload, and resolves SPA routes via `historyApiFallback`.

## Project structure

```
src/
  app/          Redux store, RTK Query API, slices, localStorage persistence
  components/   shared layout and UI components
  pages/        route-level pages (storefront + admin)
  mocks/        deterministic mock data derived from product ids
  styles/       one CSS file per component
  routes.jsx    route definitions
  index.js      app entry
```

## Demo accounts

- Storefront login: `emilys` / `emilyspass` (a DummyJSON user).
- Admin panel: log in with `admin` / `admin` to land on `/admin`.

## Notes on data

DummyJSON only provides product `title`, `brand`, `price`, `discountPercentage`, `thumbnail`, `images`, `category`, and `description`. Everything else the UI shows — size, colour, delivery time, `New` / `Reserved` tags, partner shops, and the admin-panel columns — is generated in `src/mocks/`, derived deterministically from `product.id` so values stay stable across re-renders. Some DummyJSON images are unreliable, so a placeholder fallback is used.

## Dependencies

**Runtime**

- `react`, `react-dom`
- `react-router-dom`
- `@reduxjs/toolkit`, `react-redux`
- `react-icons`

**Build / tooling**

- `webpack`, `webpack-cli`, `webpack-dev-server`
- `babel-loader`, `@babel/core`, `@babel/preset-env`, `@babel/preset-react`
- `css-loader`, `style-loader`, `mini-css-extract-plugin`, `css-minimizer-webpack-plugin`
- `postcss`, `postcss-loader`, `autoprefixer`
- `html-webpack-plugin`

## Deployment

Deployed on Netlify (`innomarket.netlify.app`). The build is configured in `netlify.toml` (`npm run build` → publish `dist/`, with an SPA fallback rewrite so client-side routes resolve on direct load). Pushing to `main` triggers a rebuild and redeploy.
