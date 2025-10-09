import React, { useEffect, useState, useMemo, useRef } from "react";

const StudentInput = ({
  info = {},
  onInfoChange, // callback to pass updated info object to parent
  divClassNames = "m-1",
  hClassNames = "text-primary text-center",
}) => {
  // Local controlled copy of the info object so inputs stay controlled
  const [localInfo, setLocalInfo] = useState(() => ({ ...info }));

  // Capture which keys were numeric on first render and keep them stable.
  // If we let the parent receive empty strings for numeric keys, the parent
  // could change the types and cause the input to flip to text. Storing the
  // initial numeric keys in a ref prevents that.
  const numericKeysRef = useRef(
    Object.keys(info).filter((k) => typeof info[k] === "number")
  );
  const numericKeys = numericKeysRef.current;

  // Sync local state when parent provides new info
  useEffect(() => {
    setLocalInfo({ ...info });
  }, [info]);

  // Generic change handler for inputs
  const handleChange = (key, rawValue) => {
    const isNumKey = numericKeys.includes(key);
    let newVal = rawValue;

    if (isNumKey) {
      // Allow empty string while typing so the user can clear and re-type.
      if (rawValue === "") {
        newVal = "";
      } else {
        const parsed = Number(rawValue);
        // If parsing fails, keep rawValue (browser number inputs normally prevent this),
        // otherwise store the parsed number.
        newVal = Number.isNaN(parsed) ? rawValue : parsed;
      }
    }

    const updated = { ...localInfo, [key]: newVal };
    setLocalInfo(updated);

    // Prepare the object we send to the parent. For numeric keys, when the
    // field is cleared, send null (not empty string) so the parent's type for
    // that key doesn't become a string and cause future renders to change the
    // input type.
    const updatedForParent = { ...updated };
    if (isNumKey && newVal === "") {
      updatedForParent[key] = null;
    }

    if (typeof onInfoChange === "function") onInfoChange(updatedForParent);
  };

  const entries = Object.entries(localInfo || {});

  if (entries.length === 0) {
    return (
      <div className={divClassNames}>
        <h6 className={hClassNames}>No student data available</h6>
      </div>
    );
  }

  return (
    <>
      {entries
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => {
          // Keep input type=number for keys that were numeric in the original info
          const isNumber = numericKeys.includes(key);
          const id = `input-${key}`;
          // For nicer label text, replace underscores with spaces
          const labelText = key.replace(/_/g, " ").toUpperCase();

          return (
            key !== "id" && (
              <div className={divClassNames} key={key}>
                <label
                  htmlFor={id}
                  className={hClassNames}
                  style={{ display: "block" }}
                >
                  {labelText}
                </label>
                <input
                  id={id}
                  name={key}
                  type={isNumber ? "number" : "text"}
                  className="form-control"
                  value={value === undefined || value === null ? "" : value}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            )
          );
        })}
    </>
  );
};

export default StudentInput;
