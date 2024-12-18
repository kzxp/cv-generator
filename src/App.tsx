import type { RouteRecord } from "vite-react-ssg";
import { Navigate, ScrollRestoration } from "react-router";
import { Layout } from "./components/layout";
import CV from "./epics/CV";
/* // FIXME: VERY LEGACY CODE, need to refactor and migrate to TS soon lol. */

const routes: RouteRecord[] = [
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    children: [
      {
        index: true,
        Component: CV,
      },
      {
        path: "stuffs",
        children: [
          {
            index: true,
            lazy: () => import("./epics/stuffs"),
          },
          {
            path: ":id",
            lazy: () => import("./epics/stuffs/[stuff]"),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export { routes };
