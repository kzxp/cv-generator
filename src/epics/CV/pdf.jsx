import React from "react";
import ReactPDF, { Text, Page, PDFViewer, Document, View, StyleSheet } from "@react-pdf/renderer";
import CVProvider, { OUTPUT_PDF, PDF } from "./context";
import CV from "./cvbase";

// if (typeof window !== "undefined") {
//   Font.register({
//     family: "Roboto",
//     src: `${window.location.origin}/_next/static/fonts/roboto-latin-400.woff`
//   });
//   Font.register({
//     family: "Roboto Italic",
//     src: `${window.location.origin}/_next/static/fonts/roboto-latin-400italic.woff`
//   });
//   Font.register({
//     family: "Roboto Bold",
//     src: `${window.location.origin}/_next/static/fonts/roboto-latin-700.woff`
//   });
// } else {
//   const path = require("path");
//   Font.register({
//     src: path.resolve(
//       "node_modules/typeface-roboto/files/roboto-latin-400.woff"
//     ),
//     family: "Roboto"
//   });
//   Font.register({
//     src: path.resolve(
//       "node_modules/typeface-roboto/files/roboto-latin-400italic.woff"
//     ),
//     family: "Roboto Italic"
//   });
//   Font.register({
//     src: path.resolve(
//       "node_modules/typeface-roboto/files/roboto-latin-700.woff"
//     ),
//     family: "Roboto Bold"
//   });
// }


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export const Previewer = () => (
	<div>
		<div className="pdf-dev">
			<PDFViewer width="2000" height="2000">
				<CVProvider output={OUTPUT_PDF}>
					<CV />
				</CVProvider>
			</PDFViewer>
		</div>

	</div>
);

export const buildPDF = () => {
	const fileName = `static/ChankaseamCV.pdf`;
	const path = require("path");
	ReactPDF.render(
		<CVProvider output={OUTPUT_PDF}>
			<CV />
		</CVProvider>,
		path.resolve(fileName)
	);
	return fileName;
};

export default () => (
	<div>
		<Previewer />
	</div>
);
