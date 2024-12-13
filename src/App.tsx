import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";

/* // FIXME: VERY LEGACY CODE, need to refactor and migrate to TS soon lol. */
import CV from "./epics/CV";
import Stuffs from "./epics/stuffs";

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
