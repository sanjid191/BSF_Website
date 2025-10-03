# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## BSF frontend scaffold

This workspace contains the initial frontend scaffold for the BASIS Student Forum — GUB chapter website.

To run locally (PowerShell):

```powershell
npm install
npm run dev
```

Files added by the scaffold include:

- `tailwind.config.cjs`, `postcss.config.cjs`
- `src/components` (Header, Footer, Layout, ProtectedRoute)
- `src/pages` (Home, Projects, Members, Notices) and `src/pages/admin` (Login, Dashboard)

Next steps: wire authentication, implement admin CRUD connected to your Spring Boot API, and add content/assets.
