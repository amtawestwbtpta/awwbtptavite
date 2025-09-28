import React, { useEffect } from "react";
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
import {
  monthsBetween,
  getLastDateOfMonth,
  roundUp,
} from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;

const TableRows = ({ doj, dor }) => {
  const joingDay = parseInt(doj.split("-")[0]);
  const joingMonth = doj.split("-")[1];
  const joiningYear = parseInt(doj.split("-")[2]);
  const retirementYear = parseInt(dor.split("-")[2]);
  function generateYears(startYear, endYear) {
    const years = [];

    for (let year = startYear; year <= endYear; year += 5) {
      years.push(year);
    }

    // Ensure ending year is included if not already in array
    if (years[years.length - 1] !== endYear) {
      years.push(endYear);
    }

    return years;
  }
  const years = generateYears(joiningYear, retirementYear);

  return years.map((y, i) => {
    if (y < retirementYear) {
      const yearDiff = i == 0 ? 5 : years[i] - years[i - 1];
      return (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          key={i}
        >
          <View
            style={{
              width: "15%",
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}>
                {joingDay + "-" + joingMonth + "-" + y}
              </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}>
                {years[i + 1] !== retirementYear
                  ? joingDay - 1 + "-" + joingMonth + "-" + years[i + 1]
                  : getLastDateOfMonth(dor)}
              </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}>
                {years[i + 1] === retirementYear
                  ? roundUp(
                      (monthsBetween(
                        joingDay + "-" + joingMonth + "-" + y,
                        dor
                      ) *
                        30) /
                        12
                    )
                  : yearDiff * 30}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "15%",
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
          </View>
          <View
            style={{
              width: "15%",
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 2,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
          </View>
          <View
            style={{
              width: "15%",
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}>
                {joingDay + "-" + joingMonth + "-" + y}
              </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}>
                {years[i + 1] !== retirementYear
                  ? joingDay - 1 + "-" + joingMonth + "-" + years[i + 1]
                  : getLastDateOfMonth(dor)}
              </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}>
                {years[i + 1] === retirementYear
                  ? roundUp(
                      (monthsBetween(
                        joingDay + "-" + joingMonth + "-" + y,
                        dor
                      ) *
                        15) /
                        12
                    )
                  : yearDiff * 15}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "15%",
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 2,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
          </View>
          <View
            style={{
              width: "15%",
              borderBottomWidth: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
            <View
              style={{
                width: "33%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
                height: 35,
              }}
            >
              <Text style={styles.text}> </Text>
            </View>
          </View>
          <View
            style={{
              width: "10%",
              borderRightWidth: 0,
              height: 35,
              borderBottomWidth: 1,
            }}
          >
            <Text style={styles.text}> </Text>
          </View>
        </View>
      );
    }
  });
};
export default function PensionLeaveForm({ data }) {
  const { tname, desig, doj, dor, gender, school } = data;

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
      title={`Pension Leave Form OF ${tname}`}
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.pageMainView}>
          <Text style={styles.text2}>
            Leave account of {gender === "male" ? "Sri" : "Smt."}{" "}
            <Text style={styles.text2BoldunderLine}>{tname}</Text>{" "}
            {desig === "HT" ? "Head Teacher" : "Asst. Teacher"} of{" "}
            <Text style={styles.text2BoldunderLine}>{school}</Text>
            {", "}
            <Text style={styles.text2BoldunderLine}> Amta West </Text> Circle
            Howrah
          </Text>
          <View style={styles.subView}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "15%",
                  borderRightWidth: 1,
                  height: 40,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={styles.textBold}>½ Pay Leave Earned</Text>
              </View>
              <View
                style={{
                  width: "15%",
                  borderRightWidth: 1,
                  height: 40,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={styles.textBold}>Enjoyed Commuted Leave</Text>
              </View>
              <View
                style={{
                  width: "15%",
                  borderRightWidth: 2,
                  height: 40,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={styles.textBold}>Enjoyed ½ Pay Leave</Text>
              </View>
              <View
                style={{
                  width: "15%",
                  borderRightWidth: 1,
                  height: 40,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={styles.textBold}>
                  Medical Leave Earned on Full Pay
                </Text>
              </View>
              <View
                style={{
                  width: "15%",
                  borderRightWidth: 2,
                  height: 40,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={styles.textBold}>
                  Medical Leave Enjoyed With Full Pay
                </Text>
              </View>
              <View
                style={{
                  width: "15%",
                  borderRightWidth: 1,
                  height: 40,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={styles.textBold}>
                  Other Leave Enjoyed on ….......... Ground
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  borderRightWidth: 0,
                  height: 40,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={styles.textBold}>Remarks</Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "15%",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>From</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>To</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>Days</Text>
                </View>
              </View>
              <View
                style={{
                  width: "15%",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>From</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>To</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>Days</Text>
                </View>
              </View>
              <View
                style={{
                  width: "15%",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>From</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>To</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 2 }}>
                  <Text style={styles.textBold}>Days</Text>
                </View>
              </View>
              <View
                style={{
                  width: "15%",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>From</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>To</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>Days</Text>
                </View>
              </View>
              <View
                style={{
                  width: "15%",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>From</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>To</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 2 }}>
                  <Text style={styles.textBold}>Days</Text>
                </View>
              </View>
              <View
                style={{
                  width: "15%",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>From</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>To</Text>
                </View>
                <View style={{ width: "33%", borderRightWidth: 1 }}>
                  <Text style={styles.textBold}>Days</Text>
                </View>
              </View>
              <View
                style={{
                  width: "10%",
                  borderRightWidth: 0,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={styles.textBold}> </Text>
              </View>
            </View>
            <TableRows doj={doj} dor={dor} />
            {[1, 1, 1, 1].map((_, i) => (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderBottomWidth: i === 3 ? 0 : 1,
                }}
                key={i}
              >
                <View
                  style={{
                    width: "15%",
                    borderBottomWidth: 0,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "15%",
                    borderBottomWidth: 0,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "15%",
                    borderBottomWidth: 0,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 2,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "15%",
                    borderBottomWidth: 0,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "15%",
                    borderBottomWidth: 0,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 2,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "15%",
                    borderBottomWidth: 0,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                      height: 35,
                    }}
                  >
                    <Text style={styles.text}> </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "10%",
                    borderRightWidth: 0,
                    height: 35,
                    borderBottomWidth: 0,
                  }}
                >
                  <Text style={styles.text}> </Text>
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 5,
              marginTop: 50,
            }}
          >
            <Text style={styles.text2}>Sub-Inspector of Scchool</Text>
            <Text style={styles.text2}>
              .........................................................
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.text2}>Amta West Circle, Howrah</Text>
            <Text style={styles.text2}>
              District Inspector Of Schools (P.E.), Howrah
            </Text>
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
    margin: 5,
    alignSelf: "center",
    width: "98%",
    borderWidth: 2,
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
    fontSize: 8,
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
    fontSize: 12,
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
