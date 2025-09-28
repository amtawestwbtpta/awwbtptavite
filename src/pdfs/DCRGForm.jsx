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

export default function DCRGForm({ data }) {
  const { tname, gender, address, spouse, spouseDob, children } = data;
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
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.pageMainView}>
          <Text style={styles.textBold}>ENCLOSURE - 'D'</Text>
          <Text style={styles.textBold}>
            NOMINATION FOR PAYMENT OF DEATH-CUM-RETIRMENT GRATUITY
          </Text>
          <Text style={styles.text2}>(To be furnished by the Employee)</Text>
          <Text style={[styles.text2, { textAlign: "left" }]}>
            I hereby nominate the person mentioned below, who are members of my
            family, and confer of them the right to receive, to be extent
            specified below, any gratuity that may be sanctioned by Government
            in the event of my death while in service and the right to receive
            on my death, to the extent specified below, any gratuity having
            become admissible to me on retirement may remain unpaid on my death:
          </Text>
          <View style={{ borderWidth: 1, marginTop: 20 }}>
            <View style={styles.tableStartBorderView}>
              <View
                style={[styles.view25, { borderBottomWidth: 1, width: "30%" }]}
              >
                <Text style={styles.text}>Name and Address of Nominees.</Text>
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
                <Text style={styles.text}>Relationship with Employee</Text>
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
                <Text style={styles.text}>Age (Date of Birth)</Text>
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
                <Text style={styles.text}>
                  Amount of share of gratuity payable to each.
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "10%",
                  },
                ]}
              >
                <Text style={styles.text}>
                  Contingencies on the happening of which the nomination shall
                  become invalid.
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "36%",
                  },
                ]}
              >
                <Text style={styles.text}>
                  Name, Address and relationship of the person or persons if any
                  to whom the right conferred on the nominee shall pass in the
                  event of nominee predeceasing the employee or the nominee
                  dying after the death of the employee but before receiving
                  payment.
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "6%",
                    borderRightWidth: 0,
                  },
                ]}
              >
                <Text style={styles.text}>
                  Amount of share of gratuity payable to each.
                </Text>
              </View>
            </View>
            <View style={styles.rowStartBorderView}>
              <View
                style={[
                  styles.view25,
                  { borderBottomWidth: 1, width: "30%", height: 25 },
                ]}
              >
                <Text style={styles.text}>(1)</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "6%",
                    height: 25,
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
                    height: 25,
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
                    width: "6%",
                    height: 25,
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
                    width: "10%",
                    height: 25,
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
                    width: "36%",
                    height: 25,
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
                    width: "6%",
                    borderRightWidth: 0,
                    height: 25,
                  },
                ]}
              >
                <Text style={styles.text}>(7)</Text>
              </View>
            </View>
            <View style={styles.rowStartBorderView}>
              <View
                style={[
                  styles.view25,
                  {
                    width: "30%",
                    height: 100,
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                    padding: 5,
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
                  styles.view25,
                  {
                    width: "6%",
                    height: 100,
                  },
                ]}
              >
                <Text style={styles.text}>
                  {gender === "male" ? "WIFE" : "HUSBAND"}
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "6%",
                    height: 100,
                  },
                ]}
              >
                <Text style={styles.text}>{spouseDob}</Text>
                <Text style={styles.text}>
                  {new Date().getFullYear() - parseInt(spouseDob.split("-")[2])}{" "}
                  Years
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "6%",
                    height: 100,
                  },
                ]}
              >
                <Text style={styles.text}>100%</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "10%",
                    height: 100,
                  },
                ]}
              >
                <Text style={styles.text}>{`After Death or\n Insanity`}</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "36%",
                    height: 100,
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                    padding: 5,
                  },
                ]}
              >
                {children
                  .filter((el) => el.selected === true)
                  .map((child, index) => (
                    <Text
                      style={[styles.textBold, { textAlign: "left" }]}
                      key={index}
                    >
                      Name:-
                      {children.filter((el) => el.selected === true).length >
                        1 && ` ${index + 1}. `}{" "}
                      {child.name}
                    </Text>
                  ))}
                <Text style={[styles.textBold, { textAlign: "left" }]}>
                  Address:- <Text style={styles.text2}>{address}</Text>
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "6%",
                    borderRightWidth: 0,
                    height: 100,
                  },
                ]}
              >
                <Text style={styles.text}>
                  {Math.ceil(
                    100 / children.filter((el) => el.selected === true).length
                  )}
                  %
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "95%", marginTop: 5 }}>
            <Text style={[styles.text2, { textAlign: "left" }]}>
              *This nomination supersedes the nomination made by me earlier on
              ………………………………………… which stands cancelled.
            </Text>
            <Text style={[styles.text2, { textAlign: "left" }]}>
              Dated this……...…Day of ……………………….…… 20…….at ………………pm.
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
              Witness to signature
            </Text>
            <Text style={[styles.text2, { textAlign: "left" }]}>
              Name and Address
            </Text>
            <Text style={[styles.text2, { textAlign: "left" }]}>
              (Signature of the employee)
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
          <View
            style={{
              width: "95%",
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "80%" }}>
              <Text style={[styles.text, { textAlign: "left" }]}>
                Note: (1) The employee shall draw lines across the blank space
                below the last entry to prevent the insertion of any name after
                he/she has signed.
              </Text>
              <Text style={[styles.text, { textAlign: "left" }]}>
                (2) Fourth column should be filled in so as to cover the whole
                amount of gratuity.
              </Text>
              <Text style={[styles.text, { textAlign: "left" }]}>
                (3) The amount/share of gratuity shown in the last columnto
                cover the whole amount/share payable to the original nominee.
              </Text>
              <Text style={[styles.text, { textAlign: "left" }]}>
                * Strike out if not applicable.
              </Text>
              <Text style={[styles.text, { textAlign: "left" }]}>Date:</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[styles.text, { textAlign: "center" }]}>
                Sub-Inspector of School
              </Text>
              <Text style={[styles.text, { textAlign: "center" }]}>
                Amta West Circle, Howrah
              </Text>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.text, { textAlign: "center" }]}>
                  District Inspector of Schools (P.E.), Howrah.
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
    height: 80,
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
  family: "TimesBD",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
