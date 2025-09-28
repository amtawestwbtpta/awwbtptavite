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

export default function LTAForm({ data }) {
  const { tname, gender, school, address, spouse, spouseDob, children } = data;
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
      title={`Pension LTA Form OF ${tname}`}
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.pageMainView}>
          <Text style={styles.textBold}>ENCLOSURE - 'E'</Text>
          <Text style={styles.textBold}>
            NOMINATION FOR PAYMENT OF LIFE TIME ARREAR PENSION
          </Text>
          <Text style={styles.text2}>(To be furnished by the Employee)</Text>
          <Text style={[styles.textBold, { textAlign: "left" }]}>
            Pension Disbursing Authority/ Head of Office.
          </Text>
          <Text style={[styles.textBold, { textAlign: "left" }]}>
            Name of Bank / Treasury/Accountant General, West Bengal.
          </Text>
          <Text style={[styles.text2, { textAlign: "left" }]}>
            (Place){" "}
            <Text style={[styles.textBoldunderLine, { textAlign: "left" }]}>
              ULUBERIA
            </Text>
          </Text>
          <Text style={[styles.textBold, { textAlign: "left" }]}>
            I{" "}
            <Text style={[styles.textBoldunderLine, { textAlign: "left" }]}>
              {tname}
            </Text>{" "}
            hereby nominate the person named below under rule 5 of the payment
            of arrear pension (nomination) Rules, 1986.
          </Text>
          <View style={{ borderWidth: 1, marginTop: 5 }}>
            <View style={[styles.tableStartBorderView, { marginTop: 5 }]}>
              <View
                style={[styles.view25, { borderBottomWidth: 1, width: "20%" }]}
              >
                <Text style={styles.text}>Name and Address of Nominees.</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                  },
                ]}
              >
                <Text style={styles.text}>Relationship with Pensioner</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "6%",
                  },
                ]}
              >
                <Text style={styles.text}>Date of Birth</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                  },
                ]}
              >
                <Text style={styles.text}>
                  If nominee is minor, name and address of persons who may
                  received the said pension during the nominee’s minority
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "20%",
                  },
                ]}
              >
                <Text style={styles.text}>
                  Name and address of other nominee in case of nominee under
                  col. (1) predeceases the pensioner
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                  },
                ]}
              >
                <Text style={styles.text}>Relationship with Pensioner</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                    borderRightWidth: 1,
                  },
                ]}
              >
                <Text style={styles.text}>
                  Date of Birth(If the other nomine e is minor)
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                    borderRightWidth: 1,
                  },
                ]}
              >
                <Text style={styles.text}>
                  Name and address of the person who may receive the pension
                  during the other nominee's minority
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                    borderRightWidth: 0,
                  },
                ]}
              >
                <Text style={styles.text}>
                  Contingencies on the happening of which the nomination shall
                  become invalid
                </Text>
              </View>
            </View>
            <View style={[styles.rowStartBorderView, { marginTop: 10 }]}>
              <View
                style={[
                  styles.view25,
                  { borderBottomWidth: 1, width: "20%", height: 30 },
                ]}
              >
                <Text style={styles.text}>(1)</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                    height: 30,
                  },
                ]}
              >
                <Text style={styles.text}>(2)</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "6%",
                    height: 30,
                  },
                ]}
              >
                <Text style={styles.text}>(3)</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                    height: 30,
                  },
                ]}
              >
                <Text style={styles.text}>(4)</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "20%",
                    height: 30,
                  },
                ]}
              >
                <Text style={styles.text}>(5)</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                    height: 30,
                  },
                ]}
              >
                <Text style={styles.text}>(6)</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                    height: 30,
                  },
                ]}
              >
                <Text style={styles.text}></Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                    height: 30,
                  },
                ]}
              >
                <Text style={styles.text}></Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "9%",
                    borderRightWidth: 0,
                    height: 30,
                  },
                ]}
              >
                <Text style={styles.text}>(7)</Text>
              </View>
            </View>
            <View style={[styles.rowStartBorderView, { marginVertical: 12 }]}>
              <View
                style={[
                  styles.viewNew,
                  {
                    width: "20%",
                    height: 130,
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                    padding: 5,
                    flexWrap: "wrap",
                  },
                ]}
              >
                <Text style={[styles.textBold, { textAlign: "left" }]}>
                  Name:- {spouse}
                </Text>
                <Text style={[styles.textBold, { textAlign: "left" }]}>
                  Address:- <Text style={styles.text2}>{address}</Text>
                </Text>
              </View>
              <View
                style={[
                  styles.viewNew,
                  {
                    width: "9%",
                    height: 130,
                  },
                ]}
              >
                <Text style={styles.text}>
                  {gender === "male" ? "WIFE" : "HUSBAND"}
                </Text>
              </View>
              <View
                style={[
                  styles.viewNew,
                  {
                    width: "6%",
                    height: 130,
                  },
                ]}
              >
                <Text style={styles.text}>{spouseDob}</Text>
              </View>
              <View
                style={[
                  styles.viewNew,
                  {
                    width: "9%",
                    height: 130,
                  },
                ]}
              >
                <Text style={styles.text}>N/A</Text>
              </View>
              <View
                style={[
                  styles.viewNew,
                  {
                    width: "20%",
                    height: 130,
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                    padding: 5,
                    flexWrap: "wrap",
                  },
                ]}
              >
                <Text style={[styles.textBold, { textAlign: "left" }]}>
                  Name:- {children.filter((el) => el.selected === true)[0].name}
                </Text>
                <Text style={[styles.textBold, { textAlign: "left" }]}>
                  Address:- <Text style={styles.text2}>{address}</Text>
                </Text>
              </View>
              <View
                style={[
                  styles.viewNew,
                  {
                    width: "9%",
                    height: 130,
                  },
                ]}
              >
                <Text style={styles.text}>
                  {children.filter((el) => el.selected === true)[0].gender}
                </Text>
              </View>
              <View
                style={[
                  styles.viewNew,
                  {
                    width: "9%",
                    borderRightWidth: 1,
                    height: 130,
                  },
                ]}
              >
                <Text style={styles.text}>N/A</Text>
              </View>
              <View
                style={[
                  styles.viewNew,
                  {
                    width: "9%",
                    borderRightWidth: 1,
                    height: 130,
                  },
                ]}
              >
                <Text style={styles.text}>N/A</Text>
              </View>
              <View
                style={[
                  styles.viewNew,
                  {
                    width: "9%",
                    borderRightWidth: 0,
                    height: 130,
                  },
                ]}
              >
                <Text style={styles.text}>{`After Death \nor Insanity`}</Text>
              </View>
            </View>
          </View>
          <View style={{ width: "95%", marginTop: 10 }}>
            <Text style={[styles.text2, { textAlign: "left" }]}>
              Place: …………………………………………….…{"                 "} Date:
              …………………………………
            </Text>
          </View>
          <View
            style={{
              width: "95%",
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.textBold, { textAlign: "left" }]}>
              Witness:
            </Text>
            <Text style={[styles.text2, { textAlign: "left" }]}>
              Signature, Name and Address
            </Text>
            <Text style={[styles.text2BoldunderLine, { textAlign: "left" }]}>
              (Signature of the pensioner and address)
            </Text>
          </View>
          <View style={{ width: "95%", marginTop: 5 }}>
            <Text style={[styles.text2, { textAlign: "left" }]}>
              (1)………………………………………………………………………………………………………………
            </Text>
            <Text style={[styles.text2, { textAlign: "left", marginTop: 10 }]}>
              (2)………………………………………………………………………………………………………………
            </Text>
          </View>

          <View style={{ width: "100%" }}>
            <Text style={[styles.text, { textAlign: "left" }]}>
              Signature of the pension disbursing Authority/Head of Office
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              Acknowledgement to be sent by the pension disbursing
              Authority/Head of Office
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              Certified that the application / nomination has been received from
              Sri. / Smt{" "}
              <Text style={[styles.text2BoldunderLine, { textAlign: "left" }]}>
                {tname}
              </Text>{" "}
              H.T. /A.T. of{" "}
              <Text style={[styles.text2BoldunderLine, { textAlign: "left" }]}>
                {school}
              </Text>
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              Whose address (Residence) is{" "}
              <Text style={[styles.text2BoldunderLine, { textAlign: "left" }]}>
                {address}
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[styles.text2BoldunderLine, { textAlign: "center" }]}
              >
                Sub-Inspector of School
              </Text>
              <Text
                style={[styles.text2BoldunderLine, { textAlign: "center" }]}
              >
                Amta West Circle, Howrah
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={[styles.text2BoldunderLine, { textAlign: "left" }]}>
                District Inspector of Schools (P.E.), Howrah.
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
    padding: -5,
    margin: -5,
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
    fontFamily: "Times",
    textAlign: "center",
    textDecoration: "underline",
  },
  title: {
    fontSize: 16,
    fontFamily: "Times",
    textAlign: "center",
  },
  text: {
    fontSize: 10,
    fontFamily: "Times",
    textAlign: "center",
    lineHeight: 1.5,
  },
  text2: {
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
    fontSize: 13,
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
  text2BoldunderLine: {
    fontSize: 13,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view25: {
    borderTopWidth: "0px",
    borderLeftWidth: "0px",
    borderRightWidth: 1,
    borderStyle: "solid",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    height: 130,
  },
  viewNew: {
    borderTopWidth: "0px",
    borderLeftWidth: "0px",
    borderRightWidth: 1,
    borderStyle: "solid",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  rowStartBorderView: {
    width: "100%",
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
  family: "TimesBD",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
