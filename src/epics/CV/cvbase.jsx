import React from "react";
import dayjs from "dayjs";
import { CVConsumer } from "./context";
import WorkExperience1 from "./details/work-experience-1.mdx";
import WorkExperience2 from "./details/work-experience-2.mdx";
import Qualification from "./details/qualification.mdx";
import Education from "./details/education.mdx";
import Interests from "./details/interests.mdx";

export const CV = ({
	Document,
	Page,
	Text,
	Image,
	View,
	Link,
	photo,
	styles,
	mdxComponents,
}) => (
	<Document title="Chankaseam's CV" author="Chankaseam">
		<Page style={styles.page}>
			<View style={styles.header.container}>
				<Text style={styles.header.title}>
					Chankaseam Thanaratkitjakarn (Knack)
				</Text>
			</View>
			<View style={styles.body.container}>
				<View style={styles.left.container}>
					<View style={styles.left.info}>
						<View style={styles.left.infoDetail}>
							<Text style={styles.left.detailTitle}>Date of birth</Text>
							<Text style={styles.left.detailBody}>
								20/05/1994 - {dayjs().diff("1994-05-20", "year")} years old
							</Text>
						</View>
						<View style={styles.left.infoDetail}>
							<Text style={styles.left.detailTitle}>Languages</Text>
							<Text style={styles.left.detailBody}>
								Thai (Native), English (Fluent)
							</Text>
						</View>
						<View style={{ ...styles.left.infoDetail, isWebHidden: true }}>
							<Text style={styles.left.detailTitle}>Mobile no.</Text>
							<Text style={styles.left.detailBody}>(+66) 080-226-5526</Text>
						</View>
						<View style={styles.left.infoDetail}>
							<Text style={styles.left.detailTitle}>E-mail</Text>
							<Text style={styles.left.detailBody}>
								<Link
									href="mailto:th.chankaseam@gmail.com"
									target="_blank"
									style={styles.left.link}
								>
									th.chankaseam@gmail.com
								</Link>
							</Text>
						</View>
						<View style={{ ...styles.left.infoDetail, isWebHidden: true }}>
							<Text style={styles.left.detailTitle}>Website</Text>
							<Link
								href="https://kzxp.github.io"
								target="_blank"
								style={styles.left.link}
							>
								kzxp.github.io
							</Link>
						</View>
						<View style={styles.left.infoDetail}>
							<Text style={styles.left.detailTitle}>GitHub</Text>
							<Link
								href="https://github.com/kzxp"
								target="_blank"
								style={styles.left.link}
							>
								kzxp
							</Link>
						</View>
					</View>
				</View>
				<View style={styles.right.container}>
					<Qualification components={mdxComponents} />
					<WorkExperience1 components={mdxComponents} />
				</View>
			</View>
		</Page>
		<Page style={styles.page}>
			<View style={styles.right.container}>
				<WorkExperience2 components={mdxComponents} />
				<Education components={mdxComponents} />
				{/* <Interests components={mdxComponents} /> */}
			</View>
		</Page>
	</Document>
);

export default CVConsumer(CV);
