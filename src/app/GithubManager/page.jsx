import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import Loader from "../../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import { decryptData } from "../../modules/encryption";
import { myAPIKey, githubUsername } from "../../modules/constants";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/Store";
import { v4 as uuid } from "uuid";
import PDFViewer from "../../components/PDFViewer";
export default function GithubManager() {
  const { state } = useGlobalContext();
  const navigate = useNavigate();
  const docId = uuid().split("-")[0];
  const [repoName, setRepoName] = useState("uploads");
  const token = decryptData(myAPIKey);
  const [action, setAction] = useState(""); // upload, edit, delete
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileChanged, setFileChanged] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [fileType, setFileType] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const uploadRef = useRef();
  const editRef = useRef();
  const deleteRef = useRef();
  const [fileUrlList, setFileUrlList] = useState([]);
  const repoArray = [
    "uploads",
    "files",
    "galaryImages",
    "memoFiles",
    "noticeImages",
    "slides",
    "databases",
    "others",
    "images",
    "otherimages",
    "profileImage",
  ];
  // Upload / Edit
  const handleUploadOrEdit = async () => {
    setLoading(true);
    try {
      let content = "";
      if (uploadFile) {
        // File upload
        const buf = await uploadFile.arrayBuffer();
        content = Buffer.from(buf).toString("base64");
      } else if (fileContent) {
        // Edited content from editor → encode to base64
        content = Buffer.from(fileContent, "utf-8").toString("base64");
      } else {
        throw new Error("No file or editor content provided");
      }
      const path =
        action === "upload"
          ? `${docId}-${uploadFile.name}`
          : !fileChanged
          ? selectedFile
          : `${docId}-${uploadFile.name}`;
      const url = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${path}`;
      let sha = null;
      try {
        const check = await fetch(url, {
          headers: { Authorization: `token ${token}` },
        });
        if (check.ok) {
          const data = await check.json();
          sha = data.sha;
        }
      } catch (error) {
        console.log(error);
      }

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: sha
            ? "Edit file via Next.js app"
            : "Upload file via Next.js app",
          branch: "main",
          content: true ? content : Buffer.from(content).toString("base64"),
          sha: sha || undefined,
        }),
      });

      const data = await res.json();
      const { html_url } = data.content; // Download url of the uploaded file

      if (!res.ok) throw new Error("Failed to upload/edit file");
      toast.success("✅ File uploaded/edited successfully!");
      if (fileChanged)
        toast.success("Previous File Replaced & Deleted Successfully");
      // Reset inputs
      if (editRef.current) editRef.current.value = "";
      if (uploadRef.current) uploadRef.current.value = "";
      if (deleteRef.current) deleteRef.current.value = "";
      setSelectedFile("");
      setFileContent("");
      setUploadFile(null);
      setAction("");
      setFileChanged(false);
    } catch (err) {
      toast.error("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    setLoading(true);
    try {
      const path = selectedFile;
      const url = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${path}`;
      let data = { sha: null };
      try {
        const check = await fetch(url, {
          headers: { Authorization: `token ${token}` },
        });
        if (!check.ok) {
          toast.error("❌File not found");
          return;
        }
        data = await check.json();
      } catch (error) {
        console.log(error);
      }

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Delete file via Next.js app",
          branch: "main",
          sha: data.sha,
        }),
      });

      if (!res.ok) toast.error("Failed to delete file");
      toast.success("🗑️ File deleted successfully!");
      setFiles(files.filter((f) => f.path !== selectedFile));
      if (editRef.current) editRef.current.value = "";
      if (uploadRef.current) uploadRef.current.value = "";
      if (deleteRef.current) deleteRef.current.value = "";
      setSelectedFile("");
      setFileContent("");
      setUploadFile(null);
      setAction("");
    } catch (err) {
      toast.error("❌ " + err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  function getFileType(filename) {
    if (!filename) return setFileType("");
    const extension = filename
      .toString()
      .toLowerCase()
      .substring(filename.lastIndexOf(".") + 1);
    switch (extension) {
      case "js":
      case "jsx":
        return setFileType("javascript");

      case "ts":
      case "tsx":
        return setFileType("typescript");

      case "css":
        return setFileType("css");

      case "scss":
        return setFileType("scss");

      case "json":
        return setFileType("json");

      case "html":
        return setFileType("html");

      case "py":
        return setFileType("python");

      case "ipynb":
        return setFileType("markdown");
      case "java":
        return setFileType("java");
      case "pdf":
        return setFileType("pdf");
      case "txt":
      case "md":
      case "csv":
        return setFileType("plaintext");
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "tiff":
      case "webp":
      case "svg":
      case "ico":
      case "heic":
      case "heif":
        return setFileType("image");

      default:
        return setFileType(""); // or return '' for empty string
    }
  }
  // Load file list
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.github.com/repos/${githubUsername}/${repoName}/contents?ref=main`,
          {
            headers: { Authorization: `token ${token}` },
          }
        );
        if (!res.ok) {
          toast.error("❌ Failed to load files");
          setLoading(false);
          return;
        }
        const data = await res.json();
        let arr = [];
        const mapFiles = data.map((file) => {
          arr = [
            ...arr,
            { github_url: file.download_url, photoName: file.name },
          ];
        });
        await Promise.all(mapFiles)
          .then(() => {
            setFileUrlList(arr);
          })
          .catch((err) => {
            console.log(err);
          });

        setFiles(data);
        setLoading(false);
      } catch (error) {
        toast.error("❌ Failed to load files");
        setLoading(false);
        console.log(error);
      }
    };

    fetchContent();
  }, [repoName, action]);

  // Fetch content of selected file
  useEffect(() => {
    const fetchContent = async () => {
      if (selectedFile) {
        setLoading(true);
        try {
          const res = await fetch(
            `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${selectedFile}?ref=${"main"}`
          );
          if (!res.ok) throw new Error("Failed to fetch file content");
          const data = await res.json();
          setFileUrl(data.download_url);
          // Decode Base64
          const decoded = atob(data.content.replace(/\n/g, ""));
          setFileContent(decoded);
        } catch (err) {
          toast.error("❌ " + err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setFileContent("");
      }
    };
    fetchContent();
  }, [selectedFile]);
  useEffect(() => {
    //eslint-disable-next-line
  }, [fileType]);
  useEffect(() => {
    //eslint-disable-next-line
  }, [fileUrlList]);
  useEffect(() => {
    if (state !== "admin") {
      navigate("/");
    }
  }, []);
  return (
    <div className="container py-5 bg-white text-dark">
      <h2 className="mb-4">📂 GitHub File Manager</h2>
      {/* Repo Selector */}
      <div className="my-3">
        <select
          className="form-select mb-3 col-md-6"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          ref={deleteRef}
        >
          {repoArray.map((repoName, index) => (
            <option key={index} value={repoName}>
              {repoName?.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      {/* Action Selector */}

      <div className="d-flex gap-3 justify-content-center align-items-center my-3">
        <button
          className="btn btn-dark"
          onClick={() => {
            setAction("upload");
            setSelectedFile("");
            setFileContent("");
            setUploadFile(null);
            setFileChanged(false);
            if (editRef.current) editRef.current.value = "";
            if (uploadRef.current) uploadRef.current.value = "";
            if (deleteRef.current) deleteRef.current.value = "";
          }}
        >
          Upload
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setAction("edit");
            setSelectedFile("");
            setFileContent("");
            setUploadFile(null);
            setFileChanged(false);
            if (editRef.current) editRef.current.value = "";
            if (uploadRef.current) uploadRef.current.value = "";
            if (deleteRef.current) deleteRef.current.value = "";
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            setAction("delete");
            setSelectedFile("");
            setFileContent("");
            setUploadFile(null);
            setFileChanged(false);
            if (editRef.current) editRef.current.value = "";
            if (uploadRef.current) uploadRef.current.value = "";
            if (deleteRef.current) deleteRef.current.value = "";
          }}
        >
          Delete
        </button>
      </div>
      {action && <h5 className="my-2 text-primary">{action.toUpperCase()}</h5>}
      {/* Upload */}
      {action === "upload" && (
        <div className="mt-4">
          <input
            type="file"
            className="form-control mb-3 col-md-6"
            onChange={(e) => setUploadFile(e.target.files[0])}
            ref={uploadRef}
          />
          <button
            className="btn btn-dark"
            onClick={handleUploadOrEdit}
            disabled={loading || !uploadFile}
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      )}

      {/* Edit */}
      {action === "edit" && (
        <div className="mt-4">
          <select
            className="form-select mb-3 col-md-6"
            value={selectedFile}
            onChange={(e) => {
              setSelectedFile(e.target.value);
              getFileType(e.target.value);
              setFileContent("");
              setUploadFile(null);
              setFileChanged(false);
            }}
            ref={editRef}
          >
            <option value="">Select a file</option>
            {files.map((f, i) => (
              <option key={i} value={f.path}>
                {f.path}
              </option>
            ))}
          </select>

          {selectedFile && (
            <>
              {fileType ? (
                fileType === "javascript" ||
                fileType === "css" ||
                fileType === "scss" ||
                fileType === "json" ||
                fileType === "html" ||
                fileType === "python" ||
                fileType === "markdown" ||
                fileType === "java" ||
                fileType === "css" ||
                fileType === "txt" ||
                fileType === "md" ||
                fileType === "csv" ||
                fileType === "plaintext" ? (
                  <div>
                    <Editor
                      height="400px"
                      defaultLanguage={fileType}
                      value={fileContent}
                      onChange={(val) => {
                        setFileContent(val || "");
                        setUploadFile(null);
                      }}
                      theme="vs-dark"
                      className="bordered rounded-2"
                    />
                    <input
                      type="file"
                      className="form-control my-3 col-md-6"
                      onChange={(e) => {
                        setUploadFile(e.target.files[0]);
                        setFileChanged(true);
                      }}
                    />
                  </div>
                ) : fileType === "pdf" ? (
                  <div>
                    <PDFViewer pdfUrl={fileUrl} />
                    <input
                      type="file"
                      className="form-control my-3 col-md-6"
                      onChange={(e) => {
                        setUploadFile(e.target.files[0]);
                        setFileChanged(true);
                      }}
                    />
                  </div>
                ) : fileType === "image" ? (
                  <div>
                    <img
                      src={fileUrl}
                      style={{
                        width: "400px",
                        height: "400px",
                        objectFit: "contain",
                      }}
                      alt="fileImage"
                      className="bordered rounded-2"
                    />
                    <input
                      type="file"
                      className="form-control my-3 col-md-6"
                      onChange={(e) => {
                        setUploadFile(e.target.files[0]);
                        setFileChanged(true);
                      }}
                    />
                  </div>
                ) : (
                  <input
                    type="file"
                    className="form-control mb-3 col-md-6"
                    onChange={(e) => {
                      setUploadFile(e.target.files[0]);
                      setFileChanged(true);
                    }}
                  />
                )
              ) : (
                <input
                  type="file"
                  className="form-control mb-3 col-md-6"
                  onChange={(e) => {
                    setUploadFile(e.target.files[0]);
                    setFileChanged(true);
                  }}
                />
              )}

              <button
                className="btn btn-dark mt-3"
                onClick={handleUploadOrEdit}
                disabled={loading || !fileContent || !uploadFile}
              >
                {loading ? "Uploading..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      )}

      {/* Delete */}
      {action === "delete" && (
        <div className="mt-4">
          <select
            className="form-select mb-3 col-md-6"
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            ref={deleteRef}
          >
            <option value="">Select a file</option>
            {files.map((f, i) => (
              <option key={i} value={f.path}>
                {f.path}
              </option>
            ))}
          </select>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading || !selectedFile}
          >
            {loading ? "Deleting..." : "Delete File"}
          </button>
        </div>
      )}
      {loading && <Loader />}
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
    </div>
  );
}
