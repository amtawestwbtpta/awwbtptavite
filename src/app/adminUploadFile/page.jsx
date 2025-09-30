import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../../context/Store";
import { ToastContainer, toast } from "react-toastify";

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../context/FirebaseContext";
import { firestore } from "../../context/FirebaseContext";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  collection,
  updateDoc,
} from "firebase/firestore";

import AdminNavBar from "../../components/AdminNavBar";
import Loader from "../../components/Loader";
import { v4 as uuid } from "uuid";
import { decryptObjData, getCookie } from "../../modules/encryption";
import {
  deleteFileFromGithub,
  uploadFileToGithub,
} from "../../modules/gitFileHndler";
const AdminUploadFile = () => {
  const { state } = useGlobalContext();
  const fileInpRef = useRef();
  const selectionRef = useRef();
  const navigate = useNavigate();
  const [folder, setFolder] = useState("files");
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [editFileName, setEditFileName] = useState("");
  const [editFileId, setEditFileId] = useState("");
  const docId = uuid();
  let details = getCookie("uid");
  let userdetails = {
    circle: "",
    createdAt: "",
    desig: "",
    disabled: "",
    dpsc: "",
    dpsc1: "",
    dpsc2: "",
    dpsc3: "",
    dpsc4: "",
    dpscst: "",
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
    sis: "",
    tan: "",
    teachersID: "",
    tname: "",
    tsname: "",
    udise: "",
    url: "",
    username: "",
  };
  if (details) {
    userdetails = decryptObjData("uid");
  }
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Admin Upload Files";

    if (state !== "admin") {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [folder]);

  const [data, setData] = useState(false);
  const [allData, setAllData] = useState([]);
  const getData = async () => {
    setData(true);
    const q = query(collection(firestore, "downloads"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));

    setAllData(data);
  };

  const uploadFiles = async () => {
    if (file == null) {
      return;
    } else {
      setLoader(true);
      const githubUrl = await uploadFileToGithub(file, file.name, folder);
      const filestorageRef = ref(storage, `/${folder}/${file.name}`);
      const uploadTask = uploadBytesResumable(filestorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const percent = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          console.log(snapshot);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (fburl) => {
            const entry = {
              id: docId,
              date: Date.now(),
              addedBy: userdetails.tname,
              url: fburl,
              githubUrl,
              fileName: fileName,
              originalFileName: file.name,
              fileType: file.type,
            };
            await setDoc(doc(firestore, "downloads", docId), entry);
            toast.success("Congrats! File Uploaded Successfully!");
            setLoader(false);
            const newData = [...allData, entry];
            setAllData(newData);
            setFile(null);
            setFileName("");
            fileInpRef.current.value = "";
            selectionRef.current.value = "files";
            setFolder("files");
          });
        }
      );
    }
  };
  const updateFileName = async () => {
    const docRef = doc(firestore, "downloads", editFileId);
    await updateDoc(docRef, {
      fileName: editFileName,
    });
    toast.success("Congrats! File Name Changed Successfully!");
    setLoader(false);
    getData();
  };
  const deleteFile = async (name, id) => {
    setLoader(true);
    const isDelFromGithub = await deleteFileFromGithub(name, folder);
    if (isDelFromGithub) {
      toast.success("File deleted successfully From Github!");
    } else {
      toast.error("Error Deleting File From Github!");
    }
    const desertRef = ref(storage, `${folder}/${name}`);
    deleteObject(desertRef)
      .then(async () => {
        await deleteDoc(doc(firestore, "downloads", id));
        toast.success("Congrats! File Deleted Successfully!");
        setLoader(false);
        getData();
      })
      .catch((error) => {
        setLoader(false);
        // Uh-oh, an error occurred!
        toast.error("Something Went Wrong!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Admin Upload File";
    if (state !== "admin") {
      localStorage.clear();
      navigate("/logout");
    }
  }, []);
  return (
    <>
      <AdminNavBar />
      <h3 className="text-center text-primary my-3">
        Admin Upload Downloadable Files
      </h3>
      <div className="container my-3">
        <div className="col-md-6 mx-auto">
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

          {loader ? <Loader /> : null}
          <div className="col-md-6 mx-auto mb-3">
            <h5 className="text-center text-primary mb-3">
              Select Folder Location
            </h5>
            <select
              className="form-select"
              ref={selectionRef}
              defaultValue={folder}
              onChange={(e) => {
                setFolder(e.target.value);
              }}
              aria-label="Default select example"
            >
              <option value="">Select Foder Name</option>
              <option value="files">Downloads</option>
              <option value="databases">Databases</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="mb-3">
            <h5 className="text-center text-primary">Upload File</h5>
            <input
              type="file"
              ref={fileInpRef}
              className="form-control"
              placeholder="Upload Document"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <button
              type="button"
              className="btn btn-success m-3"
              onClick={() => {
                if (fileName !== "") {
                  uploadFiles();
                } else {
                  toast.error("Please Enter File Name!", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }}
            >
              Upload File
            </button>
            <button
              type="button"
              className="btn btn-danger m-3"
              onClick={() => {
                setFile(null);
                setFileName("");
                fileInpRef.current.value = "";
                selectionRef.current.value = "files";
                setFolder("files");
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="container-fluid">
          {!data ? (
            <button
              type="button"
              className="btn btn-success mb-3"
              onClick={getData}
            >
              Get Uploaded Files
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success mb-3"
              onClick={() => setData(false)}
            >
              Hide Uploaded Files
            </button>
          )}
          {data ? (
            <div className="container overflow-auto d-flex">
              <table className="table table-responsive table-hover table-striped table-success  px-lg-3 py-lg-2 ">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Format</th>
                    <th>File Name</th>
                    <th>Download</th>
                    <th>Edit File Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((el, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>
                          {el.fileType === "application/pdf"
                            ? "PDF"
                            : el.fileType === "application/msword"
                            ? "WORD"
                            : el.fileType ===
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            ? "WORD"
                            : el.fileType ===
                              "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                            ? "POWERPOINT"
                            : el.fileType === "application/vnd.ms-excel"
                            ? "EXCEL"
                            : el.fileType ===
                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            ? "EXCEL"
                            : el.fileType ===
                              "application/vnd.ms-excel.sheet.macroEnabled.12"
                            ? "EXCEL"
                            : el.fileType === "application/vnd.ms-powerpoint"
                            ? "EXCEL"
                            : el.fileType === "application/zip"
                            ? "ZIP"
                            : el.fileType === "application/vnd.rar"
                            ? "RAR"
                            : el.fileType === "text/csv"
                            ? "CSV"
                            : el.fileType ===
                              "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                            ? "POWERPOINT"
                            : ""}
                        </td>
                        <td>{el.fileName}</td>
                        <td>
                          <a
                            href={el.githubUrl}
                            className="btn btn-success rounded text-decoration-none"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-warning "
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                              setEditFileId(el.id);
                              setEditFileName(el.fileName);
                            }}
                          >
                            Edit File Name
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger "
                            onClick={() =>
                              deleteFile(el.originalFileName, el.id)
                            }
                          >
                            Delete Uploaded Files
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Edit File Name
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setEditFileId("");
                      setEditFileName("");
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="modal-body">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter File Name"
                        value={editFileName}
                        onChange={(e) => setEditFileName(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <button
                        type="button"
                        className="btn btn-success m-3"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          if (editFileName !== "") {
                            updateFileName();
                          } else {
                            toast.error("Please Enter File Name!", {
                              position: "top-right",
                              autoClose: 1500,
                              hideProgressBar: false,
                              closeOnClick: true,

                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          }
                        }}
                      >
                        Update File Name
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger m-3"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          setEditFileId("");
                          setEditFileName("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUploadFile;
