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
        <Route path="/" element={<CV />} />
        <Route path="/stuffs" element={<Stuffs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
