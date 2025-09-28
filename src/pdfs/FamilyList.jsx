import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
const width = 2480;
const height = 3508;
export default function FamilyList({ data }) {
  const { tname, desig, gender, address, spouse, spouseDob, children } = data;
  return (
    // <PDFViewer
    //   style={{
    //     width: width / 3,
    //     height: height / 3,
    //   }}
    // >
    <Document title={`Family List of ${tname}`}>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageMainView}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              TO BE FILLED IN BY THE PETITIONER / SUB-INSPECTOR OF SCHOOLS
            </Text>
            <Text style={styles.subTitle}>
              List of Family Members of the Pensioner / Petitioner
            </Text>
            <Text style={styles.boldText}>
              Name: - <Text style={styles.boldUnderLineText}>{tname}</Text>
            </Text>
            <Text style={styles.boldText}>
              Designation: -{" "}
              <Text style={styles.boldUnderLineText}>
                {desig === "HT" ? "HEAD TECHER" : "ASSISTANT TEACHER"}
              </Text>
            </Text>
            <View style={{ borderWidth: 1, marginTop: 20 }}>
              <View style={styles.tableStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "10%" },
                  ]}
                >
                  <Text style={styles.text}>Sl. No</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "35%" },
                  ]}
                >
                  <Text style={styles.text}>Name of the Member</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "30%" },
                  ]}
                >
                  <Text style={[styles.text]}>
                    {`Address of deceased\n Pensioner/Pensioner`}
                  </Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "15%" },
                  ]}
                >
                  <Text style={[styles.text]}>
                    {`Relationship\n with the\n Pensioner`}
                  </Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "15%",
                      borderRightWidth: "0px",
                    },
                  ]}
                >
                  <Text style={styles.text}>Date of Birth</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.view25, { width: "10%" }]}>
                  <Text style={styles.text}>1.</Text>
                </View>
                <View style={[styles.view25, { width: "35%" }]}>
                  <Text style={styles.text}>{spouse}</Text>
                </View>
                <View style={[styles.view25, { width: "30%" }]}>
                  <Text style={[styles.text]}>{address}</Text>
                </View>
                <View style={[styles.view25, { width: "15%" }]}>
                  <Text style={[styles.text]}>
                    {gender === "male" ? "WIFE" : "HUSBAND"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      width: "15%",
                      borderRightWidth: "0px",
                    },
                  ]}
                >
                  <Text style={styles.text}>{spouseDob}</Text>
                </View>
              </View>
              {children.map((child, index) => (
                <View
                  style={[
                    styles.rowStartBorderView,
                    {
                      borderBottomWidth: index === children.length - 1 ? 0 : 1,
                    },
                  ]}
                  key={index}
                >
                  <View style={[styles.view25, { width: "10%" }]}>
                    <Text style={styles.text}>{index + 2}</Text>
                  </View>
                  <View style={[styles.view25, { width: "35%" }]}>
                    <Text style={styles.text}>{child.name}</Text>
                  </View>
                  <View style={[styles.view25, { width: "30%" }]}>
                    <Text style={[styles.text]}>------- Do -------</Text>
                  </View>
                  <View style={[styles.view25, { width: "15%" }]}>
                    <Text style={[styles.text]}>{child.gender}</Text>
                  </View>
                  <View
                    style={[
                      styles.view25,
                      {
                        width: "15%",
                        borderRightWidth: "0px",
                      },
                    ]}
                  >
                    <Text style={styles.text}>{child.dob}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    margin: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "98%",
  },
  contentContainer: {
    width: "95%",
  },
  title: {
    fontSize: 16,
    fontFamily: "Times",
    textAlign: "center",
    lineHeight: 1.5,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: "Times",
    textAlign: "center",
    lineHeight: 1.5,
  },
  text: {
    fontSize: 12,
    fontFamily: "Times",
    textAlign: "center",
    lineHeight: 1.5,
  },

  boldText: {
    fontSize: 18,
    fontFamily: "TimesBold",
    textAlign: "center",
    lineHeight: 1.8,
  },
  boldUnderLineText: {
    fontSize: 18,
    fontFamily: "TimesBold",
    textAlign: "center",
    textDecoration: "underline",
    lineHeight: 1.8,
  },
  strikethrough: {
    textDecoration: "line-through",
  },
  tableStartView: {
    borderTopWidth: "0px",
    borderLeftWidth: 1,
    borderRightWidth: "0px",
    borderBottomWidth: 1,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  tableStartBorderView: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view25: {
    borderTopWidth: "0px",
    borderLeftWidth: "0px",
    borderRightWidth: 1,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    height: 73,
  },
  rowStartBorderView: {
    borderTopWidth: "0px",
    borderLeftWidth: "0px",
    borderRightWidth: "0px",
    borderBottomWidth: 1,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
