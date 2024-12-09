import React from "react";
import CVBase from "./cvbase";
import CVProvider from "./context";
import PDF from "./pdf";

const CV = () => (
	<div className="cv">
		<div className="scrollable">
			<div className="cvBody">
				<CVProvider>
					<CVBase />
				</CVProvider>
				{process.env.NODE_ENV !== "production" && <PDF />}
			</div>
		</div>
	</div>
);

export default CV;
