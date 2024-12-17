import { ViteReactSSG } from "vite-react-ssg";
import getStyledComponentsCollector from "vite-react-ssg/style-collectors/styled-components";
import { routes } from "./App";

export const createRoot = ViteReactSSG({ routes }, () => {}, {
  getStyleCollector: getStyledComponentsCollector,
});
