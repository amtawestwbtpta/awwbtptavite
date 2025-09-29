import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { ToastContainer, toast } from "react-toastify";
import {
  compareObjects,
  createDownloadLink,
  getCurrentDateInput,
  getSubmitDateInput,
  IndianFormat,
  readCSVFile,
  titleCase,
  todayInString,
} from "../../modules/calculatefunctions";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../context/FirebaseContext";
import Loader from "../../components/Loader";
import FamilyList from "../../pdfs/FamilyList";
import TopSheetEPension from "../../pdfs/TopSheetEPension";
import PensionHRA from "../../pdfs/PensionHRA";
import DCRGForm from "../../pdfs/DCRGForm";
import LTAForm from "../../pdfs/LTAForm";
import PensionLeaveForm from "../../pdfs/PensionLeaveForm";
import { PDFDownloadLink } from "@react-pdf/renderer";
export default function EPensionFiles() {
  const navigate = useNavigate();
  const { state, stateObject } = useGlobalContext();

  const {
    tname,
    desig,
    dob,
    doj,
    dojnow,
    dor,
    phone,
    email,
    hoi,
    gender,
    id,
    empid,
    school,
    udise,
    address,
    account,
    ifsc,
    disability,
  } = stateObject;

  const [inputField, setInputField] = useState({
    tname,
    desig,
    dob,
    doj,
    dojnow,
    dor,
    phone,
    email,
    hoi,
    gender,
    id,
    empid,
    school,
    udise,
    address,
    account,
    ifsc,
    spouse: "",
    spouseDob: `01-01-${new Date().getFullYear() - 50}`,
    children: [],
    applicationNo: "",
    disability: "",
  });
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [children, setChildren] = useState([
    {
      name: "",
      dob: `01-01-${new Date().getFullYear() - 25}`,
      gender: "",
      selected: true,
    },
  ]);
  const [detailsFound, setDetailsFound] = useState(false);
  const [showFamily, setShowFamily] = useState(false);
  const [showTopSheet, setShowTopSheet] = useState(false);
  const [showHRAForm, setShowHRAForm] = useState(false);
  const [showDCRGForm, setShowDCRGForm] = useState(false);
  const [showLTAForm, setShowLTAForm] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const thisYear = new Date().getFullYear();
  const nextYear = thisYear + 1;
  const [salaryData, setSalaryData] = useState({
    basic: "",
    da: "",
    hra: "",
    addl: "",
    ma: "",
    gross: "",
    gpf: "",
    gsli: "",
    ptax: "",
    deduction: "",
    netpay: "",
    halfBasicPay: "",
    commutedPension: "",
    unCommutedPension: "",
    daPension: "",
    netPension: "",
    gratuity: "",
    gainAgainstCommutation: "",
    totalGain: "",
  });
  const addChildren = () => {
    const newChildren = [
      ...children,
      {
        name: "",
        dob: `01-01-${new Date().getFullYear() - 25}`,
        gender: "",
        selected: false,
      },
    ];
    setChildren(newChildren);
    setInputField({
      ...inputField,
      children: newChildren,
    });
  };

  const handleChildrenChange = (index, e) => {
    const list = [...children];
    const { name, value } = e.target;
    if (name === "dob") {
      list[index][name] = getSubmitDateInput(value);
    } else {
      list[index][name] = value;
    }
    setChildren(list);
    setInputField({ ...inputField, children: list });
  };

  const removeChildren = (index) => {
    const list = [...children];
    list.splice(index, 1);
    setChildren(list);
    setInputField({ ...inputField, children: list });
  };
  const ifsc_ser = (ifsc) => {
    const bankDiv = document.getElementById("bankdiv");
    if (ifsc.length === 11 && bankDiv) {
      fetch(`https://ifsc.razorpay.com/${ifsc}`)
        .then((res) => res.json())
        .then((data) => {
          document.getElementById("bankdiv").innerHTML =
            "<p>Bank Details<br>Bank Name: " +
            data.BANK +
            "<br/>" +
            "Branch: " +
            data.BRANCH +
            "<br/>" +
            "Address: " +
            data.ADDRESS +
            "<br/>" +
            "IFSC: " +
            data.IFSC +
            "<br/>" +
            "MICR: " +
            data.MICR +
            "<br/></p>";
        });
    } else {
      bankDiv.innerHTML = "";
    }
  };

  const saveData = async () => {
    if (isFormValid()) {
      setShowModal(false);
      setLoader(true);
      try {
        await setDoc(doc(firestore, "epension", inputField.id), inputField)
          .then(() => {
            toast.success("Pension Data Added Successfully!");
            setDetailsFound(true);
          })
          .catch((error) => {
            toast.error(error.message);
            setDetailsFound(false);
          })
          .finally(() => {
            setLoader(false);
          });
      } catch (error) {
        toast.error(error.message);
        setLoader(false);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };
  const deleteData = async () => {
    setLoader(true);
    const docRef = doc(firestore, "epension", id);
    await deleteDoc(docRef)
      .then(() => {
        toast.success("Data Deleted Successfully");
        setLoader(false);
        navigate(-1);
      })
      .catch((err) => {
        toast.error("Data Deletation Failed");
        setLoader(false);
        console.log(err);
      });
  };
  const isFormValid = () => {
    if (
      !inputField.tname ||
      !inputField.desig ||
      !inputField.dob ||
      !inputField.doj ||
      !inputField.dojnow ||
      !inputField.dor ||
      !inputField.phone ||
      !inputField.email ||
      !inputField.hoi ||
      !inputField.gender ||
      !inputField.id ||
      !inputField.empid ||
      !inputField.school ||
      !inputField.address ||
      !inputField.account ||
      !inputField.ifsc ||
      !inputField.spouse ||
      !inputField.spouseDob
    ) {
      toast.error("Please fill all the fields");
      return false;
    }
    return true;
  };
  const getData = async () => {
    setLoader(true);
    await getModifiedSalary();
    try {
      const q = query(
        collection(firestore, "epension"),
        where("id", "==", inputField.id)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        toast.error("No Previous Data Found");
        setLoader(false);
        setDetailsFound(false);
      } else {
        const data = querySnapshot.docs[0].data();
        setInputField(data);
        setChildren(data.children);
        setLoader(false);
        toast.success("Previous Data Found");
        setDetailsFound(true);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setLoader(false);
    }
  };
  const getModifiedSalary = async () => {
    try {
      const salaryMonth = await getRetirementMonthYear();
      setLoader(true);
      const q1 = await readCSVFile(salaryMonth);

      const techersSalary = q1?.filter((el) => el.id === id)[0];
      const { basic, daPercent, hraPercent, addl, ma, gpf, gsli, disability } =
        techersSalary;
      const da = Math.round(basic * daPercent);
      const hra = hraPercent > 10 ? hraPercent : Math.round(basic * hraPercent);
      const gross = basic + da + hra + addl + ma;
      let ptax = 0;
      if (gross > 40000) {
        ptax = 200;
      } else if (gross > 25000) {
        ptax = 150;
      } else if (gross > 15000) {
        ptax = 130;
      } else if (gross > 10000) {
        ptax = 110;
      } else {
        ptax = 0;
      }

      if (disability === "YES") {
        ptax = 0;
      }

      const deduction = gsli + gpf + ptax;

      const netpay = gross - deduction;
      const halfBasicPay = basic / 2;
      const commutedPension = Math.round(halfBasicPay * 0.4);
      const unCommutedPension = Math.round(halfBasicPay * 0.6);
      const daPension = Math.round(halfBasicPay * daPercent);
      const netPension = unCommutedPension + daPension;
      const serviceLength =
        parseInt(dor.split("-")[2]) - parseInt(doj.split("-")[2]);
      let halfServiceLength;
      if (serviceLength >= 33) {
        halfServiceLength = 16.5;
      } else {
        halfServiceLength = serviceLength / 2;
      }

      const gratuity = Math.round(basic * (1 + daPercent) * halfServiceLength);
      const gainAgainstCommutation = Math.round(commutedPension * 98.328);
      const totalGain = gratuity + gainAgainstCommutation;
      setSalaryData({
        basic,
        da,
        hra,
        addl,
        ma,
        gross,
        ptax,
        deduction,
        gpf,
        gsli,
        netpay,
        halfBasicPay,
        commutedPension,
        unCommutedPension,
        daPension,
        netPension,
        gratuity,
        gainAgainstCommutation,
        totalGain,
      });
      setLoader(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };
  async function getRetirementMonthYear() {
    // Parse retirement date
    const [dd, mm, yyyy] = dor.split("-").map(Number);
    const retirementDate = new Date(yyyy, mm - 1, dd);

    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    // --- Case 1: Retirement in June 2025
    if (yyyy === thisYear && retirementDate.getMonth() === 5) {
      // June = 5
      return `june-${thisYear}`;
    }

    // --- Case 2: Retirement between July 2025 and March 2026
    if (
      (yyyy === thisYear && retirementDate.getMonth() >= 6) || // July–Dec 2025
      (yyyy === nextYear && retirementDate.getMonth() <= 2) // Jan–Mar 2026
    ) {
      return `${monthNames[retirementDate.getMonth()]}-${yyyy}`;
    }

    // --- Case 3: Retirement after March 2026
    if (
      yyyy > nextYear ||
      (yyyy === nextYear && retirementDate.getMonth() > 2)
    ) {
      return `march-${nextYear}`;
    }

    // --- Otherwise (before June 2025) → June 2025
    return `june-${thisYear}`;
  }
  const downloadEpensiondata = async () => {
    setLoader(true);
    const querySnapshot = await getDocs(
      query(collection(firestore, "epension"))
    );
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    createDownloadLink(data, "epension");
    setLoader(false);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (state !== "admin") {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container timesFont">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      {loader && <Loader />}
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn m-3 btn-sm m-2 btn-warning"
          onClick={downloadEpensiondata}
        >
          Download Pension Data
        </button>
        <button
          type="button"
          className="btn btn-dark m-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
      <div className="my-1">
        <h3 className="text-primary fw-bold">{tname}</h3>
        <h5 className="text-success fw-bold">
          {desig === "HT" ? "HEAD TECHER" : "ASSISTANT TEACHER"}
        </h5>
        <h5 className="text-primary fw-bold">{school}</h5>
        <h5>Date of Birth: {dob}</h5>
        <h5>Date of Joining: {doj}</h5>
        <h5>Date of Retirement: {dor}</h5>
        <button
          type="button"
          className="btn btn-success m-2"
          onClick={() => {
            setShowModal(true);
            setShowFamily(false);
            setShowTopSheet(false);
            setShowHRAForm(false);
            setShowDCRGForm(false);
            setShowLTAForm(false);
            setShowLeaveForm(false);
            setShowSalary(false);
            setTimeout(() => {
              ifsc_ser(inputField.ifsc);
            }, 200);
          }}
        >
          Enter Details
        </button>
      </div>
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Enter Basic Details of {titleCase(tname)}, {desig} of{" "}
                  {titleCase(school)}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                  }}
                ></button>
              </div>
              <div className="modal-body mx-auto">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={inputField.tname}
                    onChange={(e) => {
                      setInputField({ ...inputField, tname: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">School</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="School"
                    value={inputField.school}
                    onChange={(e) => {
                      setInputField({ ...inputField, school: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">UDISE</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UDISE"
                    value={inputField.udise}
                    onChange={(e) => {
                      setInputField({ ...inputField, udise: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="purpose_type" className="form-label">
                    Designation
                  </label>
                  <select
                    className="form-select"
                    defaultValue={inputField.desig}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setInputField({ ...inputField, desig: e.target.value });
                      } else {
                        toast.error("Select Designation");
                      }
                    }}
                  >
                    <option value="">Select Designation</option>
                    <option value="HT">HEAD TEACHER</option>
                    <option value="AT">ASSISTANT TEACHER</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Employee ID"
                    value={inputField?.empid}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        empid: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date Of Birth:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.dob)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        dob: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date Of Joining:</label>

                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.doj)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        doj: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Date Of Joining in Current School:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.dojnow)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        dojnow: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date Of Retirement:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.dor)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        dor: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address:</label>
                  <textarea
                    name="address"
                    cols="5"
                    rows="3"
                    className="form-control"
                    placeholder="Address"
                    style={{ resize: "none" }}
                    value={inputField?.address}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        address: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile No.</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Mobile No."
                    value={inputField?.phone}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        phone: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={inputField?.email}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Account Number"
                    value={inputField?.account}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        account: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">IFS Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="IFS Code"
                    value={inputField?.ifsc}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        ifsc: e.target.value,
                      });
                      ifsc_ser(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="mb-3 text-primary text-center"
                  id="bankdiv"
                  style={{ zoom: 0.6 }}
                ></div>
                <div className="mb-3">
                  <label className="form-label">Application No.</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Application No."
                    value={inputField?.applicationNo}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        applicationNo: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Spouse Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Spouse Name"
                    value={inputField?.spouse}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        spouse: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Spouse's Date Of Birth:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.spouseDob)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        spouseDob: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                {children.map((child, index) => (
                  <div key={index} className="mx-auto border rounded p-2 my-2">
                    <div className="d-flex justify-content-center align-items-center mb-2">
                      <h5 className="mb-0 text-center">Child {index + 1}</h5>
                      {children.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger m-2"
                          onClick={() => removeChildren(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">
                        Child {index + 1}'s Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Child's Name"
                        value={child.name}
                        onChange={(e) => handleChildrenChange(index, e)}
                      />
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">
                        Child {index + 1}'s Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={getCurrentDateInput(child.dob)}
                        onChange={(e) => handleChildrenChange(index, e)}
                      />
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">
                        Child {index + 1}'s Gender
                      </label>
                      <select
                        className="form-select"
                        name="gender"
                        value={child.gender}
                        onChange={(e) => handleChildrenChange(index, e)}
                      >
                        <option value="">Select Gender</option>
                        <option value="SON">SON</option>
                        <option value="DAUGHTER">DAUGHTER</option>
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          checked={child.selected}
                          onChange={(e) => {
                            const list = [...children];
                            list[index].selected = e.target.checked;
                            setChildren(list);
                            setInputField({ ...inputField, children: list });
                          }}
                          name="selected"
                          aria-label="Checkbox for following text input"
                        />
                      </div>
                      <span className="input-group-text">
                        Select for Nominee
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-primary m-2"
                  type="button"
                  onClick={addChildren}
                >
                  Add Children
                </button>
              </div>
              <div className="modal-footer d-flex flex-column">
                <div>
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    // disabled={compareObjects(inputField, prevData)}
                    onClick={saveData}
                  >
                    Save To DB
                  </button>

                  {detailsFound && (
                    <button
                      className="btn btn-danger m-2"
                      style={{
                        backgroundColor: "darkred",
                      }}
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        deleteData();
                      }}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    className="btn btn-danger m-2"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={() => {
            setShowSalary(!showSalary);
            setShowModal(false);
            setShowTopSheet(false);
            setShowHRAForm(false);
            setShowDCRGForm(false);
            setShowLTAForm(false);
            setShowLeaveForm(false);
          }}
        >
          {showSalary ? "Hide" : "Show"} Pension Salary
        </button>
        {showSalary && (
          <div className="my-2 mx-auto">
            <div
              className="modal fade show"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
              aria-modal="true"
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Salary Details of {titleCase(tname)}, {desig} of{" "}
                      {titleCase(school)}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => {
                        setShowSalary(false);
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="card mb-3">
                      <div className="card-header">
                        {" "}
                        <h5 className="card-title">Last Salary Withdrawn</h5>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Basic Pay: Rs. {IndianFormat(salaryData.basic)}
                        </h5>
                        <h5 className="card-title">
                          DA: Rs. {IndianFormat(salaryData.da)}
                        </h5>
                        <h5 className="card-title">
                          HRA: Rs. {IndianFormat(salaryData.hra)}
                        </h5>
                        {salaryData.addl > 0 && (
                          <h5 className="card-title">
                            ADDL: Rs. {IndianFormat(salaryData.addl)}
                          </h5>
                        )}
                        {salaryData.ma > 0 && (
                          <h5 className="card-title">
                            MA: Rs. {IndianFormat(salaryData.ma)}
                          </h5>
                        )}
                        <h5 className="card-title">
                          Gross: Rs. {IndianFormat(salaryData.gross)}
                        </h5>
                        {salaryData.gpf > 0 && (
                          <h5 className="card-title">
                            GPF: Rs. {IndianFormat(salaryData.gpf)}
                          </h5>
                        )}
                        {salaryData.gsli > 0 && (
                          <h5 className="card-title">
                            GSLI: Rs. {IndianFormat(salaryData.gsli)}
                          </h5>
                        )}

                        <h5 className="card-title">
                          Ptax: Rs. {IndianFormat(salaryData.ptax)}
                        </h5>
                        <h5 className="card-title">
                          Deduction: Rs. {IndianFormat(salaryData.deduction)}
                        </h5>
                        <h5 className="card-title">
                          Net Pay: Rs. {IndianFormat(salaryData.netpay)}
                        </h5>
                      </div>
                    </div>
                    <div className="card mb-3">
                      <div className="card-header">
                        {" "}
                        <h5 className="card-title">Pension Details</h5>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Basic Pay: Rs.{" "}
                          {IndianFormat(salaryData.unCommutedPension)}
                        </h5>
                        <h5 className="card-title">
                          DA: Rs. {IndianFormat(salaryData.daPension)}
                        </h5>
                        <h5 className="card-title">
                          Net Pension: Rs. {IndianFormat(salaryData.netPension)}
                        </h5>
                        <h5 className="card-title">
                          Gratuity: Rs. {IndianFormat(salaryData.gratuity)}
                        </h5>
                        <h5 className="card-title">
                          Gain Against Commutation: Rs.{" "}
                          {IndianFormat(salaryData.gainAgainstCommutation)}
                        </h5>
                        <h5 className="card-title">
                          Total Gain: Rs. {IndianFormat(salaryData.totalGain)}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex flex-column">
                    <button
                      className="btn btn-danger m-2"
                      type="button"
                      onClick={() => {
                        setShowSalary(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {detailsFound && (
        <div>
          <div
            className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
            style={{ width: "50%" }}
          >
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => {
                setShowFamily(!showFamily);
                setShowTopSheet(false);
                setShowHRAForm(false);
                setShowDCRGForm(false);
                setShowLTAForm(false);
                setShowLeaveForm(false);
                setShowModal(false);
                setShowSalary(false);
              }}
            >
              {showFamily ? "Hide" : "Show"} Family Form
            </button>
            {showFamily && (
              <div className="my-2 mx-auto">
                {/* <FamilyList data={inputField} /> */}
                <PDFDownloadLink
                  document={<FamilyList data={inputField} />}
                  fileName={`Family List of ${tname}.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#fff",
                    backgroundColor: "navy",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download Family List"
                  }
                </PDFDownloadLink>
              </div>
            )}
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
            style={{ width: "50%" }}
          >
            <button
              type="button"
              className="btn btn-info m-2"
              onClick={() => {
                setShowFamily(false);
                setShowTopSheet(!showTopSheet);
                setShowHRAForm(false);
                setShowDCRGForm(false);
                setShowLTAForm(false);
                setShowLeaveForm(false);
                setShowModal(false);
                setShowSalary(false);
              }}
            >
              {showTopSheet ? "Hide" : "Show"} Top Sheet Form
            </button>
            {showTopSheet && (
              <div className="my-2 mx-auto">
                {/* <TopSheetEPension data={inputField} /> */}
                <PDFDownloadLink
                  document={<TopSheetEPension data={inputField} />}
                  fileName={`Top Sheet of ${tname}.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#fff",
                    backgroundColor: "navy",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download Top Sheet"
                  }
                </PDFDownloadLink>
              </div>
            )}
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
            style={{ width: "50%" }}
          >
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => {
                setShowFamily(false);
                setShowTopSheet(false);
                setShowHRAForm(!showHRAForm);
                setShowDCRGForm(false);
                setShowLTAForm(false);
                setShowLeaveForm(false);
                setShowModal(false);
                setShowSalary(false);
              }}
            >
              {showHRAForm ? "Hide" : "Show"} HRA Form
            </button>
            {showHRAForm && (
              <div className="my-2 mx-auto">
                {/* <PensionHRA data={inputField} /> */}
                <PDFDownloadLink
                  document={<PensionHRA data={inputField} />}
                  fileName={`HRA Form of ${tname}.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#fff",
                    backgroundColor: "navy",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download HRA Form"
                  }
                </PDFDownloadLink>
              </div>
            )}
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
            style={{ width: "50%" }}
          >
            <button
              type="button"
              className="btn btn-success m-2"
              onClick={() => {
                setShowFamily(false);
                setShowTopSheet(false);
                setShowHRAForm(false);
                setShowDCRGForm(!showDCRGForm);
                setShowLTAForm(false);
                setShowLeaveForm(false);
                setShowModal(false);
                setShowSalary(false);
              }}
            >
              {showDCRGForm ? "Hide" : "Show"} DCRG Form
            </button>
            {showDCRGForm && (
              <div className="my-2 mx-auto">
                {/* <DCRGForm data={inputField} /> */}
                <PDFDownloadLink
                  document={<DCRGForm data={inputField} />}
                  fileName={`DCRG Form of ${tname}.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#fff",
                    backgroundColor: "navy",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download DCRG Form"
                  }
                </PDFDownloadLink>
              </div>
            )}
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
            style={{ width: "50%" }}
          >
            <button
              type="button"
              className="btn btn-info m-2"
              onClick={() => {
                setShowFamily(false);
                setShowTopSheet(false);
                setShowHRAForm(false);
                setShowDCRGForm(false);
                setShowLTAForm(!showLTAForm);
                setShowLeaveForm(false);
                setShowModal(false);
                setShowSalary(false);
              }}
            >
              {showLTAForm ? "Hide" : "Show"} LTA Form
            </button>
            {showLTAForm && (
              <div className="my-2 mx-auto">
                {/* <LTAForm data={inputField} /> */}
                <PDFDownloadLink
                  document={<LTAForm data={inputField} />}
                  fileName={`LTA Form of ${tname}.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#fff",
                    backgroundColor: "navy",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download LTA Form"
                  }
                </PDFDownloadLink>
              </div>
            )}
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
            style={{ width: "50%" }}
          >
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => {
                setShowFamily(false);
                setShowTopSheet(false);
                setShowHRAForm(false);
                setShowDCRGForm(false);
                setShowLTAForm(false);
                setShowLeaveForm(!showLeaveForm);
                setShowModal(false);
                setShowSalary(false);
              }}
            >
              {showLeaveForm ? "Hide" : "Show"} Leave Form
            </button>
            {showLeaveForm && (
              <div className="my-2 mx-auto">
                {/* <PensionLeaveForm data={inputField} /> */}
                <PDFDownloadLink
                  document={<PensionLeaveForm data={inputField} />}
                  fileName={`Leave Form of ${tname}.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#fff",
                    backgroundColor: "navy",
                    border: "1px solid #4a4a4a",
                    width: "40%",
                    borderRadius: 10,
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Please Wait..." : "Download Leave Form"
                  }
                </PDFDownloadLink>
              </div>
            )}
          </div>
        </div>
      )}
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-5"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-dark m-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

        <a
          href="https://epension.wb.gov.in/e_Pension/ApplicantLogin"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary m-2"
        >
          Go to e-Pension
        </a>
      </div>
    </div>
  );
}
