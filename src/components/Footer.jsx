// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoogleDriveDownload from "./GoogleDriveDownload";
import { AndroidAppLink } from "../modules/constants";
// import { firestore } from "../context/FirebaseContext";
// import { collection, getDocs, query } from "firebase/firestore";
// import Loader from "./Loader";
// import Image from "next/image";
const Footer = () => {
  // const [showLoader, setShowLoader] = useState(false);
  // const [contacts, setContacts] = useState([]);
  // const storeContacts = async () => {
  //   setShowLoader(true);
  //   let data = [];
  //   const q = query(collection(firestore, "contacts"));
  //   const querySnapshot = await getDocs(q);
  //   data = querySnapshot.docs.map((doc) => ({
  //     // doc.data() is never undefined for query doc snapshots
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   const newData = data.sort((a, b) => {
  //     // First, compare the "school" keys
  //     if (a.name < b.name) {
  //       return -1;
  //     }
  //     if (a.name > b.name) {
  //       return 1;
  //     }
  //   });
  //   setContacts(newData);
  //   setShowLoader(false);
  // };
  // useEffect(() => {
  //   storeContacts();
  // }, []);
  return (
    <div className="noprint" style={{ bottom: 0, position: "-webkit-sticky" }}>
      <div className="container-fluid bg-white mt-2 p-1">
        <div
          className="container-fluid bg-dark my-2"
          style={{ height: "2px", opacity: 0.5 }}
        ></div>
        <div className="row align-items-end justify-content-between p-1">
          <div className="col-lg-6">
            <h5 className="container text-left">Reach Us:</h5>
            <h6 className="h-font fw-bold fs-6">
              Amta West Circle, West Bengal Trinamool Primary Teachers'
              Association
            </h6>
            <h6 className="h-font fw-bold fs-6">Howrah Gramin District</h6>
            <h6 className="h-font fw-bold fs-6">Sikshak Bhawan</h6>
            <h6 className="h-font fw-bold fs-6">Joypur, Howrah- 711401</h6>
          </div>

          {/* <div className="col-lg-6 d-flex flex-column jutify-content-center align-items-center">
            <h5 className="container text-left">Call Us:</h5>
            <div>
              {contacts.map((el) => (
                <div
                  key={el.id}
                  className="d-flex flex-column align-items-start justify-content-center"
                >
                  <Link
                    to={`tel: +91${el.mobile}`}
                    className="d-inline-block text-decoration-none text-dark"
                  >
                    <img
                      src={el.url}
                      alt="logo"
                      width={30}
                      height={30}
                      style={{ borderRadius: "50%",width: "30px", height: "30px", objectFit: "cover", objectPosition: "center"}}
                      className="rounded-circle"
                    />
                    &nbsp;&nbsp;
                    <i className="bi bi-telephone-fill"></i>+ 91 {el.mobile},{" "}
                    {el.name}, {el.designation}
                  </Link>
                  <br />
                </div>
              ))}
            </div>
          </div> */}
          <div className="col-lg-6 d-flex flex-column jutify-content-center align-items-center">
            <h5 className="container text-left">Call Us:</h5>
            <Link
              to="tel: +918101823972"
              className="d-inline-block mb-2 text-decoration-none text-dark"
            >
              <i className="bi bi-telephone-fill"></i>+ 91 81018 23972, Debasish
              Mazumder, President
            </Link>
            <br />

            <Link
              to="tel: +919933691466"
              className="d-inline-block mb-2 text-decoration-none text-dark"
            >
              <i className="bi bi-telephone-fill"></i>+ 91 99336 91466, Partha
              Nandi, District Vice President
            </Link>
            <br />

            <Link
              to="tel: +919933684468"
              className="d-inline-block mb-2 text-decoration-none text-dark"
            >
              <i className="bi bi-telephone-fill"></i>+ 91 99336 84468, Sk
              Maidul Islam, Website Developer
            </Link>
            <br />
          </div>
        </div>
      </div>

      <div className="container m-auto pt-2 text-primary">
        <h5 className="container text-center">Important Links:</h5>
        <Link
          className="d-inline-block m-2 text-decoration-none text-primary"
          to="https://banglarshiksha.wb.gov.in/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-browser-chrome"></i> Banglarsiksha Portal
        </Link>
        <Link
          className="d-inline-block m-2 text-decoration-none text-primary"
          to="https://school.banglarshiksha.gov.in/sms/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-browser-chrome"></i> SMS Portal
        </Link>
        <Link
          className="d-inline-block m-2 text-decoration-none text-primary"
          to="https://www.wbbpe.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-browser-chrome"></i> WBBPE
        </Link>
        <Link
          className="d-inline-block m-2 text-decoration-none text-primary"
          to="https://wbbse.wb.gov.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-browser-chrome"></i> WBBSE
        </Link>
        <Link
          className="d-inline-block m-2 text-decoration-none text-primary"
          to="https://www.wb.gov.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-browser-chrome"></i> West Bengal State Portal
        </Link>
        <Link
          className="d-inline-block m-2 text-decoration-none text-primary"
          to="https://www.facebook.com/amtawestwbtpta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-facebook"></i> Follow Us On Facebook
        </Link>
        <Link
          className="d-inline-block m-2 text-decoration-none text-primary"
          to="mailto: westamta@gmail.com"
        >
          <i className="bi bi-envelope-at-fill"></i> Email Us
        </Link>
        <Link
          className="d-inline-block m-2 text-decoration-none text-primary"
          to="https://wbresults.nic.in"
        >
          <i className="bi bi-browser-chrome"></i> WB Results
        </Link>

        <div className="d-inline-block m-2 text-decoration-none text-primary">
          <i className="bi bi-android2"></i>{" "}
          <GoogleDriveDownload fileId={AndroidAppLink} text="Our Android App" />
        </div>
      </div>
      {/* {showLoader && <Loader />} */}
      <h6 className="text-center bg-dark text-white p-2 mb-0 h-font">
        © Copyright WBTPTA AMTA WEST CIRCLE COMMITTEE- 2022. This Site is
        Designed and Maintained By WBTPTA AMTA WEST CIRCLE.
      </h6>
    </div>
  );
};

export default Footer;
