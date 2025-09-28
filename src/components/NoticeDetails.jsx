import React, { useEffect, useState } from "react";
import { DateValueToSring } from "../modules/calculatefunctions";
import PDFViewer from "./PDFViewer";
const NoticeDetails = ({ sata }) => {
  const [isLink, setIsLink] = useState(false);
  const [textArr, setTextArr] = useState([]);

  useEffect(() => {
    const txt = sata.noticeText;
    if (txt?.includes("https")) {
      setIsLink(true);
      const firstIndex = txt?.indexOf("https"); //find link start
      const linkEnd = txt?.indexOf(" ", firstIndex); //find the end of link
      const firstTextSection = txt?.slice(0, firstIndex);
      const linkSection = txt?.slice(firstIndex, linkEnd);
      const secondSection = txt?.slice(linkEnd);
      setTextArr([firstTextSection, linkSection, secondSection]);
    } else {
      setIsLink(false);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container my-3">
      <h3
        className={`text-success fs-3 ${
          !/^[a-zA-Z]+$/.test(sata.title.split(" ")[0]) ? "ben" : "timesFont"
        }`}
      >
        {sata.title}
      </h3>
      {sata.url !== "" ? (
        sata.type.split("/")[0] === "image" ? (
          <img
            src={
              sata.url !== ""
                ? sata.url
                : "https://raw.githubusercontent.com/awwbtpta/data/main/notice.png"
            }
            className="rounded-2 w-100 my-3"
            style={{ cursor: "pointer" }}
            alt="..."
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
        ) : sata.type.split("/")[0] === "application" ? (
          <PDFViewer pdfUrl={sata.url} />
        ) : null
      ) : null}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={
                  sata.url !== ""
                    ? sata.url
                    : "https://raw.githubusercontent.com/awwbtpta/data/main/notice.png"
                }
                className="rounded-2 w-100 my-3"
                alt="..."
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3
        className={`text-success fs-3 ${
          !/^[a-zA-Z]+$/.test(sata.title.split(" ")[0]) ? "ben" : "timesFont"
        }`}
      >
        {sata.title}
      </h3>
      <h5 className="text-info timesFont">
        Published At: {DateValueToSring(sata.date)}
      </h5>
      <h5 className="text-dark timesFont">By: {sata.addedBy}</h5>
      {isLink ? (
        <div>
          <h5
            className={`text-primary fs-5 ${
              !/^[a-zA-Z]+$/.test(sata.noticeText.split(" ")[0])
                ? "ben"
                : "timesFont"
            }`}
          >
            {textArr[0]}
          </h5>
          <br />
          <h5 className="text-primary fs-5 timesFont">{textArr[1]}</h5>
          <a
            href={textArr[1]}
            target="_blank"
            rel="noreferrer"
            className="text-decoration-underline text-primary fs-5 timesFont"
          >
            Click Here
          </a>
          <h5
            className={`text-primary fs-5 ${
              !/^[a-zA-Z]+$/.test(sata.noticeText.split(" ")[0])
                ? "ben"
                : "timesFont"
            }`}
          >
            {textArr[2]}
          </h5>
        </div>
      ) : (
        <h5
          className={`text-primary fs-5 ${
            !/^[a-zA-Z]+$/.test(sata.noticeText.split(" ")[0])
              ? "ben"
              : "timesFont"
          }`}
        >
          {sata.noticeText}
        </h5>
      )}
    </div>
  );
};

export default NoticeDetails;
