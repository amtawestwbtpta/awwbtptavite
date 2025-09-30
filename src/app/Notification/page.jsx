import React, { useEffect, useRef, useState } from "react";
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
import Loader from "../../components/Loader";
import { v4 as uuid } from "uuid";
import { decryptObjData, getCookie } from "../../modules/encryption";

import {
  createDownloadLink,
  DateValueToSring,
  isFileEmpty,
} from "../../modules/calculatefunctions";
import NoticeDetails from "../../components/NoticeDetails";
import { useGlobalContext } from "../../context/Store";
import {
  deleteFileFromGithub,
  uploadFileToGithub,
} from "../../modules/gitFileHndler";
const Notification = () => {
  const { noticeState, noticeUpdateTime, setNoticeState, setNoticeUpdateTime } =
    useGlobalContext();
  let teacherdetails = {
    convenor: "",
    gp: "",
    school: "",
    circle: "",
    tname: "",
    udise: "",
  };

  let details = getCookie("tid");
  if (details) {
    teacherdetails = decryptObjData("tid");
  }

  const [allData, setAllData] = useState([]);
  const [loader, setLoader] = useState(false);
  const fileRef = useRef();
  const [file, setFile] = useState({});
  const [showPercent, setShowPercent] = useState(false);
  const [title, setTitle] = useState("");
  const [addImage, setAddImage] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState({
    id: "",
    date: "",
    addedBy: "",
    title: "",
    noticeText: "",
    url: "",
    githubUrl: "",
    photoName: "",
    type: "",
  });
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [showEditNotice, setShowEditNotice] = useState(false);
  const [showNoticeDetails, setShowNoticeDetails] = useState(false);
  const [noticeText, setNoticeText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editNoticeText, setEditNoticeText] = useState("");
  const [orgTitle, setOrgTitle] = useState("");
  const [orgNoticeText, setOrgNoticeText] = useState("");
  const [editID, setEditID] = useState("");
  const [src, setSrc] = useState(null);
  const docId = uuid().split("-")[0];
  const [progress, setProgress] = useState(0);
  const [editFileName, setEditFileName] = useState("");
  const [editFile, setEditFile] = useState({});
  const [editAddImage, setEditAddImage] = useState(false);
  const editFileRef = useRef();
  const addNotice = async () => {
    setLoader(true);
    if (addImage) {
      const uploadableFileName = docId + "-" + file.name;
      const githubUrl = await uploadFileToGithub(
        file,
        uploadableFileName,
        "noticeImages"
      );
      const filestorageRef = ref(
        storage,
        `/noticeImages/${uploadableFileName}`
      );
      const uploadTask = uploadBytesResumable(filestorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setShowPercent(true);
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // // update progress
          setProgress(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (photourl) => {
            // console.log(url);

            try {
              await setDoc(doc(firestore, "notices", docId), {
                id: docId,
                date: Date.now(),
                addedBy: teacherdetails.tname,
                title: title,
                noticeText: noticeText,
                url: photourl,
                githubUrl,
                photoName: uploadableFileName,
                type: file.type,
              })
                .then(async () => {
                  setNoticeState(
                    [
                      ...noticeState,
                      {
                        date: Date.now(),
                        addedBy: teacherdetails.tname,
                        title: title,
                        noticeText: noticeText,
                        url: photourl,
                        githubUrl,
                        photoName: uploadableFileName,
                        type: file.type,
                      },
                    ].sort((a, b) => b.date - a.date)
                  );
                  setNoticeUpdateTime(Date.now());
                  setAllData(
                    [
                      ...noticeState,
                      {
                        date: Date.now(),
                        addedBy: teacherdetails.tname,
                        title: title,
                        noticeText: noticeText,
                        url: photourl,
                        githubUrl,
                        photoName: uploadableFileName,
                        type: file.type,
                      },
                    ].sort((a, b) => b.date - a.date)
                  );

                  setNoticeText("");
                  setTitle("");
                  setLoader(false);
                  setAddImage(false);
                  toast.success("Notice Added Successfully!");
                  if (fileRef.current) {
                    fileRef.current.value = "";
                  }
                  setFile({});
                  setSrc(null);
                  setShowPercent(false);
                  setProgress(0);
                })
                .catch((e) => {
                  setLoader(false);
                  setAddImage(false);
                  toast.error("Notice Addition Failed!");
                  console.log(e);
                });
            } catch (e) {
              toast.error("File Upload Failed!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setLoader(false);
            }
          });
        }
      );
    } else {
      try {
        await setDoc(doc(firestore, "notices", docId), {
          id: docId,
          date: Date.now(),
          addedBy: teacherdetails.tname,
          title: title,
          noticeText: noticeText,
          url: "",
          githubUrl: "",
          photoName: "",
          type: "",
        })
          .then(async () => {
            setNoticeState([
              ...noticeState,
              {
                id: docId,
                date: Date.now(),
                addedBy: teacherdetails.tname,
                title: title,
                noticeText: noticeText,
                url: "",
                githubUrl: "",
                photoName: "",
                type: "",
              },
            ]);
            setNoticeUpdateTime(Date.now());
            setAllData([
              ...noticeState,
              {
                id: docId,
                date: Date.now(),
                addedBy: teacherdetails.tname,
                title: title,
                noticeText: noticeText,
                url: "",
                githubUrl: "",
                photoName: "",
                type: "",
              },
            ]);

            setNoticeText("");
            setTitle("");
            setLoader(false);
            setAddImage(false);
            toast.success("Notice Added Successfully!");
            if (fileRef.current) {
              fileRef.current.value = "";
            }
            setFile({});
            setSrc("");
          })
          .catch((e) => {
            setLoader(false);
            setAddImage(false);
            toast.error("Notice Addition Failed!");
            console.log(e);
          });
      } catch (e) {
        toast.error("File Upload Failed!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoader(false);
      }
    }
  };

  const updateNotice = async () => {
    setLoader(true);

    if (isFileEmpty(editFile)) {
      await updateDoc(doc(firestore, "notices", editID), {
        title: editTitle,
        noticeText: editNoticeText,
        date: Date.now(),
        addedBy: teacherdetails.tname,
      })
        .then(async () => {
          let x = noticeState.filter((el) => el.id === editID)[0];
          let y = noticeState.filter((el) => el.id !== editID);
          y = [
            ...y,
            {
              id: editID,
              date: Date.now(),
              addedBy: teacherdetails.tname,
              title: editTitle,
              noticeText: editNoticeText,
              url: x.url,
              photoName: x.photoName,
              type: x.type,
            },
          ];
          let newData = y.sort((a, b) => b.date - a.date);
          setNoticeState(newData);
          setAllData(newData);
          setNoticeUpdateTime(Date.now());
          setLoader(false);
          setEditTitle("");
          setEditNoticeText("");
          setOrgNoticeText("");
          setOrgTitle("");
          toast.success("Details Updated Successfully");
          // getData();
        })
        .catch((err) => {
          toast.error("Notice Updation Failed!");
          console.log(err);
        });
    } else {
      try {
        const isDelFromGithub = await deleteFileFromGithub(
          editFileName,
          "noticeImages"
        );
        if (isDelFromGithub) {
          toast.success("File deleted successfully From Github!");
        } else {
          toast.error("Error Deleting File From Github!");
        }
        const desertRef = ref(storage, `noticeImages/${editFileName}`);
        await deleteObject(desertRef);
      } catch (e) {
        console.log(e);
      }
      const editUploadableFileName = docId + "-" + editFile.name;
      const githubUrl = await uploadFileToGithub(
        editFile,
        editUploadableFileName,
        "noticeImages"
      );
      const filestorageRef = ref(
        storage,
        `/noticeImages/${editUploadableFileName}`
      );
      const uploadTask = uploadBytesResumable(filestorageRef, editFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setShowPercent(true);
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // // update progress
          setProgress(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (photourl) => {
            await updateDoc(doc(firestore, "notices", editID), {
              title: editTitle,
              noticeText: editNoticeText,
              date: Date.now(),
              addedBy: teacherdetails.tname,
              url: photourl,
              githubUrl,
              type: editFile.type,
              photoName: editUploadableFileName,
            })
              .then(async () => {
                let y = noticeState.filter((el) => el.id !== editID);
                y = [
                  ...y,
                  {
                    id: editID,
                    date: Date.now(),
                    addedBy: teacherdetails.tname,
                    title: editTitle,
                    noticeText: editNoticeText,
                    url: photourl,
                    githubUrl,
                    type: editFile.type,
                    photoName: editUploadableFileName,
                  },
                ];
                let newData = y.sort((a, b) => b.date - a.date);
                setNoticeState(newData);
                setAllData(newData);
                setNoticeUpdateTime(Date.now());
                setLoader(false);
                setEditTitle("");
                setEditNoticeText("");
                setOrgNoticeText("");
                setOrgTitle("");
                setEditFile({});
                setEditFileName("");
                setSrc(null);
                setShowPercent(false);
                setProgress(0);
                toast.success("Details Updated Successfully");
                // getData();
              })
              .catch((err) => {
                toast.error("Notice Updation Failed!");
                console.log(err);
              });
          });
        }
      );
    }
  };

  const deleteNotice = async (el) => {
    await deleteDoc(doc(firestore, "notices", el.id))
      .then(async () => {
        try {
          const isDelFromGithub = await deleteFileFromGithub(
            el.photoName,
            "noticeImages"
          );

          if (isDelFromGithub) {
            toast.success("File deleted successfully From Github!");
          } else {
            toast.error("Error Deleting File From Github!");
          }

          const desertRef = ref(storage, `noticeImages/${el.photoName}`);
          await deleteObject(desertRef);
        } catch (e) {
          console.log(e);
        }
        try {
          const desertRef = ref(storage, `noticeImages/${el.photoName}`);
          await deleteObject(desertRef);
        } catch (error) {
          console.log(error);
        }
        setLoader(false);
        toast.success("Notice Deleted Successfully!");
        // getData();
        setNoticeState(allData.filter((item) => item.id !== el.id));
        setAllData(allData.filter((item) => item.id !== el.id));
        setNoticeUpdateTime(Date.now());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getData = async () => {
    setLoader(true);
    const querySnapshot = await getDocs(
      query(collection(firestore, "notices"))
    );
    const datas = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.date - a.date);
    setLoader(false);
    setAllData(datas);
    setNoticeState(datas);
    setNoticeUpdateTime(Date.now());
  };
  const getNoticeData = () => {
    setLoader(true);
    const difference = (Date.now() - noticeUpdateTime) / 1000 / 60 / 15;
    if (noticeState.length === 0 || difference >= 1) {
      getData();
    } else {
      let newData = noticeState.sort((a, b) => b.date - a.date);
      setLoader(false);
      setAllData(newData);
    }
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Notifications";
    getNoticeData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {}, [file, allData]);
  return (
    <div className="container my-3">
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
      <h3 className="text-primary text-center">Notifications</h3>

      {!showNoticeDetails ? (
        <div className="container row mx-auto justify-content-center">
          {teacherdetails.circle === "admin" && (
            <div className="my-3 mx-auto">
              <button
                type="button"
                className="btn btn-sm btn-info"
                onClick={() => {
                  setShowAddNotice(true);
                }}
              >
                Add Notice
              </button>
              <button
                type="button"
                className="btn btn-sm m-3 btn-warning"
                onClick={() => {
                  createDownloadLink(noticeState, "notices");
                }}
              >
                Download Notice Data
              </button>
            </div>
          )}
          {allData.map((el, index) => {
            return (
              <div
                className="row mx-auto justify-content-center align-items-center col-md-3 "
                key={index}
              >
                <div className="card m-2 p-1" style={{ width: "18rem" }}>
                  {el.githubUrl !== "" && el.type.split("/")[0] === "image" ? (
                    <img
                      src={
                        el.githubUrl !== ""
                          ? el.githubUrl
                          : "https://raw.githubusercontent.com/awwbtpta/data/main/notice.png"
                      }
                      style={{ height: 200, cursor: "pointer" }}
                      className="card-img-top rounded-2"
                      alt="..."
                      onClick={() => {
                        setSelectedNotice(el);
                        setShowNoticeDetails(true);
                      }}
                    />
                  ) : (
                    <img
                      src={
                        "https://raw.githubusercontent.com/awwbtpta/data/main/pdf.png"
                      }
                      style={{ height: 200, cursor: "pointer" }}
                      className="card-img-top rounded-2 m-0 p-0"
                      alt="..."
                      onClick={() => {
                        setSelectedNotice(el);
                        setShowNoticeDetails(true);
                      }}
                    />
                  )}

                  <div
                    className={`card-body ${
                      !/^[a-zA-Z]+$/.test(el.noticeText.split(" ")[0])
                        ? "ben"
                        : "timesFont"
                    }`}
                  >
                    <h5
                      className={`card-title ${
                        !/^[a-zA-Z]+$/.test(el.noticeText.split(" ")[0])
                          ? "ben"
                          : "timesFont"
                      }`}
                      onClick={() => {
                        setSelectedNotice(el);
                        setShowNoticeDetails(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {el.title}
                    </h5>

                    <p className="card-text text-info timesFont">
                      {DateValueToSring(el.date)}
                    </p>
                    <p
                      className={`card-title ${
                        !/^[a-zA-Z]+$/.test(el.noticeText.split(" ")[0])
                          ? "ben"
                          : "timesFont"
                      } text-primary`}
                      onClick={() => {
                        setSelectedNotice(el);
                        setShowNoticeDetails(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {el.noticeText.slice(0, 30)} ... See More
                    </p>
                  </div>
                  {teacherdetails.circle === "admin" && (
                    <div className="my-2">
                      <button
                        type="button"
                        className="btn btn-sm m-1 btn-warning"
                        onClick={() => {
                          setEditID(el.id);
                          setEditTitle(el.title);
                          setEditNoticeText(el.noticeText);
                          setOrgTitle(el.title);
                          setOrgNoticeText(el.noticeText);
                          setEditFileName(el.photoName);
                          setShowEditNotice(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm m-1 btn-danger"
                        onClick={() => {
                          // eslint-disable-next-line
                          let conf = confirm(
                            "Are you sure you want to Delete this notice?"
                          );
                          if (conf) {
                            deleteNotice(el);
                          } else {
                            toast.success("Notice Not Deleted!!!");
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="my-5">
          <button
            type="button"
            className="btn btn-sm my-5 btn-danger"
            onClick={() => {
              setShowNoticeDetails(false);
            }}
          >
            Close Notice
          </button>
          <NoticeDetails sata={selectedNotice} />
          <button
            type="button"
            className="btn btn-sm my-5 btn-danger"
            onClick={() => {
              setShowNoticeDetails(false);
            }}
          >
            Close Notice
          </button>
        </div>
      )}

      {showAddNotice && (
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
                <h1 className="modal-title fs-5" id="addNoticeLabel">
                  Add Notice
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setNoticeText("");
                    setTitle("");
                    setLoader(false);
                    setAddImage(false);
                    setFile({});
                    setSrc(null);
                    setShowPercent(false);
                    setProgress(0);
                    if (fileRef.current) {
                      fileRef.current.value = "";
                    }
                    setShowAddNotice(false);
                  }}
                ></button>
              </div>
              <div className="modal-body modal-xl">
                <input
                  type="text"
                  className="form-control mb-3 w-75 mx-auto"
                  value={title}
                  placeholder="Add Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="form-control mb-3  mx-auto"
                  rows={5}
                  placeholder="Notice Body"
                  value={noticeText}
                  onChange={(e) => setNoticeText(e.target.value)}
                />

                <div className="d-flex row mx-auto mb-3 justify-content-center align-items-center form-check form-switch">
                  <h4 className="col-md-3 text-primary">Without Image/File</h4>
                  <input
                    className="form-check-input mb-3 col-md-3"
                    type="checkbox"
                    id="checkbox"
                    role="switch"
                    checked={addImage}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAddImage(e.target.checked);
                      } else {
                        setAddImage(e.target.checked);
                        setFile({});

                        setSrc(null);
                      }
                    }}
                    style={{ width: 60, height: 30 }}
                  />
                  <h4 className="col-md-3 text-success">With Image/File</h4>
                </div>
                {addImage && (
                  <div className="my-2">
                    <input
                      type="file"
                      id="img"
                      ref={fileRef}
                      className="form-control mb-3 w-100 mx-auto"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setSrc(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    {src !== null && file.type.split("/")[0] === "image" ? (
                      <div>
                        <img
                          src={src}
                          alt="uploadedImage"
                          width={150}
                          className="rounded-2"
                        />
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => {
                            setSrc(null);
                            setFile({});
                            fileRef.current.value = "";
                          }}
                        ></button>
                      </div>
                    ) : src !== null &&
                      file.type.split("/")[0] === "application" ? (
                      <img
                        src={
                          "https://raw.githubusercontent.com/awwbtpta/data/main/pdf.png"
                        }
                        alt="uploadedImage"
                        width={150}
                        className="rounded-2"
                      />
                    ) : null}

                    {showPercent && (
                      <div
                        className="progress-bar my-2"
                        style={{
                          width: progress + "%",
                          height: "15px",
                          backgroundColor: "purple",
                          borderRadius: "10px",
                          transformOrigin: "start",
                        }}
                      ></div>
                    )}
                  </div>
                )}
              </div>
              <div className="modal-footer d-flex flex-column">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    if (title !== "" && noticeText !== "") {
                      addNotice();
                      setShowAddNotice(false);
                    } else {
                      toast.error("Please fill all the fields");
                    }
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setNoticeText("");
                    setTitle("");
                    setLoader(false);
                    setAddImage(false);
                    setFile({});
                    setSrc(null);
                    setShowPercent(false);
                    setProgress(0);
                    if (fileRef.current) {
                      fileRef.current.value = "";
                    }
                    setShowAddNotice(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditNotice && (
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
                <h1 className="modal-title fs-5" id="editNoticeLabel">
                  Edit Notice
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setEditTitle("");
                    setEditNoticeText("");
                    setOrgNoticeText("");
                    setOrgTitle("");
                    setEditFile({});
                    if (editFileRef.current) {
                      if (editFileRef.current) {
                        editFileRef.current.value = "";
                      }
                    }
                    setSrc(null);
                    setShowPercent(false);
                    setProgress(0);
                    setEditAddImage(false);
                    setShowEditNotice(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  ref={editFileRef}
                  className="form-control mb-3 w-50 mx-auto"
                  value={editTitle}
                  placeholder="Add Title"
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="form-control mb-3 w-50 mx-auto"
                  rows={5}
                  placeholder="Notice Body"
                  value={editNoticeText}
                  onChange={(e) => setEditNoticeText(e.target.value)}
                />
                <div className="d-flex row mx-auto mb-3 justify-content-center align-items-center form-check form-switch">
                  <h4 className="col-md-3 text-primary">Without Image/File</h4>
                  <input
                    className="form-check-input mb-3 col-md-3"
                    type="checkbox"
                    id="checkbox"
                    role="switch"
                    checked={editAddImage}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEditAddImage(e.target.checked);
                      } else {
                        setEditAddImage(e.target.checked);
                        setEditFile({});
                        if (editFileRef.current) {
                          editFileRef.current.value = "";
                        }
                        setSrc(null);
                      }
                    }}
                    style={{ width: 60, height: 30 }}
                  />
                  <h4 className="col-md-3 text-success">With Image/File</h4>
                </div>
                {editAddImage ? (
                  <div className="my-2">
                    <input
                      type="file"
                      id="img"
                      className="form-control mb-3 w-100 mx-auto"
                      onChange={(e) => {
                        setEditFile(e.target.files[0]);
                        setSrc(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    {src !== null &&
                    editFile.type?.split("/")[0] === "image" ? (
                      <div>
                        <img
                          src={src}
                          alt="uploadedImage"
                          width={150}
                          className="rounded-2"
                        />
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => {
                            setSrc(null);
                            setEditFile({});
                            if (editFileRef.current) {
                              editFileRef.current.value = "";
                            }
                          }}
                        ></button>
                      </div>
                    ) : src !== null &&
                      file.type?.split("/")[0] === "application" ? (
                      <img
                        src={
                          "https://raw.githubusercontent.com/awwbtpta/data/main/pdf.png"
                        }
                        alt="uploadedImage"
                        width={150}
                        className="rounded-2"
                      />
                    ) : null}
                    {showPercent && (
                      <div
                        className="progress-bar my-2"
                        style={{
                          width: progress + "%",
                          height: "15px",
                          backgroundColor: "purple",
                          borderRadius: "10px",
                          transformOrigin: "start",
                        }}
                      ></div>
                    )}
                  </div>
                ) : null}
              </div>
              <div className="modal-footer d-flex flex-column">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    if (editTitle !== "" && editNoticeText !== "") {
                      if (orgTitle !== editTitle) {
                        updateNotice();
                        setShowEditNotice(false);
                      } else if (orgNoticeText !== editNoticeText) {
                        updateNotice();
                        setShowEditNotice(false);
                      } else if (!isFileEmpty(editFile)) {
                        updateNotice();
                        setShowEditNotice(false);
                      } else {
                        toast.error("Nothing to Update!!!");
                      }
                    } else {
                      toast.error("Please fill all the fields");
                    }
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditTitle("");
                    setEditNoticeText("");
                    setOrgNoticeText("");
                    setOrgTitle("");
                    setEditFile({});
                    if (editFileRef.current) {
                      editFileRef.current.value = "";
                    }
                    setSrc(null);
                    setShowPercent(false);
                    setProgress(0);
                    setEditAddImage(false);
                    setShowEditNotice(false);
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
};

export default Notification;
