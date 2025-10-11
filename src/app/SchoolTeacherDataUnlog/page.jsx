import React, { useEffect, useState } from "react";
import StudentCount from "../../components/StudentCount";

const SchoolTeacherDataUnlog = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [schoolData, setschoolData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSchool, setFilteredSchool] = useState({
    pp: 0,
    i: 0,
    ii: 0,
    iii: 0,
    iv: 0,
    v: 0,
    id: "",
    school: "",
    gp: "",
    year: 2025,
    udise: "",
    student_2023: 0,
    student_2024: 0,
    student_2025: 0,
  });
  const [total_student, setTotal_student] = useState(0);
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:School Wise Teacher Data";

    // eslint-disable-next-line
  }, []);
  const userData = async () => {
    fetch(
      "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/allteachers.json"
    )
      .then((res) => res.json())
      .then((data) => setTeacherData(data));
    fetch(
      "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/schools.json"
    )
      .then((res) => res.json())
      .then((data) => setschoolData(data));
  };
  const handleChange = (e) => {
    const selectedSchool = schoolData.filter((el) =>
      el.udise.match(e.target.value)
    )[0];
    setFilteredData(teacherData.filter((el) => el.udise.match(e.target.value)));

    setFilteredSchool(selectedSchool);
    const totalStudents =
      parseInt(selectedSchool.pp) +
      parseInt(selectedSchool.i) +
      parseInt(selectedSchool.ii) +
      parseInt(selectedSchool.iii) +
      parseInt(selectedSchool.iv) +
      parseInt(selectedSchool.v);
    setTotal_student(totalStudents);
  };
  useEffect(() => {
    userData();
  }, []);
  useEffect(() => {
    //eslint-disable-next-line
  }, [total_student]);

  return (
    <div className="container my-5">
      <div className="col-md-6 mx-auto mb-3">
        <select
          className="form-select"
          defaultValue={""}
          onChange={handleChange}
          aria-label="Default select example"
        >
          <option value="">Select School Name</option>
          {schoolData.length > 0
            ? schoolData.map((el, ind) => {
                return (
                  <option key={ind} value={el.udise}>
                    {el.school}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {filteredSchool.school ? (
        <div className="container my-3 mx-auto">
          <div className="row my-3">
            <div className="col-md-6">
              <h4 className="text-primary text-center">
                SCHOOL NAME: {filteredSchool.school}
              </h4>
            </div>
            <div className="col-md-6">
              <h4 className="text-primary text-center">
                GP NAME: {filteredSchool.gp}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 m-1">
              <h6 className="text-primary text-center">
                UDISE: {filteredSchool.udise}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text-center">
                Total Teacher: {filteredData.length}
              </h6>
            </div>
            <StudentCount
              info={filteredSchool}
              divClassNames={"col-md-3 m-1"}
              hClassNames={"text-primary text-center"}
            />
          </div>
          <div className="row my-2">
            <div className="col-md-3 m-1">
              <h6 className="text-primary text-center">
                No. of Pre Primary Students: {filteredSchool.pp}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text-center">
                No. of Class I Students: {filteredSchool.i}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text-center">
                No. of Class II Students: {filteredSchool.ii}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text-center">
                No. of Class III Students: {filteredSchool.iii}
              </h6>
            </div>
            <div className="col-md-3 m-1">
              <h6 className="text-primary text-center">
                No. of Class IV Students: {filteredSchool.iv}
              </h6>
            </div>
            {filteredSchool.v > 0 ? (
              <div className="col-md-3 m-1">
                <h6 className="text-primary text-center">
                  No. of Class V Students: {filteredSchool.v}
                </h6>
              </div>
            ) : null}
          </div>
          <div className="my-2">
            {(filteredData.length > 2 &&
              total_student >= 100 &&
              Math.floor(total_student / filteredData.length) >= 40) ||
            (filteredData.length > 2 &&
              total_student < 100 &&
              Math.floor(total_student / filteredData.length) > 35) ||
            (filteredData.length <= 2 &&
              Math.floor(total_student / filteredData.length) > 35) ? (
              <div>
                <h4 className="m-0 text-danger text-center">
                  Student Teacher Ratio is{" "}
                  {Math.floor(total_student / filteredData.length)}, Less
                  Teacher
                </h4>
                <br />
              </div>
            ) : (filteredData.length > 2 &&
                Math.floor(total_student / filteredData.length) >= 30) ||
              filteredData.length <= 2 ||
              Math.floor(total_student / filteredData.length) <= 30 ? (
              <div>
                <h4 className="m-0 text-success text-center">
                  Student Teacher Ratio is{" "}
                  {Math.floor(total_student / filteredData.length)}, Normal
                </h4>
                <br />
              </div>
            ) : (
              <div>
                <h4 className="m-0 text-danger text-center">
                  Student Teacher Ratio is{" "}
                  {Math.floor(total_student / filteredData.length)}, Excess
                  Teacher
                </h4>
                <br />
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div className="row mx-auto my-3 rounded justify-content-evenly">
        {filteredData.map((el, ind) => {
          return (
            <div className="col-md-3 m-2 p-2 rounded bg-light" key={ind}>
              <h6 className="text-center text-primary">
                Teacher Name: {el.tname}
              </h6>
              <h6 className="text-center text-primary">
                Designation: {el.desig}
              </h6>
              {el.hoi === "Yes" ? (
                <h6 className="text-success">Head of The Institute</h6>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchoolTeacherDataUnlog;
