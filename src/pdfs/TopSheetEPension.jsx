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
export default function TopSheetEPension({ data }) {
  const {
    tname,
    dob,
    doj,
    dor,
    phone,
    empid,
    school,
    udise,
    address,
    applicationNo,
  } = data;
  return (
    // <PDFViewer
    //   style={{
    //     width: width / 3,
    //     height: height / 3,
    //   }}
    // >
    <Document title={`EPension Top Sheet of ${tname}`}>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageMainView}>
          <View style={styles.contentContainer}>
            <Text style={styles.boldUnderLineText}>TOP SHEET (e-Pension)</Text>
            <View style={{ borderWidth: 1, marginTop: 20 }}>
              <View style={styles.tableStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.boldText}>NAME OF CIRCLE</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}>AMTA WEST</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>MEMO NO </Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "25%" },
                  ]}
                >
                  <Text style={styles.boldText}></Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "10%" },
                  ]}
                >
                  <Text style={styles.title}>DATE</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "25%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}></Text>
                </View>
              </View>
              <View style={[styles.rowStartBorderView, { height: 50 }]}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%", height: 50 },
                  ]}
                >
                  <Text style={styles.title}>
                    NAME OF THE TEACHER WITH DESIGNATION
                  </Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                      height: 50,
                    },
                  ]}
                >
                  <Text style={styles.boldText}>{tname}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>EMPLOYEE CODE</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}>{empid}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>SCHOOL NAME</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldData}>{school}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>SCHOOL DISE CODE</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}>{udise}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>DATE OF BIRTH</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}>{dob}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>DATE OF 1ST JOINING</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}>{doj}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>DATE OF RETIREMENT</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "20%" },
                  ]}
                >
                  <Text style={styles.boldData}>{dor}</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "20%" },
                  ]}
                >
                  <Text style={styles.textSmall}>DATE OF DEATH</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "20%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.textSmall}>NOT APPLICABLE</Text>
                </View>
              </View>
              <View style={[styles.rowStartBorderView, { height: 50 }]}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%", height: 50 },
                  ]}
                >
                  <Text style={styles.title}>ADDRESS</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                      height: 50,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.text,
                      { textAlign: "center", paddingHorizontal: 5 },
                    ]}
                  >
                    {address}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>REGISTERED CONTACT NO</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}>{phone}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>RELATION WITH EMPLOYEE</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}>SELF</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 1, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}>APPLICATION NO.</Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 1,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}>{applicationNo}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View
                  style={[
                    styles.view25,
                    { borderBottomWidth: 0, width: "40%" },
                  ]}
                >
                  <Text style={styles.title}></Text>
                </View>
                <View
                  style={[
                    styles.view25,
                    {
                      borderBottomWidth: 0,
                      width: "60%",
                      borderRightWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.boldText}></Text>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginTop: 40,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.title}>
                  Signature of the Sub-Inspector of Schools,
                </Text>
                <Text style={styles.title}>Amta West Circle.</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                borderWidth: 1,
                height: 240,
                marginTop: 20,
              }}
            >
              <Text style={[styles.title, { marginTop: 10 }]}>
                SPACE FOR D.I. OFFICE
              </Text>
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
    fontSize: 15,
    fontFamily: "Times",
    textAlign: "center",
    // lineHeight: 1.5,
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
    // lineHeight: 1.5,
  },
  textSmall: {
    fontSize: 10,
    fontFamily: "Times",
    textAlign: "center",
    // lineHeight: 1.5,
  },

  boldText: {
    fontSize: 16,
    fontFamily: "TimesBold",
    textAlign: "center",
    // lineHeight: 1.5,
  },
  boldData: {
    fontSize: 12,
    fontFamily: "TimesBold",
    textAlign: "center",
    // lineHeight: 1.5,
  },
  boldUnderLineText: {
    fontSize: 16,
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
    height: 25,
  },
  rowStartBorderView: {
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
