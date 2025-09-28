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

export default function TeacherDCRGForm({ data }) {
  const { tname, relationship, nomineeAddress, nominee, nomineeDob } = data;
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
      title={`DCRG AND PF NOMINEE Form OF ${tname}`}
    >
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageMainView}>
          <Text style={styles.titleMain}>OFFICE OF THE</Text>
          <Text style={styles.titleMain}>
            DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
          </Text>
          <Text
            style={[styles.text2, { marginVertical: 10, fontFamily: "Arial" }]}
          >
            Provident Fund Nomination Form
          </Text>
          <Text style={styles.title2}>
            I hereby nominate the person mentioned below who is a member of my
            family as per rules and to receive the amount that may stand to my
            credit in the fund, in the event of my death before that amount has
            become payable or having become payable has not been paid :-
          </Text>
          <View style={{ marginVertical: 10 }}>
            <View style={styles.secondTableStartView}>
              <View
                style={[styles.rowStartBorderView, { borderBottomWidth: 1 }]}
              >
                <View style={[styles.view25H, { width: "40%", height: 70 }]}>
                  <Text style={styles.textMain}>
                    Name and address of nominee or nominees
                  </Text>
                </View>
                <View style={[styles.view25H, { width: "15%", height: 70 }]}>
                  <Text style={styles.textMain}>
                    Relationship with the employee
                  </Text>
                </View>
                <View style={[styles.view25H, { width: "12%", height: 70 }]}>
                  <Text style={styles.textMain}>
                    Whether major or minor state his age
                  </Text>
                </View>
                <View style={[styles.view25H, { width: "13%", height: 70 }]}>
                  <Text style={styles.textMain}>
                    {`Amount of share of\ndeposit`}
                  </Text>
                </View>
                <View
                  style={[
                    styles.view25H,
                    { borderRightWidth: 0, width: "20%", height: 70 },
                  ]}
                >
                  <Text style={styles.textMain}>
                    Name & address of the person to whom the payment is to be
                    made on behalf of the minor
                  </Text>
                </View>
              </View>
              <View
                style={[styles.rowStartBorderView, { borderBottomWidth: 1 }]}
              >
                <View
                  style={[
                    styles.view25H,
                    {
                      width: "40%",
                      height: 240,
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      padding: 10,
                    },
                  ]}
                >
                  <Text style={[styles.textBold, { textAlign: "left" }]}>
                    Name:- {nominee}
                  </Text>
                  <Text
                    style={[
                      styles.textBold,
                      { textAlign: "center", marginTop: 20 },
                    ]}
                  >
                    Address:-{"\n"}
                    <Text style={styles.textBold}>{nomineeAddress}</Text>
                  </Text>
                </View>
                <View style={[styles.view25H, { width: "15%", height: 240 }]}>
                  <Text style={styles.textBold}>{relationship}</Text>
                </View>
                <View style={[styles.view25H, { width: "12%", height: 240 }]}>
                  <Text style={styles.textBold}>{nomineeDob}</Text>
                </View>
                <View style={[styles.view25H, { width: "13%", height: 240 }]}>
                  <Text style={styles.textBold}>100%</Text>
                </View>
                <View
                  style={[
                    styles.view25H,
                    { borderRightWidth: 0, width: "20%", height: 240 },
                  ]}
                >
                  <Text style={styles.textMain}></Text>
                </View>
              </View>
              <View
                style={[styles.rowStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View
                  style={[
                    {
                      width: "55%",
                      height: 200,
                      padding: 0,
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      {
                        width: "100%",
                        height: 20,
                        borderBottomWidth: 1,

                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text style={styles.textMain}>
                      Signature of two witness
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: "100%",
                        height: 70,

                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        padding: 4,
                      },
                    ]}
                  >
                    <Text style={styles.textMain}>1.</Text>
                  </View>
                  <View
                    style={[
                      {
                        width: "100%",
                        height: 70,

                        justifyContent: "center",
                        alignItems: "flex-start",
                        padding: 4,
                      },
                    ]}
                  >
                    <Text style={styles.textMain}>2.</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.view25H,
                    {
                      borderRightWidth: 0,
                      width: "45%",
                      height: 200,
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    },
                  ]}
                >
                  <Text style={styles.textMain}>
                    Signature of the depositor with details of circle and School
                    in which attached
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={[styles.textMain, { textAlign: "left" }]}>
            Dated the
            {
              "                                                                         "
            }
            day of
            {"                                                        "} 20
          </Text>
          <Text
            style={[
              styles.textMain,
              { textAlign: "right", marginVertical: 20, marginRight: 80 },
            ]}
          >
            Countersigned
          </Text>
          <Text style={[styles.textMain, { textAlign: "right", margin: 20 }]}>
            Signature of the Sub-Inspector of Schools
          </Text>
        </View>
      </Page>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.pageMainView}>
          <Text style={styles.textBold}>OFFICE OF THE</Text>
          <Text style={styles.textBold}>
            DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
          </Text>
          <Text style={styles.text2}>
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
                style={[
                  styles.view25,
                  { borderBottomWidth: 1, width: "30%", height: 80 },
                ]}
              >
                <Text style={styles.text}>Name and Address of Nominees.</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    borderBottomWidth: 1,
                    width: "6%",
                    height: 80,
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
                    height: 80,
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
                    height: 80,
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
                    height: 80,
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
                    height: 80,
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
                    height: 80,
                  },
                ]}
              >
                <Text style={styles.text}></Text>
              </View>
            </View>
            <View style={styles.rowStartBorderView}>
              <View
                style={[
                  styles.view25,
                  { borderBottomWidth: 1, width: "30%", height: 18 },
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
                    height: 18,
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
                    height: 18,
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
                    height: 18,
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
                    height: 18,
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
                    height: 18,
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
                    height: 18,
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
                    height: 90,
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                    padding: 5,
                  },
                ]}
              >
                <Text style={[styles.textBold, { textAlign: "left" }]}>
                  Name:- {nominee}
                </Text>
                <Text style={[styles.textBold, { textAlign: "left" }]}>
                  Address:-{" "}
                  <Text style={[styles.text, { lineHeight: 1.2 }]}>
                    {nomineeAddress}
                  </Text>
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "6%",
                    height: 90,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      transform: "rotate(-45deg)",
                      fontSize: 9,
                    },
                  ]}
                >
                  {relationship}
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "6%",
                    height: 90,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      transform: "rotate(-45deg)",
                      fontSize: 9,
                    },
                  ]}
                >
                  {nomineeDob}
                </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "6%",
                    height: 90,
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
                    height: 90,
                  },
                ]}
              >
                <Text style={styles.text}>After Death</Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "36%",
                    height: 90,
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                    padding: 5,
                  },
                ]}
              >
                <Text style={[styles.textBold, { textAlign: "left" }]}> </Text>
              </View>
              <View
                style={[
                  styles.view25,
                  {
                    width: "6%",
                    borderRightWidth: 0,
                    height: 90,
                  },
                ]}
              >
                <Text style={styles.text}> </Text>
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
              Witness of signature
            </Text>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[styles.text2, { textAlign: "left" }]}>
                ....................................................
              </Text>
              <Text style={[styles.text2, { textAlign: "left" }]}>
                (Signature of the employee)
              </Text>
            </View>
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
                ....................................................
              </Text>
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
                  ....................................................
                </Text>
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
  textAddress: {
    fontSize: 10,
    fontFamily: "Times",
    textAlign: "center",
    lineHeight: 1,
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
  secondTableStartView: {
    borderWidth: 1,
    width: "100%",
    height: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  rowWrapView: {
    paddingRight: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  rowFlexView: {
    paddingRight: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  columnFlexView: {
    paddingRight: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  rowFlexViewEvenly: {
    paddingRight: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  view25H: {
    borderTopWidth: "0px",
    borderLeftWidth: "0px",
    borderRightWidth: 1,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    padding: 4,
  },
  title2: {
    fontSize: 16,
    textAlign: "center",
  },
  titleMain: {
    fontSize: 20,
    textAlign: "center",
  },
  textMain: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 1.5,
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
  family: "Comic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/comicbd.ttf",
});
Font.register({
  family: "Arial",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arial.ttf",
});
