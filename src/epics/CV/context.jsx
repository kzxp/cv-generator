import React from "react";
import { MDXProvider } from "@mdx-js/react";

import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";

import { styled } from "styled-components";

export const OUTPUT_WEB = "OUTPUT_WEB";
export const OUTPUT_PDF = "OUTPUT_PDF";

export const styles = {
  hr: StyleSheet.create({
    height: "2px",
    width: "40px",
    backgroundColor: "#273c75",
    bordeBottom: "1px solid",
    marginBottom: "10px",
  }),
  page: StyleSheet.create({
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
  }),
  header: StyleSheet.create({
    container: {
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: "#273c75",
      borderBottomStyle: "solid",
      alignItems: "stretch",
    },
    title: {
      fontSize: "20pt",
      // fontFamily: "Roboto Bold",
      textTransform: "uppercase",
    },
    subtitle: {
      fontSize: "14pt",
      // fontFamily: "Roboto Bold",
      textTransform: "uppercase",
    },
  }),
  body: StyleSheet.create({
    container: {
      paddingTop: 5,
      flexDirection: "column",
    },
  }),
  left: StyleSheet.create({
    container: {
      flexGrow: 0,
      flexDirection: "row",
      alignItems: "center",
      overflowX: "auto",
    },
    photo: {
      width: "80pt",
      height: "100pt",
    },
    info: {
      flexDirection: "column",
      flexWrap: "wrap",
      maxHeight: "110pt",
      flex: "1",
    },
    infoDetail: {
      margin: 5,
    },
    title: {
      color: "white",
      backgroundColor: "#000",
      fontSize: "14pt",
      // fontFamily: "Roboto Bold",
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 5,
      paddingLeft: 5,
      textTransform: "uppercase",
    },
    detail: {
      marginTop: 5,
      marginBottom: 5,
    },
    detailTitle: {
      // fontFamily: "Roboto Bold",
      fontWeight: "bold",
      fontSize: "14pt",
    },
    detailBody: {
      fontSize: "12pt",
    },
    link: {
      fontSize: "12pt",
      color: "#000",
    },
  }),
  right: StyleSheet.create({
    container: {
      flexGrow: 0,
      isWebHidden: false, // Changed to false to show in web view
    },
    title: {
      color: "white",
      // fontFamily: "Roboto Bold",
      backgroundColor: "#273c75",
      fontSize: "14pt",
      fontWeight: "bold",
      marginBottom: 5,
      textTransform: "uppercase",
      textAlign: "center",
    },
    detailTitle: {
      // fontFamily: "Roboto Bold",
      fontWeight: "bold",
      fontSize: "14pt",
    },
    detailSubTitle: {
      fontSize: "12pt",
      float: "right",
    },
    detailContainer: {
      fontSize: "12pt",
      marginBottom: 15,
    },
    get detailParagraphContainer() {
      return {
        ...this.detailContainer,
        lineHeight: "1.25",
      };
    },
    detailText: {
      fontSize: "12pt",
      marginTop: 5,
      display: "flex",
      flexDirection: "row",
    },
    nestedList: {
      marginLeft: 20,
    },
    nestedListText: {
      display: "flex",
      flexDirection: "column",
    },
  }),
};

const webStyles = styles;
const CachedElement = new Map();
const HackyElementCreator = (Tag) => {
  return ({ style = {}, ...props }) => {
    // Take out fontFamily property to prevent overwriting.\
    const { fontFamily, isWebHidden, ...pickedStyled } = style;
    if (isWebHidden) return null;

    let StyledComponent;
    const stringifyStyle = `${Tag}.${JSON.stringify(style)}`;

    if (!CachedElement.has(stringifyStyle)) {
      console.log(styled.h5);
      StyledComponent = styled[Tag]({
        display: "flex",
        flexDirection: "column",
        ...pickedStyled,
      });

      CachedElement.set(stringifyStyle, StyledComponent);
    } else {
      StyledComponent = CachedElement.get(stringifyStyle);
    }
    const Rendered = <StyledComponent {...props} />;
    return Rendered;
  };
};

const DivTag = HackyElementCreator("div");
const ATag = HackyElementCreator("a");

export const Web = {
  Document: DivTag,
  Page: DivTag,
  Text: DivTag,
  Image: "img",
  View: DivTag,
  Link: ATag,
  photo: "",
  styles: webStyles,
};

export const PDF = {
  Document,
  Page,
  Text,
  Image,
  View,
  Link,
  photo: "",
  styles,
};

export const TargetedOutput = process.env.NODE_ENV !== "production" ? Web : PDF;

export const CVContext = React.createContext();

const CVProvider = ({ output = OUTPUT_WEB, ...props }) => {
  return (
    <CVContext.Provider {...props} value={output !== OUTPUT_PDF ? Web : PDF} />
  );
};

// Unit must be pt so web/pdf element sizing are both the same.

const MDXComponents = (ComponentContext) => ({
  wrapper: (props) => <ComponentContext.View {...props} />,
  h1: (props) => (
    <ComponentContext.Text style={styles.right.title} {...props} />
  ),
  h2: (props) => (
    <ComponentContext.Text style={styles.right.detailTitle} {...props} />
  ),
  h3: (props) => (
    <ComponentContext.Text style={styles.right.detailSubTitle} {...props} />
  ),
  p: (props) => (
    <ComponentContext.Text
      style={styles.right.detailParagraphContainer}
      {...props}
    />
  ),
  hr: (props) => <ComponentContext.View style={styles.hr} {...props} />,
  ul: ({ children, ...props }) => {
    const isNested = props.parentName === "li";
    return (
      <ComponentContext.View
        style={{
          ...styles.right.detailContainer,
          ...(isNested && styles.right.nestedList),
        }}
        {...props}
      >
        {children}
      </ComponentContext.View>
    );
  },
  li: ({ children, ...props }) => {
    return (
      <ComponentContext.View style={styles.right.detailText}>
        <ComponentContext.Text style={{ marginRight: 5 }}>
          •
        </ComponentContext.Text>
        <ComponentContext.View style={styles.right.nestedListText}>
          {Array.isArray(children) ? (
            children.map((child, index) => {
              if (typeof child === "string") {
                if (child === "\n") return null;

                return (
                  <ComponentContext.View key={index} {...props}>
                    <ComponentContext.Text {...props}>
                      {child}
                    </ComponentContext.Text>
                  </ComponentContext.View>
                );
              }

              return (
                <ComponentContext.View key={index} {...props}>
                  {child}
                </ComponentContext.View>
              );
            })
          ) : (
            <ComponentContext.Text {...props}>{children}</ComponentContext.Text>
          )}
        </ComponentContext.View>
      </ComponentContext.View>
    );
  },
});

export const CVConsumer = (Component) => (props) => {
  return (
    <CVContext.Consumer>
      {(context) => (
        <MDXProvider components={MDXComponents(context)}>
          <Component
            {...props}
            {...context}
            mdxComponents={MDXComponents(context)}
          />
        </MDXProvider>
      )}
    </CVContext.Consumer>
  );
};

export default CVProvider;
