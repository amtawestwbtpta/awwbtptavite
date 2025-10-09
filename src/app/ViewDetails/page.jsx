import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { firestore } from "../../context/FirebaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import Loader from "../../components/Loader";

const ViewDetails = () => {
  const { state, stateObject, deductionState, setDeductionState } =
    useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state !== "admin") {
      localStorage.clear();
      navigate("/logout");
    }
  }, []);

  let details = stateObject;
  let {
    udise,
    tname,
    desig,
    school,
    disability,
    gp,
    phone,
    email,
    dob,
    doj,
    dojnow,
    dor,
    bank,
    account,
    ifsc,
    empid,
    training,
    pan,
    address,
    fname,
    question,
    hoi,
  } = details;
  const [loader, setLoader] = useState(false);
  const [showDeductionForm, setShowDeductionForm] = useState(false);
  const [teacherDeduction, setTeacherDeduction] = useState({
    id: "",
    tname: "",
    hbLoanPrincipal: "",
    hbLoanInterest: "",
    lic: "",
    ulip: "",
    ppf: "",
    nsc: "",
    nscInterest: "",
    tutionFee: "",
    sukanya: "",
    stampDuty: "",
    mediclaim: "",
    terminalDisease: "",
    handicapTreatment: "",
    educationLoan: "",
    charity: "",
    disability: "",
    rgSaving: "",
    otherIncome: "",
    fd: "",
    tds: "",
  });
  const getDeduction = async (id) => {
    if (deductionState.length === 0) {
      setLoader(true);
      const q = query(collection(firestore, "deduction"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
      setDeductionState(data);
      setLoader(false);
      setShowDeductionForm(true);
      const filteredData = data.filter((d) => d.id === id)[0];
      setTeacherDeduction(filteredData);
    } else {
      const filteredData = deductionState.filter((d) => d.id === id)[0];
      setTeacherDeduction(filteredData);
      setShowDeductionForm(true);
      setLoader(false);
    }
  };
  const updateTeacherDeduction = async () => {
    const docRef = doc(firestore, "deduction", teacherDeduction.id);
    setLoader(true);
    await updateDoc(docRef, teacherDeduction)
      .then(() => {
        setLoader(false);
        let y = deductionState.filter((el) => el.id !== teacherDeduction.id);
        y = [...y, teacherDeduction];
        const newData = y.sort((a, b) => {
          if (a.tname < b.tname) {
            return -1;
          }
          if (a.tname > b.tname) {
            return 1;
          }
        });
        setDeductionState(newData);
        toast.success("Deduction Updated Successfully!");
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Error Updating Deduction!");
        console.log(e);
      });
  };
  const ifsc_ser = () => {
    fetch(`https://ifsc.razorpay.com/${ifsc}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof window !== undefined) {
          document.getElementById("ifsc").innerHTML =
            "<P>Bank Details<br>Bank Name: " +
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
        }
      });
  };
  useEffect(() => {
    ifsc_ser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container my-5 text-center d-flex flex-column justify-content-center">
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
      <h3 className="text-primary my-3 text-center">
        Details of {tname} of {school}
      </h3>
      <div className="row d-flex justify-content-center text-black">
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Teacher Name: </label>
          </div>
          <div>
            <p>{tname}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Father's Name: </label>
          </div>
          <div>
            <p>{fname}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>School Name: </label>
          </div>
          <div>
            <p>{school}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>UDISE: </label>
          </div>
          <div>
            <p>{udise}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Designation: </label>
          </div>
          <div>
            <p>{desig}</p>
          </div>
        </div>
        {disability === "YES" ? (
          <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
            <div>
              <label>Is Disable? </label>
            </div>
            <div>
              <p>{disability}</p>
            </div>
          </div>
        ) : null}
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Is HOI? </label>
          </div>
          <div>
            <p>{hoi}</p>
          </div>
        </div>
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Gram Panchayet: </label>
          </div>
          <div>
            <p>{gp}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Mobile: </label>
          </div>
          <div>
            <a
              href={`tel: +91${phone}`}
              className="d-inline-block fs-6 text-decoration-none text-dark"
            >
              {phone}
            </a>
            <br />
          </div>
        </div>
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Email: &nbsp; </label>
          </div>
          <div className="blank"></div>
          <div>
            <p>{email}</p>
          </div>
        </div>
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Date of Birth: </label>
          </div>
          <div>
            <p>{dob}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Date of Joining: </label>
          </div>
          <div>
            <p>{doj}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>DOJ in Present School: </label>
          </div>
          <div>
            <p>{dojnow}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Date of Retirement: </label>
          </div>
          <div>
            <p>{dor}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Employee ID: </label>
          </div>
          <div>
            <p>{empid}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Training: </label>
          </div>
          <div>
            <p>{training}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>PAN: </label>
          </div>
          <div>
            <p>{pan}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Address: </label>
          </div>
          <div>
            <p>{address}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>BANK: </label>
          </div>
          <div>
            <p>{bank}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Account No: </label>
          </div>
          <div>
            <p>{account}</p>
          </div>
        </div>

        <div
          className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2"
          id="ifsc"
        ></div>
        {question === "admin" ? (
          <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
            <div>
              <label>Question Access: </label>
            </div>
            <div>
              <p>{question}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="col-md-4 mx-auto">
        <button
          type="button"
          className="btn btn-success btn-sm noprint m-3"
          onClick={() => {
            window.print();
          }}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-info btn-sm noprint m-3"
          onClick={() => navigate("/EditTeacher")}
        >
          Edit Details
        </button>
        <button
          type="button"
          className="btn btn-success btn-sm noprint m-3"
          onClick={() => navigate("/LeaveProposalNewPage")}
        >
          Leave Proposal
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm noprint m-3"
          onClick={() => navigate("/HRADeclarationApp")}
        >
          HRA Declaration
        </button>
        <button
          type="button"
          className="btn btn-dark btn-sm noprint m-3"
          onClick={() => navigate("/payslipwbtpta")}
        >
          Payslip WBTPTA
        </button>
        <button
          type="button"
          className="btn btn-success btn-sm noprint m-3"
          onClick={() => {
            const { id, tname, school, pan, disability, desig, fname } =
              stateObject;
            const data = {
              id,
              tname,
              school,
              pan,
              disability,
              desig,
              fname,
            };
            navigate(`/Form16NewPage?data=${JSON.stringify(data)}`);
          }}
        >
          Download Form 16
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm noprint m-3"
          onClick={() => navigate("/DCRGForm")}
        >
          DCRG Form
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm noprint m-3"
          onClick={() => navigate("/techpaysliposmsNew")}
        >
          OSMS Payslip
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm noprint m-3"
          onClick={() => {
            getDeduction(stateObject?.id);
          }}
        >
          Update Deduction
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm noprint m-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
      {showDeductionForm && (
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
                  Set Deduction Data of {teacherDeduction.tname}
                </h1>
              </div>
              <div className="modal-body">
                <div className="col-md-6 row mx-auto justify-content-center align-items-baseline">
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      LIC
                    </label>
                    <input
                      type="number"
                      className="form-control col-md-4"
                      placeholder="LIC"
                      value={teacherDeduction.lic}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            lic: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            lic: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      PPF
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="PPF"
                      value={teacherDeduction.ppf}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            ppf: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            ppf: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Homeloan Principal
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Homeloan Principal"
                      value={teacherDeduction.hbLoanPrincipal}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            hbLoanPrincipal: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            hbLoanPrincipal: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Homeloan Interest
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Homeloan Interest"
                      value={teacherDeduction.hbLoanInterest}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            hbLoanInterest: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            hbLoanInterest: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Mediclaim
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Mediclaim"
                      value={teacherDeduction.mediclaim}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            mediclaim: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            mediclaim: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Sukanya
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Sukanya"
                      value={teacherDeduction.sukanya}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            sukanya: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            sukanya: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      NSC
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="NSC"
                      value={teacherDeduction.nsc}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            nsc: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            nsc: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Interest on NSC
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Interest on NSC"
                      value={teacherDeduction.nscInterest}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            nscInterest: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            nscInterest: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Tution Fees
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Tution Fees"
                      value={teacherDeduction.tutionFee}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            tutionFee: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            tutionFee: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      F.D. (5 Year)
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Tution Fees"
                      value={teacherDeduction.fd}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            fd: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            fd: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Disabled dependent Treatment
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Disabled dependent Treatment"
                      value={teacherDeduction.handicapTreatment}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            handicapTreatment: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            handicapTreatment: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Terminal Disease
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="terminal Disease"
                      value={teacherDeduction.terminalDisease}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            terminalDisease: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            terminalDisease: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Education Loan Interest
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Education Loan Interest"
                      value={teacherDeduction.educationLoan}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            educationLoan: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            educationLoan: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Disabled Teacher
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Disabled Teacher"
                      value={teacherDeduction.disability}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            disability: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            disability: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      Charity
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Charity"
                      value={teacherDeduction.charity}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            charity: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            charity: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      ULIP /ELSS
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="ULIP /ELSS"
                      value={teacherDeduction.ulip}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            ulip: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            ulip: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="date" className="form-label">
                      TDS Submitted
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="TDS Submitted"
                      value={teacherDeduction.tds}
                      onChange={(e) => {
                        if (e.target.value) {
                          setTeacherDeduction({
                            ...teacherDeduction,
                            tds: parseInt(e.target.value),
                          });
                        } else {
                          setTeacherDeduction({
                            tds: "",
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    setShowDeductionForm(false);
                    updateTeacherDeduction();
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setShowDeductionForm(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {loader && <Loader />}
    </div>
  );
};

export default ViewDetails;
