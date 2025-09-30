import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import {
  decryptObjData,
  encryptObjData,
  getCookie,
} from "../modules/encryption";
import { firestore } from "../context/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useGlobalContext } from "../context/Store";
import Loader from "./Loader";
import axios from "axios";
// import T from "./teachers.json";
// import S from "./schools.json";
import { toast } from "react-toastify";
import { baseUrl } from "../modules/constants";
const Navbar = () => {
  const {
    state,
    setState,
    USER,
    setUSER,
    teachersState,
    setTeachersState,
    schoolState,
    setSchoolState,
    teacherUpdateTime,
    setTeacherUpdateTime,
    schoolUpdateTime,
    setSchoolUpdateTime,
    setStateObject,
    setMemoUpdateTime,
    setNoticeUpdateTime,
    setQuestionUpdateTime,
    setSlideUpdateTime,
    setStateArray,
    questionRateState,
    questionRateUpdateTime,
    setQuestionRateState,
    setQuestionRateUpdateTime,
  } = useGlobalContext();
  const navigate = useNavigate();

  let teacherdetails, userdetails, loggedAt;
  let details = getCookie("tid");

  const [showLoader, setShowLoader] = useState(false);
  const [question, setQuestion] = useState("taw");
  const navbarSupportedContent = document.querySelector(
    "#navbarSupportedContent"
  );
  const handleNavCollapse = () => {
    if (navbarSupportedContent) {
      if (
        document
          .querySelector("#navbarSupportedContent")
          .classList.contains("show")
      ) {
        document
          .querySelector("#navbarSupportedContent")
          .classList.remove("show");
      }
    }
  };

  const storeTeachersData = async () => {
    setShowLoader(true);
    let data = [];
    try {
      const q = query(collection(firestore, "teachers"));
      const querySnapshot = await getDocs(q);
      data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
    } catch (error) {
      console.error("Error fetching teachers data: ", error);
      const url = `${baseUrl}/api/getTeachers`;
      const response = await axios.post(url);
      data = response.data.data;
    }

    const newDatas = data.sort((a, b) => {
      // First, compare the "school" keys
      if (a.school < b.school) {
        return -1;
      }
      if (a.school > b.school) {
        return 1;
      }
      // If "school" keys are equal, compare the "rank" keys
      return a.rank - b.rank;
    });
    setShowLoader(false);
    setTeachersState(newDatas);
    setTeacherUpdateTime(Date.now());
  };
  const storeSchoolData = async () => {
    setShowLoader(true);
    let data = [];
    try {
      const q = query(collection(firestore, "schools"));

      const querySnapshot = await getDocs(q);
      data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
    } catch (error) {
      const url = `${baseUrl}/api/getSchools`;
      const response = await axios.post(url);
      data = response.data.data;
    }

    setSchoolState(data);
    setSchoolUpdateTime(Date.now());
    setShowLoader(false);
  };
  let id, tname, school, pan, disability, desig, fname;

  if (details) {
    userdetails = decryptObjData("uid");
    teacherdetails = decryptObjData("tid");
    id = teacherdetails?.id;
    tname = teacherdetails?.tname;
    school = teacherdetails?.school;
    pan = teacherdetails?.pan;
    disability = teacherdetails?.disability;
    desig = teacherdetails?.desig;
    fname = teacherdetails?.fname;
  }

  const checkLogin = async () => {
    if (details) {
      setShowLoader(true);

      let data = {
        circle: "",
        createdAt: "",
        desig: "",
        disabled: "",
        email: "",
        empid: "",
        id: "",
        pan: "",
        password: "",
        phone: "",
        photoName: "",
        question: "",
        school: "",
        showAccount: "",
        teachersID: "",
        tname: "",
        udise: "",
        url: "",
        username: "",
      };
      try {
        const collectionRef = collection(firestore, "userteachers");
        const q = query(
          collectionRef,
          where("username", "==", userdetails?.username)
        );
        const querySnapshot = await getDocs(q);
        data = querySnapshot.docs[0]?.data();
      } catch (error) {
        console.error("Error fetching user data: ", error);
        const url = `${baseUrl}/api/getUser`;
        const response = await axios.post(url, {
          username: userdetails?.username,
        });
        data = response.data.data;
      }
      if (!data?.disabled) {
        setState(data?.circle);
        setUSER(data);
        encryptObjData("uid", data, 10080);
        setQuestion(data?.question);
        setShowLoader(false);
      } else {
        setShowLoader(false);
        toast.error("Your Account is Disabled!");
        navigate("/logout");
      }
    }
  };
  const getAcceptingData = async () => {
    setShowLoader(true);
    let data = [];
    try {
      const q = query(collection(firestore, "question_rate"));
      const querySnapshot = await getDocs(q);
      data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))[0];
    } catch (error) {
      console.error("Error fetching accepting data: ", error);
      const url = `${baseUrl}/api/getQuestionRate`;
      const response = await axios.post(url);
      data = response.data.data;
    }
    setQuestionRateState(data);
    setQuestionRateUpdateTime(Date.now());
    setShowLoader(false);
  };

  useEffect(() => {
    // if (process.env.NODE_ENV !== "development") {
    //   checkLogin();
    // }
    checkLogin();
    const teacherDifference = (Date.now() - teacherUpdateTime) / 1000 / 60 / 15;
    if (teacherDifference >= 1 || teachersState.length === 0) {
      // if (process.env.NODE_ENV === "development") {
      //   setTeachersState(T);
      //   setTeacherUpdateTime(Date.now());
      // } else {
      //   storeTeachersData();
      // }
      storeTeachersData();
    }
    const schDifference = (Date.now() - schoolUpdateTime) / 1000 / 60 / 15;
    if (schDifference >= 1 || schoolState.length === 0) {
      // if (process.env.NODE_ENV === "development") {
      //   setSchoolState(S);
      //   setSchoolUpdateTime(Date.now());
      // } else {
      //   storeSchoolData();
      // }
      storeSchoolData();
    }
    const questionRateDifference =
      (Date.now() - questionRateUpdateTime) / 1000 / 60 / 15;
    if (questionRateDifference >= 1 || questionRateState.length === 0) {
      getAcceptingData();
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [question, state, USER]);

  const RenderMenu = () => {
    if (state === "admin") {
      return (
        <Suspense>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              to="/"
              onClick={handleNavCollapse}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              to="/dashboard"
              onClick={handleNavCollapse}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/FloodRelief"
              onClick={handleNavCollapse}
            >
              Flood Relief
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Notification"
              onClick={handleNavCollapse}
            >
              Notifications
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/MemoSection"
              onClick={handleNavCollapse}
            >
              Memo Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              to="/findteacher"
              onClick={handleNavCollapse}
            >
              Search Teacher
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link
              className="nav-link"
              to="/StudentTeacherRatio"
              onClick={handleNavCollapse}
            >
              Student Teacher Ratio
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/schoolteacherdata"
              onClick={handleNavCollapse}
            >
              School Teacher Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/techsalary"
              onClick={() => {
                handleNavCollapse();
                setStateArray(
                  teachersState.filter(
                    (el) => el.udise === teacherdetails?.udise
                  )
                );
              }}
            >
              All Teacher's Salary Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/TechAccuitance"
              onClick={() => {
                handleNavCollapse();
                setStateArray(
                  teachersState.filter(
                    (el) => el.udise === teacherdetails?.udise
                  )
                );
              }}
            >
              Acquittance Register
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/payslipwbtpta"
              onClick={() => {
                handleNavCollapse();
                setStateObject(teacherdetails);
              }}
            >
              Generate Payslip
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={`/Form16NewPage?data=${JSON.stringify({
                id,
                tname,
                school,
                pan,
                disability,
                desig,
                fname,
              })}`}
            >
              Generate Own Form 16
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/teacherAddress"
              onClick={handleNavCollapse}
            >
              Teacher Address
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/gpwiseschool"
              onClick={handleNavCollapse}
            >
              GP Wise School Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/GPWiseTeacher"
              onClick={handleNavCollapse}
            >
              GP Wise Teacher Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/teacherdatabase"
              onClick={handleNavCollapse}
            >
              All Teacher's Data of AW Circle
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/IncomeTaxReloded"
              onClick={handleNavCollapse}
            >
              IT Reloded
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/YearWiseTeachers"
              onClick={handleNavCollapse}
            >
              Year Wise Teachers
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/TeacherServiceLife"
              onClick={handleNavCollapse}
            >
              Teacher Service Life
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/MonthlyAWSalary"
              onClick={handleNavCollapse}
            >
              AW All Teachers Salary
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Retirement"
              onClick={handleNavCollapse}
            >
              Retirement Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/displaydatabase"
              onClick={handleNavCollapse}
            >
              Display Registered Users Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/questionsec"
              onClick={handleNavCollapse}
            >
              Question Section
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/AddTeacher"
              onClick={handleNavCollapse}
            >
              Add Teacher
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/admindashboard"
              onClick={handleNavCollapse}
            >
              Admin Panel Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/displaycomplain"
              onClick={handleNavCollapse}
            >
              Display Requests
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              to="/UniformComplainsDisplay"
              onClick={handleNavCollapse}
            >
              Display Uniform Complain
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/HolisticPRCardAny"
              onClick={handleNavCollapse}
            >
              HPRCard Any School
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/update_self"
              onClick={handleNavCollapse}
            >
              Update Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/updateunp"
              onClick={handleNavCollapse}
            >
              Update Username And Password
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/downloads"
              onClick={handleNavCollapse}
            >
              Downloads
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/TeacherSelection"
              onClick={handleNavCollapse}
            >
              Teacher Selection
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/FlexibleComp"
              onClick={handleNavCollapse}
            >
              Flexible Component
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/taxcalculator"
              onClick={handleNavCollapse}
            >
              Tax Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Ropa2019"
              onClick={handleNavCollapse}
            >
              ROPA 2019
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              to="/daarrearcalculation"
              onClick={handleNavCollapse}
            >
              DA Arrear Calculation
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/agecalculator"
              onClick={handleNavCollapse}
            >
              Amazing Age Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/RetirementCalculator"
              onClick={handleNavCollapse}
            >
              Date Calculator
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.facebook.com/amtawestwbtpta"
            >
              <i className="bi bi-facebook"></i> Facebook Page
            </a>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/complain"
              onClick={handleNavCollapse}
            >
              Complain or Suggest Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/GithubManager"
              onClick={handleNavCollapse}
            >
              Github Manager
            </Link>
          </li>
          {questionRateState?.isAccepting && (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/QuestionRequisition"
                onClick={handleNavCollapse}
              >
                Question Requisition
              </Link>
            </li>
          )}
          <div className="row">
            <li className="nav-item">
              {/* <img
                src={url?url:"https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png"}
                height={50}
                width={50}
                alt="profile"
                className="navprofileImage"
                onClick={() => {
                  navigate("/ChangePhoto");
                  handleNavCollapse();
                }}
              /> */}

              <img
                src={
                  USER?.url
                    ? USER?.url
                    : "https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png"
                }
                height={50}
                width={50}
                style={{
                  height: 50,
                  width: 50,
                }}
                alt="profile"
                className="navprofileImage"
                onClick={() => {
                  navigate("/ChangePhoto");
                  handleNavCollapse();
                }}
              />
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/logout"
                onClick={handleNavCollapse}
              >
                Logout
              </Link>
            </li>
          </div>
          <li className="nav-item">
            <Link
              to="#"
              className="nav-link"
              onClick={() => {
                handleNavCollapse();
                storeSchoolData();
                storeTeachersData();
                getAcceptingData();
                setTeacherUpdateTime(Date.now() - 1000 * 60 * 15);
                setSchoolUpdateTime(Date.now() - 1000 * 60 * 15);
                setSlideUpdateTime(Date.now() - 1000 * 60 * 15);
                setNoticeUpdateTime(Date.now() - 1000 * 60 * 15);
                setMemoUpdateTime(Date.now() - 1000 * 60 * 15);
                setQuestionUpdateTime(Date.now() - 1000 * 60 * 15);
                setQuestionRateUpdateTime(Date.now() - 1000 * 60 * 15);
              }}
            >
              <i className="bi bi-arrow-clockwise text-success fs-3 cursor-pointer"></i>
            </Link>
          </li>
        </Suspense>
      );
    } else if (state === "taw") {
      return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              to="/"
              onClick={handleNavCollapse}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              to="/dashboard"
              onClick={handleNavCollapse}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Notification"
              onClick={handleNavCollapse}
            >
              Notifications
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/MemoSection"
              onClick={handleNavCollapse}
            >
              Memo Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              to="/findteacher"
              onClick={handleNavCollapse}
            >
              Search Teacher
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              to="/StudentTeacherRatio"
              onClick={handleNavCollapse}
            >
              Student Teacher Ratio
            </Link>
          </li> */}

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/techsalary"
              onClick={() => {
                handleNavCollapse();
                setStateArray(
                  teachersState.filter(
                    (el) => el.udise === teacherdetails?.udise
                  )
                );
              }}
            >
              All Teacher's Salary Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/TechAccuitance"
              onClick={() => {
                handleNavCollapse();
                setStateArray(
                  teachersState.filter(
                    (el) => el.udise === teacherdetails?.udise
                  )
                );
              }}
            >
              Acquittance Register
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/payslipwbtpta"
              onClick={() => {
                handleNavCollapse();
                setStateObject(teacherdetails);
              }}
            >
              Generate Payslip
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Form16Prev"
              onClick={() => {
                handleNavCollapse();
                setStateObject(teacherdetails);
              }}
            >
              Generate Form 16
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/schoolteacherdata"
              onClick={handleNavCollapse}
            >
              School Teacher Data
            </Link>
          </li>

          {question === "admin" ? (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/gpwiseschool"
                  onClick={handleNavCollapse}
                >
                  GP Wise School Data
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/GPWiseTeacher"
                  onClick={handleNavCollapse}
                >
                  GP Wise Teacher Data
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/questionsec"
                  onClick={handleNavCollapse}
                >
                  Question Section
                </Link>
              </li>
            </>
          ) : null}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/IncomeTaxReloded"
              onClick={handleNavCollapse}
            >
              IT Reloded
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/HolisticPRCardAny"
              onClick={handleNavCollapse}
            >
              HPRCard Any School
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/update_self"
              onClick={handleNavCollapse}
            >
              Update Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/updateunp"
              onClick={handleNavCollapse}
            >
              Update Username And Password
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/downloads"
              onClick={handleNavCollapse}
            >
              Downloads
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/taxcalculator"
              onClick={handleNavCollapse}
            >
              Tax Calculator
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              to="/daarrearcalculation"
              onClick={handleNavCollapse}
            >
              DA Arrear Calculation
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Ropa2019"
              onClick={handleNavCollapse}
            >
              ROPA 2019
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/agecalculator"
              onClick={handleNavCollapse}
            >
              Amazing Age Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/RetirementCalculator"
              onClick={handleNavCollapse}
            >
              Date Calculator
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.facebook.com/amtawestwbtpta"
            >
              <i className="bi bi-facebook"></i> Facebook Page
            </a>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/complain"
              onClick={handleNavCollapse}
            >
              Complain or Suggest Us
            </Link>
          </li>
          {questionRateState?.isAccepting && (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/QuestionRequisition"
                onClick={handleNavCollapse}
              >
                Question Requisition
              </Link>
            </li>
          )}
          <div className="row">
            <li className="nav-item">
              <img
                src={
                  USER?.url
                    ? USER?.url
                    : "https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png"
                }
                height={50}
                width={50}
                style={{
                  height: 50,
                  width: 50,
                }}
                alt="profile"
                className="navprofileImage"
                onClick={() => {
                  navigate("/ChangePhoto");
                  handleNavCollapse();
                }}
              />
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/logout"
                onClick={handleNavCollapse}
              >
                Logout
              </Link>
            </li>
          </div>
          <li className="nav-item">
            <Link
              to="#"
              className="nav-link"
              onClick={() => {
                handleNavCollapse();
                storeSchoolData();
                storeTeachersData();
                getAcceptingData();
                setTeacherUpdateTime(Date.now() - 1000 * 60 * 15);
                setSchoolUpdateTime(Date.now() - 1000 * 60 * 15);
                setSlideUpdateTime(Date.now() - 1000 * 60 * 15);
                setNoticeUpdateTime(Date.now() - 1000 * 60 * 15);
                setMemoUpdateTime(Date.now() - 1000 * 60 * 15);
                setQuestionUpdateTime(Date.now() - 1000 * 60 * 15);
                setQuestionRateUpdateTime(Date.now() - 1000 * 60 * 15);
              }}
            >
              <i className="bi bi-arrow-clockwise text-success fs-3 cursor-pointer"></i>
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              to="/"
              onClick={handleNavCollapse}
            >
              Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              to="/FlexibleComp"
              onClick={handleNavCollapse}
            >
              Flexible Component
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Notification"
              onClick={handleNavCollapse}
            >
              Notifications
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/MemoSection"
              onClick={handleNavCollapse}
            >
              Memo Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/SchoolTeacherDataUnlog"
              onClick={handleNavCollapse}
            >
              Student Teacher Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/TeacherDatabaseUnlog"
              onClick={handleNavCollapse}
            >
              Teacher Database
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/downloads"
              onClick={handleNavCollapse}
            >
              Downloads
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/FloodRelief"
              onClick={handleNavCollapse}
            >
              Flood Relief
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              to="/IncomeTaxReloded"
              onClick={handleNavCollapse}
            >
              IT Reloded
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/taxcalculator"
              onClick={handleNavCollapse}
            >
              Tax Calculator
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              to="/daarrearcalculation"
              onClick={handleNavCollapse}
            >
              DA Arrear Calculation
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Ropa2019"
              onClick={handleNavCollapse}
            >
              ROPA 2019
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/agecalculator"
              onClick={handleNavCollapse}
            >
              Amazing Age Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/RetirementCalculator"
              onClick={handleNavCollapse}
            >
              Date Calculator
            </Link>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.facebook.com/amtawestwbtpta"
              onClick={handleNavCollapse}
            >
              <i className="bi bi-facebook"></i> Facebook Page
            </a>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/complain"
              onClick={handleNavCollapse}
            >
              Complain or Suggest Us
            </Link>
          </li>
          {/* {questionRateState?.isAccepting && (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/QuestionRequisition"
                onClick={handleNavCollapse}
              >
                Question Requisition
              </Link>
            </li>
          )} */}
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={handleNavCollapse}>
              Login / Sign Up
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar align-items-end navbar-expand-lg bg-white px-lg-3 py-lg-2 shadow-sm sticky-top p-2 overflow-auto bg-body-tertiary noprint">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/logo.png"
            alt="LOGO"
            width={"70vw"}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <RenderMenu />
          </ul>
        </div>
      </div>
      {showLoader && <Loader />}
    </nav>
  );
};

export default Navbar;
