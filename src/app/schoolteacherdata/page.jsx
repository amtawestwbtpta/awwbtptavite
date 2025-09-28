import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { ToastContainer, toast } from "react-toastify";
import { firestore } from "../../context/FirebaseContext";
import { doc, updateDoc } from "firebase/firestore";
const SchoolTeacherData = () => {
  const {
    state,
    schoolState,
    setSchoolState,
    teachersState,
    setSchoolUpdateTime,
    setStateArray,
    setStateObject,
  } = useGlobalContext();
  const navigate = useNavigate();

  const [teacherData, setTeacherData] = useState(teachersState);
  const [schoolData, setschoolData] = useState(schoolState);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSchool, setFilteredSchool] = useState({
    pp: 0,
    i: 0,
    ii: 0,
    iii: 0,
    iv: 0,
    v: 0,
    student_prev2: 0,
    id: "",
    school: "",
    total_student: 0,
    student: 0,
    gp: "",
    year: 2025,
    udise: "",
  });

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:School Wise Teacher Data";
    if (!state) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [inputField, setInputField] = useState({
    pp: 0,
    i: 0,
    ii: 0,
    iii: 0,
    iv: 0,
    v: 0,
    student_prev2: 0,
    id: "",
    school: "",
    total_student: 0,
    student: 0,
    gp: "",
    year: 2025,
    udise: "",
  });
  const update = async () => {
    const newData = {
      ...inputField,
      school: inputField.school,
      pp: inputField.pp,
      i: inputField.i,
      ii: inputField.ii,
      iii: inputField.iii,
      iv: inputField.iv,
      v: inputField.v,
      total_student: parseInt(
        inputField.pp +
          inputField.i +
          inputField.ii +
          inputField.iii +
          inputField.iv +
          inputField.v
      ),
    };
    try {
      const docRef = doc(firestore, "schools", newData.id);
      await updateDoc(docRef, newData);
      let y = schoolState.filter((el) => el.id !== inputField.id);
      y = [...y, newData];
      y = y.sort(function (a, b) {
        var nameA = a.school.toLowerCase(),
          nameB = b.school.toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      });
      setSchoolState(y);
      setSchoolUpdateTime(Date.now());
      setschoolData(y);

      toast.success("Congrats! School Data Updated Successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      toast.error("Unable To Send Query!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleSelection = (e) => {
    const value = e.target.value;
    if (value) {
      const tData = teacherData.filter((el) => el.udise.match(value));
      const sData = schoolData.filter((el) => el.udise.match(value))[0];
      setFilteredData(tData);
      setStateArray(tData);
      setFilteredSchool(sData);
      setInputField(sData);
    } else {
      toast.error("Please Select School Name");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // parse numbers only for student fields
    const parsedValue =
      ["pp", "i", "ii", "iii", "iv", "v"].includes(name) && value !== ""
        ? parseInt(value) || 0
        : value;

    const updatedField = { ...inputField, [name]: parsedValue };

    // recalculate total only from student fields
    const total =
      (parseInt(updatedField.pp) || 0) +
      (parseInt(updatedField.i) || 0) +
      (parseInt(updatedField.ii) || 0) +
      (parseInt(updatedField.iii) || 0) +
      (parseInt(updatedField.iv) || 0) +
      (parseInt(updatedField.v) || 0);

    setInputField({
      ...updatedField,
      total_student: total,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, [inputField, schoolData, filteredSchool, teacherData]);
  useEffect(() => {
    setTeacherData(teachersState);
    setschoolData(schoolState);
    //eslint-disable-next-line
  }, [schoolState, teachersState]);

  return (
    <div className="container my-5">
      <>
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
        <div className="col-md-6 mx-auto mb-3">
          <select
            className="form-select"
            defaultValue={""}
            onChange={handleSelection}
            aria-label="Default select example"
          >
            <option value="">Select School Name</option>
            {schoolData.length > 0
              ? schoolData.map((el) => {
                  return (
                    <option key={el.id} value={el.udise}>
                      {el.school}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        {filteredSchool.school && (
          <div className="container my-3 mx-auto">
            <div className="row my-3">
              <div className="col-md-6">
                <h4 className="text-primary text center">
                  SCHOOL NAME: {filteredSchool.school}
                </h4>
              </div>
              <div className="col-md-6">
                <h4 className="text-primary text center">
                  GP NAME: {filteredSchool.gp}
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  UDISE: {filteredSchool.udise}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  Total Teacher: {filteredData.length}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  Total Student {filteredSchool.year - 2}:{" "}
                  {filteredSchool.student_prev2}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  Total Student {filteredSchool.year - 1}:{" "}
                  {filteredSchool.student}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  Total Student {filteredSchool.year}:{" "}
                  {filteredSchool.total_student}
                </h6>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  No. of Pre Primary Students: {filteredSchool.pp}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  No. of Class I Students: {filteredSchool.i}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  No. of Class II Students: {filteredSchool.ii}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  No. of Class III Students: {filteredSchool.iii}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text center">
                  No. of Class IV Students: {filteredSchool.iv}
                </h6>
              </div>
              {filteredSchool.v > 0 ? (
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    No. of Class V Students: {filteredSchool.v}
                  </h6>
                </div>
              ) : null}
            </div>
            <div className="my-2">
              {(filteredData.length > 2 &&
                filteredSchool.total_student >= 100 &&
                Math.floor(
                  filteredSchool.total_student / filteredData.length
                ) >= 40) ||
              (filteredData.length > 2 &&
                filteredSchool.total_student < 100 &&
                Math.floor(filteredSchool.total_student / filteredData.length) >
                  35) ||
              (filteredData.length <= 2 &&
                Math.floor(filteredSchool.total_student / filteredData.length) >
                  35) ? (
                <div>
                  <h4 className="m-0 text-danger text-center">
                    Student Teacher Ratio is{" "}
                    {Math.floor(
                      filteredSchool.total_student / filteredData.length
                    )}
                    , Less Teacher
                  </h4>
                  <br />
                </div>
              ) : (filteredData.length > 2 &&
                  Math.floor(
                    filteredSchool.total_student / filteredData.length
                  ) >= 30) ||
                filteredData.length <= 2 ||
                Math.floor(
                  filteredSchool.total_student / filteredData.length
                ) <= 30 ? (
                <div>
                  <h4 className="m-0 text-success text-center">
                    Student Teacher Ratio is{" "}
                    {Math.floor(
                      filteredSchool.total_student / filteredData.length
                    )}
                    , Normal
                  </h4>
                  <br />
                </div>
              ) : (
                <div>
                  <h4 className="m-0 text-danger text-center">
                    Student Teacher Ratio is{" "}
                    {Math.floor(
                      filteredSchool.total_student / filteredData.length
                    )}
                    , Excess Teacher
                  </h4>
                  <br />
                </div>
              )}
            </div>
            <div className="my-2">
              {state === "admin" ? (
                <>
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => {
                      setInputField(filteredSchool);
                    }}
                  >
                    Update Student Data
                  </button>
                  <br />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      navigate("/techsalary");
                      setStateArray(filteredData);
                    }}
                  >
                    All Teacher's Salary Data
                  </button>
                  <div className="mx-auto my-3 noprint">
                    <button
                      type="button"
                      className="btn btn-primary p-2 rounded"
                      onClick={() => {
                        navigate(`/TeacherPhotoCorner`);
                        setStateArray(filteredData);
                      }}
                    >
                      Teacher's Photo Corner
                    </button>
                  </div>
                  <div className="mx-auto my-3 noprint">
                    <button
                      type="button"
                      className="btn btn-info p-2 rounded"
                      onClick={() => {
                        navigate(`/TechersAccuitance`);
                        setStateArray(filteredData);
                      }}
                    >
                      Teacher's Accuitance
                    </button>
                  </div>

                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <form id="up_q_modal">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="staticBackdropLabel"
                            >
                              UPDATE {inputField.school} DATA:
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="row d-flex justify-content-center">
                              <div className="mb-3 col-lg-6">
                                <label className="form-label">
                                  School Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="school"
                                  value={inputField.school || ""}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="mb-3 col-lg-6">
                                <h3 className="text-info text-center">
                                  Total Teacher: {filteredData.length}
                                </h3>
                              </div>
                              <div className="mb-3 col-lg-6">
                                <label className="form-label">PP Student</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="pp"
                                  value={inputField.pp || ""}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="mb-3 col-lg-6">
                                <label className="form-label">
                                  Class I Student
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="i"
                                  value={inputField.i || ""}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="mb-3 col-lg-6">
                                <label className="form-label">
                                  Class II Student
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="ii"
                                  value={inputField.ii || ""}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="mb-3 col-lg-6">
                                <label className="form-label">
                                  Class III Student
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="iii"
                                  value={inputField.iii || ""}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="mb-3 col-lg-6">
                                <label className="form-label">
                                  Class IV Student
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="iv"
                                  value={inputField.iv || ""}
                                  onChange={handleChange}
                                />
                              </div>
                              {filteredSchool.v > 0 && (
                                <div className="mb-3 col-lg-6">
                                  <label className="form-label">
                                    Class V Student
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="v"
                                    value={inputField.v || ""}
                                    onChange={handleChange}
                                  />
                                </div>
                              )}
                              <div className="mb-3 col-lg-6">
                                <label className="form-label">
                                  Total Student
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="total_student"
                                  value={inputField.total_student || 0}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                setInputField(filteredSchool);
                              }}
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={update}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}

        <div className="row mx-auto my-3 rounded justify-content-evenly">
          {filteredData.map((el) => {
            return (
              <div className="col-md-3 m-2 p-2 rounded bg-light" key={el.id}>
                <h6 className="text-center text-primary">
                  Teacher Name: {el.tname}
                </h6>
                <h6 className="text-center text-primary">
                  Designation: {el.desig}
                </h6>
                <div className="d-flex flex-row justify-content-center text-center align-items-center">
                  <h6 className="text-center text-primary">
                    Association: &nbsp;
                  </h6>
                  <h6
                    className={`text-center ${
                      el.association === "WBTPTA"
                        ? "text-success"
                        : el.association === "WBPTA"
                        ? "text-primary"
                        : el.association === "BJP"
                        ? "text-warning"
                        : "text-danger"
                    } `}
                  >
                    {el.association}
                  </h6>
                </div>
                {state === "admin" ? (
                  <h6>
                    <a
                      href={`tel: +91${el.phone}`}
                      className="d-inline-block mb-1  p-0 text-decoration-none"
                    >
                      Phone: {el.phone}
                    </a>
                  </h6>
                ) : el.gender === "male" ? (
                  <h6>
                    <a
                      href={`tel: +91${el.phone}`}
                      className="d-inline-block mb-1  p-0 text-decoration-none"
                    >
                      Phone: {el.phone}
                    </a>
                  </h6>
                ) : null}

                {state === "admin" ? (
                  <>
                    <h6 className="text-primary">DOB: {el.dob}</h6>
                    <h6 className="text-primary">DOJ: {el.doj}</h6>
                    <h6 className="text-primary">
                      DOJ in This School: {el.dojnow}
                    </h6>
                    <h6 className="text-primary">DOR: {el.dor}</h6>
                    <h6 className="text-primary">Training: {el.training}</h6>
                    <h6 className="text-primary">Address: {el.address}</h6>
                  </>
                ) : null}
                {el.hoi === "Yes" ? (
                  <h6 className="text-success">Head of The Institute</h6>
                ) : null}
                {state === "admin" && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm mx-2"
                      onClick={() => {
                        navigate("/EditTeacher");
                        setStateObject(el);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        navigate("/ViewDetails");
                        setStateObject(el);
                      }}
                    >
                      View
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
};

export default SchoolTeacherData;
