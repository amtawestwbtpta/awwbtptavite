import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { INR, printDate } from "../modules/calculatefunctions";

const width = 2480;
const height = 3508;

export default function WBTPTAPaySLip({ data }) {
  const {
    tname,
    desig,
    school,
    empid,
    pan,
    ir,
    addl,
    da,
    hra,
    ma,
    gross,
    ptax,
    gsli,
    udise,
    month,
    netpay,
    basicpay,
    pfund,
    level,
    cell,
    deduction,
    year,
  } = data;

  return (
    <Document
      title={`PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR ${month.toUpperCase()}, ${year}`}
    >
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.pageMainView}>
          <Image
            src="https://raw.githubusercontent.com/ultimate365/jsondata/main/logo.png"
            style={styles.logo}
          />

          <View style={styles.columnFlexView}>
            <Text style={styles.title}>
              WEST BENGAL TRINAMOOL PRIMARY TEACHERS' ASSOCIATION
            </Text>
            <Text style={styles.title}>
              * AMTA WEST CIRCLE * HOWRAH GRAMIN DISTRICT *
            </Text>
            <Text style={[styles.title2, { color: "darkgreen" }]}>
              * Sikshak Bhawan, Vill.- Joypur Fakirdas, P.O.- Joypur,
            </Text>
            <Text style={[styles.title2, { color: "darkgreen" }]}>
              P.S.- Joypur, District- Howrah, PIN-711401. *
            </Text>
            <Text style={[styles.title2, styles.monthYear]}>
              PAY SLIP FOR THE MONTH OF {month.toUpperCase()},{year}
            </Text>
          </View>

          <View style={styles.employeeContainer}>
            <View style={styles.employeeSection}>
              <View style={styles.rowFlexView}>
                <Text style={styles.text2}>EMPLOYEE NAME:&nbsp;</Text>
                <Text style={styles.text}>{tname}</Text>
              </View>
              <View style={styles.rowFlexView}>
                <Text style={styles.text2}>SCHOOL NAME:&nbsp;</Text>
                <Text style={styles.text}>{school}(</Text>
                <Text style={styles.text2}>UDISE:&nbsp;</Text>
                <Text style={styles.text}>{udise})</Text>
              </View>
              <View style={styles.rowFlexView}>
                <Text style={styles.text2}>LEVEL:&nbsp;</Text>
                <Text style={styles.text}>{level}</Text>
                <Text style={styles.text2}>CELL:&nbsp;</Text>
                <Text style={styles.text}>{cell}</Text>
              </View>
            </View>
            <View style={styles.employeeSection}>
              <View style={styles.rowFlexView}>
                <Text style={styles.text}>Employee ID:&nbsp;</Text>
                <Text style={styles.text2}>{empid}</Text>
              </View>
              <View style={styles.rowFlexView}>
                <Text style={styles.text}>DESIGNATION:&nbsp;</Text>
                <Text style={styles.text2}>{desig}</Text>
              </View>
              <View style={styles.rowFlexView}>
                <Text style={styles.text}>PAN:&nbsp;</Text>
                <Text style={styles.text2}>{pan}</Text>
              </View>
            </View>
          </View>

          {/* Fixed table container with explicit border widths */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.halfWidth}>
                <Text style={styles.text2}>EARNING(Rs)</Text>
              </View>
              <View style={[styles.halfWidth, styles.noRightBorder]}>
                <Text style={styles.text2}>DEDUCTION(Rs)</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.halfWidth}>
                <EarningsSection
                  desig={desig}
                  basicpay={basicpay}
                  addl={addl}
                  da={da}
                  hra={hra}
                  ma={ma}
                  ir={ir}
                />
              </View>
              <View style={[styles.halfWidth, styles.noRightBorder]}>
                <DeductionsSection pfund={pfund} ptax={ptax} gsli={gsli} />
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.halfWidth}>
                <TotalRow label="Total:" value={gross} />
              </View>
              <View style={[styles.halfWidth, styles.noRightBorder]}>
                <TotalRow value={deduction} alignEnd />
              </View>
            </View>

            {/* <View style={[styles.tableRow, styles.noBottomBorder]}>
              <View style={styles.fullWidth}>
                <TotalRow label="GROSS PAY:" value={gross} />
              </View>
            </View> */}

            <View style={styles.tableRow}>
              <View style={styles.fullWidth}>
                <View style={styles.netPayRow}>
                  <Text style={styles.text2}>GROSS PAY:</Text>
                  <Text style={[styles.text2, styles.netPayValue]}>
                    {gross} ({INR(gross)})
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.fullWidth}>
                <View style={styles.netPayRow}>
                  <Text style={styles.text2}>NET PAY:</Text>
                  <Text style={[styles.text2, styles.netPayValue]}>
                    {netpay} ({INR(netpay)})
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.notesContainer}>
            <Text style={styles.noteText}>
              DA: Dearness Allowance, HRA: House Rent Allowance, MA: Medical
              Allowance, IR: Interim Relief.
            </Text>
            <Text style={styles.noteText}>
              GPF: General Provident Fund, PT: Professional Tax
            </Text>
            <Text style={styles.noteText}>
              GSLI: Group Savings Linked Insurance
            </Text>
          </View>

          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerLabel}>Disclaimer:</Text>
            <Text style={styles.disclaimerText}>
              This Payslip is Only For Reference Purpose. It can not be used as
              a Valid Proof of Salary.Please Use Payslip{"\n"}which is available
              form SIS Office as a Valid Salary Proof.
            </Text>
          </View>

          <View style={styles.footerBreak}></View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>awwbtpta.vercel.app</Text>
            <Text style={styles.footerText}>Page-1</Text>
            <Text style={styles.footerText}>
              Date of Generation: {printDate()}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// Sub-components for better organization
