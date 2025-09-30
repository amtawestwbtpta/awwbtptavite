import React, { useEffect, useState } from "react";
import GoogleDriveDownload from "./GoogleDriveDownload";
import { AndroidAppLink } from "../modules/constants";

export default function AppLink() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 10000); // 10000 ms = 10 seconds

      // Cleanup the timeout if the component unmounts or visibility changes
      return () => clearTimeout(timer);
    }
  }, [visible]);
  return (
    visible && (
      <div
        className="alert alert-success alert-dismissible fade show noprint"
        role="alert"
      >
        <strong>To download Our Android App</strong>{" "}
        <GoogleDriveDownload fileId={AndroidAppLink} />
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => {
            setVisible(false);
            clearTimeout();
          }}
        ></button>
      </div>
    )
  );
}
