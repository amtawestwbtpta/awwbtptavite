import React from "react";

const StudentCount = ({
  info,
  divClassNames = "col-md-3 m-1",
  hClassNames = "text-primary text center",
}) => {
  // Filter all keys that start with "student_"
  const studentEntries = Object.entries(info)
    .filter(
      ([key]) => key.startsWith("student_") && !key.includes("student_prev2")
    )
    .map(([key, value]) => ({
      year: key.split("_")[1], // Extract the year part
      count: value,
    }))
    .sort((a, b) => a.year - b.year); // Sort by year ascending

  return studentEntries.length > 0 ? (
    studentEntries.map(({ year, count }) => (
      <div className={divClassNames} key={year}>
        <h6 className={hClassNames}>
          Total Student {year} : {count}
        </h6>
      </div>
    ))
  ) : (
    <div className={divClassNames}>
      <h6 className={hClassNames}>No student data available</h6>
    </div>
  );
};

export default StudentCount;