const EarningsSection = ({ desig, basicpay, addl, da, hra, ma, ir }) => (
  <View style={styles.sectionContent}>
    <SalaryRow label="BASIC" value={basicpay} />
    {desig === "HT" && <SalaryRow label="ADDL. REMUN." value={addl} />}
    <SalaryRow label="DA" value={da} />
    <SalaryRow label="HRA" value={hra} />
    <SalaryRow label="MA" value={ma} />
    {ir > 0 ? (
      <SalaryRow label="DA ARREAR" value={ir} />
    ) : (
      <SalaryRow label="IR" value={0} />
    )}
  </View>
);

const DeductionsSection = ({ pfund, ptax, gsli }) => (
  <View style={styles.sectionContent}>
    <SalaryRow label="GPF" value={pfund} />
    <SalaryRow label="PT" value={ptax} />
    <SalaryRow label="GSLI" value={gsli} />
  </View>
);

const SalaryRow = ({ label, value }) => (
  <View style={styles.salaryRow}>
    <Text style={styles.text2}>{label}</Text>
    <Text style={styles.text}>{value}</Text>
  </View>
);

const TotalRow = ({ label, value, alignEnd }) => (
  <View style={[styles.salaryRow, alignEnd && styles.alignEnd]}>
    {label && <Text style={styles.text2}>{label}</Text>}
    <Text style={styles.text2}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  page: {
    padding: 5,
    margin: 5,
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 30,
    margin: 5,
    width: "100%",
    height: "98%",
  },
  logo: {
    width: 70,
    alignSelf: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "DejaVu",
    textAlign: "center",
  },
  title2: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "DejaVu",
    textAlign: "center",
  },
  monthYear: {
    marginTop: 10,
  },
  text: {
    fontSize: 8,
    fontFamily: "DejaVuNormal",
    textAlign: "center",
    padding: 2,
  },
  text2: {
    fontSize: 8,
    fontFamily: "DejaVu",
    textAlign: "center",
    padding: 2,
  },
  employeeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    alignItems: "flex-start",
  },
  employeeSection: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  tableContainer: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  halfWidth: {
    width: "50%",
    borderRightWidth: 1,
    padding: 2,
  },
  fullWidth: {
    width: "100%",
    padding: 2,
  },
  noRightBorder: {
    borderRightWidth: 0,
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
  noBorder: {
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  sectionContent: {
    width: "100%",
    paddingHorizontal: 2,
  },
  salaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  alignEnd: {
    justifyContent: "flex-end",
  },
  netPayRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  netPayValue: {
    marginLeft: 50,
  },
  notesContainer: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  noteText: {
    fontSize: 8,
    fontFamily: "DejaVuNormal",
    textAlign: "left",
  },
  disclaimerContainer: {
    marginTop: 200,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  disclaimerLabel: {
    fontSize: 8,
    fontFamily: "DejaVu",
    textAlign: "left",
    padding: 2,
  },
  disclaimerText: {
    fontSize: 8,
    fontFamily: "DejaVuNormal",
    textAlign: "left",
    padding: 2,
  },
  footerBreak: {
    borderBottomWidth: 1,
    width: "100%",
    height: 5,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  footerText: {
    fontSize: 8,
    fontFamily: "DejaVuItalic",
    padding: 2,
  },
  rowFlexView: {
    flexDirection: "row",
  },
  columnFlexView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

// Font registrations remain the same
Font.register({
  family: "DejaVu",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/DejaVuSerif-Bold.ttf",
});
Font.register({
  family: "DejaVuNormal",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/DejaVuSerif.ttf",
});
Font.register({
  family: "DejaVuItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/DejaVuSerif-BoldItalic.ttf",
});
