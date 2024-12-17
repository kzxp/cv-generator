import type { RouteRecord } from "vite-react-ssg";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import { lazy } from "react";

/* // FIXME: VERY LEGACY CODE, need to refactor and migrate to TS soon lol. */

const CV = lazy(() => import("./epics/CV"));
const Stuffs = lazy(() => import("./epics/stuffs"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <CV />,
  },
  {
    path: "/stuffs",
    element: <Stuffs />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default App;
