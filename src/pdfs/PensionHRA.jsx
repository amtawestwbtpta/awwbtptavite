import React from "react";
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

export default function PensionHRA({ data }) {
  const { tname, desig } = data;
  return (
    // <PDFViewer
    //   style={{
    //     width: width / 3,
    //     height: height / 3,
    //     alignSelf: "center",
    //   }}
    // >
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`Pension HRA Form OF ${tname}`}
    >
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageMainView}>
          <Text style={[styles.underLineText]}>
            ENCLOSURE TO G.O NO : 97 SE (B )
          </Text>
          <Text style={[styles.underLineText]}>Dt : 07/03/2001</Text>
          <Text
            style={[
              styles.textBoldunderLine,
              { fontSize: 16, marginVertical: 10 },
            ]}
          >
            HRA DECLARATION FORM
          </Text>
          <Text style={[styles.text, { textAlign: "left" }]}>
            I hereby declare that -
          </Text>
          <View style={[styles.subView, { width: "90%" }]}>
            <Text style={[styles.textBoldunderLine, { textAlign: "left" }]}>
              A. I AM MARRIED / NOT MARRIED
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              My wife / husband is not in service under the Government of India
              or any State Government or any Government undertaking or any
              Statutory or Local Body , Educational Institution etc.
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>OR</Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              My wife / husband is in Service and following are the Particulars
              of her / his Employment and pay etc. drawn by her / him .
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              a) Name and Address of her / his Office :
              _________________________________________
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              ___________________________________________________________________________
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              ___________________________________________________________________________
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              b) Present Pay per mensem :
              ____________________________________________________
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              c) House Rent Allowance drawn by her / him per mensem :
              _____________________________
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={[
                  styles.textBoldunderLine,
                  { textAlign: "left", fontSize: 13 },
                ]}
              >
                B. HOUSE RENT PAID / RENTAL VALUE OF THE BUILDING :
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginLeft: 20,
                  width: "20%",
                }}
              >
                <Text style={[styles.text, { textAlign: "center" }]}>NIL</Text>
              </View>
            </View>
            <View style={[styles.subView, { width: "90%" }]}>
              <Text style={[styles.text, { textAlign: "left" }]}>
                Signature :
                __________________________________________________________
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                  marginTop: 5,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>Name :</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: "80%",
                    marginLeft: 20,
                  }}
                >
                  <Text style={[styles.text, { textAlign: "center" }]}>
                    {tname}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 5,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  Designation :
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: "80%",
                    marginLeft: 20,
                  }}
                >
                  <Text style={[styles.text, { textAlign: "center" }]}>
                    {desig === "HT" ? "HEAD TECHER" : "ASSISTANT TEACHER"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                  marginTop: 5,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>Date :</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: "90%",
                    marginLeft: 20,
                  }}
                >
                  <Text style={[styles.text, { textAlign: "center" }]}></Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                  marginTop: 5,
                }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  Office :
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: "90%",
                    marginLeft: 20,
                  }}
                >
                  <Text style={[styles.text, { textAlign: "center" }]}></Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={[styles.text, { textAlign: "left" }]}>
            (Please strike out which is not applicable )
          </Text>
          <View
            style={[
              styles.subView,
              {
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                marginTop: 5,
                width: "40%",
              }}
            >
              <Text style={[styles.text, { textAlign: "left" }]}>
                Memo No :
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: "80%",
                  marginLeft: 20,
                }}
              >
                <Text style={[styles.text, { textAlign: "center" }]}></Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                marginTop: 5,
                width: "40%",
              }}
            >
              <Text style={[styles.text, { textAlign: "left" }]}>Dated :</Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: "80%",
                  marginLeft: 20,
                }}
              >
                <Text style={[styles.text, { textAlign: "center" }]}></Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.subView,
              {
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 30,
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                marginTop: 5,
                width: "40%",
              }}
            >
              <Text style={[styles.text, { textAlign: "left" }]}>
                Copy forwarded for all concerned
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                marginTop: 5,
                width: "40%",
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  width: "80%",
                  marginLeft: 20,
                }}
              >
                <Text style={[styles.text, { textAlign: "center" }]}></Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.subView,
              {
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: -10,
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "40%",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
                width: "40%",
              }}
            >
              <View
                style={{
                  width: "80%",
                  marginLeft: 20,
                }}
              >
                <Text style={[styles.text, { textAlign: "center" }]}>
                  Sub Inspector of Schools ,
                </Text>
                <Text style={[styles.text, { textAlign: "center" }]}>
                  Amta West Circle
                </Text>
                <Text style={[styles.text, { textAlign: "center" }]}>
                  Howrah
                </Text>
              </View>
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
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "98%",
    height: "98%",
  },
  subView: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "98%",
  },
  titleMain: {
    fontSize: 22,
    fontFamily: "Algerian",
    textAlign: "center",
    textDecoration: "underline",
  },
  title: {
    fontSize: 16,
    fontFamily: "Algerian",
    textAlign: "center",
  },
  text: {
    fontSize: 13,
    fontFamily: "Times",
    textAlign: "center",
    lineHeight: 1.5,
  },
  rowText: {
    marginTop: 2,
    fontSize: 14,
    fontFamily: "Times",
    textAlign: "left",
    lineHeight: 1.5,
  },
  textBold: {
    marginTop: 2,
    fontSize: 14,
    fontFamily: "TimesBD",
    textAlign: "center",
    lineHeight: 1.5,
  },
  textBoldunderLine: {
    marginTop: 2,
    fontSize: 14,
    fontFamily: "TimesBD",
    textAlign: "center",
    lineHeight: 1.5,
    textDecoration: "underline",
  },

  underLineText: {
    fontSize: 14,
    fontFamily: "Times",
    textAlign: "center",
    textDecoration: "underline",
  },
  checkImage: {
    width: 10,
    height: 10,
    position: "absolute",
    marginTop: -7,
  },
  rowView: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  underLineView: {
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
  },
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "TimesBD",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
Font.register({
  family: "Algerian",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Algerian.ttf",
});
