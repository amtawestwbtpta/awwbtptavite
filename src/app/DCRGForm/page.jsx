import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../context/Store";
import {
  compareObjects,
  createDownloadLink,
  getCurrentDateInput,
  getSubmitDateInput,
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
import { toast, ToastContainer } from "react-toastify";
import TeacherDCRGForm from "../../pdfs/TeacherDCRGForm";
import { PDFDownloadLink } from "@react-pdf/renderer";
export default function DCRGForm() {
  const { state, stateObject } = useGlobalContext();
  const { id, tname, address } = stateObject;
  const navigate = useNavigate();
  const dobRef = useRef();
  const relationRef = useRef();
  const [loader, setLoader] = useState(false);
  const [dataFound, setDataFound] = useState(false);
  const [nominee, setNominee] = useState("");
  const [nomineeDob, setNomineeDob] = useState("01-01-2000");
  const [relationship, setRelationship] = useState("");
  const [nomineeAddress, setnomineeAddress] = useState(address);
  const [showModal, setShowModal] = useState(true);
  const [showDCRGForm, setShowDCRGForm] = useState(false);
  const saveData = async () => {
    setLoader(true);
    if (nominee === "") {
      toast.error("Enter Nominee Name");
      setLoader(false);
      return;
    }
    if (relationship === "") {
      toast.error("Select Relationship with Nominee");
      setLoader(false);
      return;
    }
    if (nomineeAddress === "") {
      toast.error("Enter Nominee Address");
      setLoader(false);
      return;
    }
    await setDoc(doc(firestore, "nominee", id), {
      id,
      tname,
      nominee: nominee,
      nomineeDob,
      relationship,
      nomineeAddress: nomineeAddress,
    })
      .then(() => {
        setLoader(false);
        setDataFound(true);
        setShowModal(false);
        toast.success("Nominee Data Added Successfully!");
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Error Adding Nominee Data!");
        console.log(e);
      });
  };
  const getData = async () => {
    setLoader(true);
    try {
      const q = query(collection(firestore, "nominee"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        setLoader(false);
        setShowModal(true);
        setDataFound(false);
        toast.error("Nominee Data Not Found!");
      } else {
        const data = querySnapshot.docs[0].data();
        setNominee(data.nominee);
        setNomineeDob(data.nomineeDob);
        setRelationship(data.relationship);
        setnomineeAddress(data.nomineeAddress);
        relationRef.current.value = data.relationship;
        dobRef.current.value = getCurrentDateInput(data.nomineeDob);
        setLoader(false);
        setDataFound(true);
        setShowModal(true);
        toast.success("Nominee Data Found, You can Edit it.");
      }
    } catch (error) {
      setLoader(false);
      setShowModal(true);
      toast.error("Nominee Data Not Found!");
      console.log(error);
    }
  };
  const deleteData = async () => {
    if (confirm("Are you sure you want to delete this data?")) {
      setLoader(true);
      await deleteDoc(doc(firestore, "nominee", id))
        .then(() => {
          setLoader(false);
          setDataFound(false);
          setShowModal(false);
          setNominee("");
          setNomineeDob("01-01-2000");
          setRelationship("");
          setnomineeAddress(address);
          relationRef.current.value = "";
          dobRef.current.value = getCurrentDateInput("01-01-2000");
          setShowModal(true);
          toast.success("Nominee Data Deleted Successfully!");
        })
        .catch((e) => {
          setLoader(false);
          toast.error("Error Deleting Nominee Data!");
          console.log(e);
        });
    }
  };
  useEffect(() => {
    if (state !== "admin") {
      navigate("/logout");
    }
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container text-center my-3">
      {loader && <Loader />}
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
      <h1 className="text-center">DCRG Form</h1>
      <h3 className="text-center">{tname}</h3>
      <button
        type="button"
        className="btn btn-danger btn-sm noprint m-3"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      <button
        type="button"
        className="btn btn-primary btn-sm noprint m-3"
        onClick={() => setShowModal(true)}
      >
        Enter Details
      </button>
      {dataFound && !showModal && (
        <button
          type="button"
          className="btn btn-success btn-sm noprint m-3"
          onClick={() => setShowDCRGForm(!showDCRGForm)}
        >
          {showDCRGForm ? "Hide" : "Show"} DCRG Form
        </button>
      )}
      {!showModal && showDCRGForm && (
        <div className="m-3 mx-auto">
          {/* <TeacherDCRGForm
            data={{
              tname,
              relationship,
              nomineeAddress,
              nominee,
              nomineeDob,
            }}
          /> */}
          <PDFDownloadLink
            document={
              <TeacherDCRGForm
                data={{
                  tname,
                  relationship,
                  nomineeAddress,
                  nominee,
                  nomineeDob,
                }}
              />
            }
            fileName={`DCRG AND PF NOMINEE Form OF ${tname}.pdf`}
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
      <h3>DCRG Form Page</h3>
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
                  Set Nominee Data of {tname}
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
              <div className="modal-body">
                <div className="mx-auto justify-content-center align-items-baseline">
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Nominee Name
                    </label>
                    <input
                      type="text"
                      className="form-control col-md-6"
                      placeholder="Enter Nominee Name"
                      value={nominee}
                      onChange={(e) => {
                        setNominee(e.target.value.toUpperCase());
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Nominee Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control col-md-6"
                      ref={dobRef}
                      defaultValue={getCurrentDateInput(nomineeDob)}
                      onChange={(e) => {
                        setNomineeDob(getSubmitDateInput(e.target.value));
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="purpose_type" className="form-label">
                      Relationship with Nominee
                    </label>
                    <select
                      className="form-select col-md-6"
                      defaultValue={relationship}
                      ref={relationRef}
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setRelationship(e.target.value);
                        } else {
                          setRelationship("");
                          toast.error("Select Nature of Leave");
                        }
                      }}
                    >
                      <option value="">Select Relationship</option>
                      <option value="WIFE">WIFE</option>
                      <option value="HUSBAND">HUSBAND</option>
                      <option value="FATHER">FATHER</option>
                      <option value="MOTHER">MOTHER</option>
                      <option value="SON">SON</option>
                      <option value="DAUGHTER">DAUGHTER</option>
                    </select>
                  </div>
                  <div className="m-3">
                    <label className="form-label">Address of Nominee</label>
                    <textarea
                      type="text"
                      className="form-control mb-3 mx-auto col-md-6"
                      value={nomineeAddress}
                      placeholder="Address of Nominee"
                      rows={3}
                      cols={5}
                      onChange={(e) =>
                        setnomineeAddress(e.target.value.toUpperCase())
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={saveData}
                >
                  Save
                </button>
                {dataFound && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={deleteData}
                  >
                    Delete
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
