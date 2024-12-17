import React, { lazy } from "react";
import CVBase from "./cvbase";
import CVProvider from "./context";
import { ClientOnly } from "vite-react-ssg";

const PDF = lazy(() => import("./pdf"));

const CV = () => (
  <div className="cv">
    <div className="scrollable">
      <div className="cvBody">
        <CVProvider>
          <CVBase />
        </CVProvider>
        <ClientOnly>
          {() => process.env.NODE_ENV !== "production" && <PDF />}
        </ClientOnly>
      </div>
    </div>
  </div>
);

export default CV;
