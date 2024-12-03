import React, { useState } from "react";
import "./NestedList.css";

const NestedList = () => {
  const [selectedPath, setSelectedPath] = useState([]); // Tracks selected path to render sub-levels

  // Nested data structure
  const nestedData = [
    {
      id: 1,
      label: "Parent 1",
      children: [
        {
          id: 2,
          label: "Child 1.1",
          children: [
            { id: 3, label: "Sub-child 1.1.1" },
            { id: 4, label: "Sub-child 1.1.2" },
          ],
        },
        { id: 5, label: "Child 1.2" },
      ],
    },
    {
      id: 6,
      label: "Parent 2",
      children: [
        {
          id: 7,
          label: "Child 2.1",
          children: [
            { id: 8, label: "Sub-child 2.1.1" },
            { id: 9, label: "Sub-child 2.1.2" },
          ],
        },
      ],
    },
  ];

  // Find the current level's items based on the selected path
  const getCurrentLevel = (data, path) => {
    let current = data;
    for (const id of path) {
      current = current.find((item) => item.id === id)?.children || [];
    }
    return current;
  };

  // Handle selection and update the path
  const handleSelect = (id, level) => {
    const newPath = [...selectedPath.slice(0, level), id];
    setSelectedPath(newPath);
  };

  // Handle path bar navigation
  const handlePathClick = (level) => {
    setSelectedPath(selectedPath.slice(0, level));
  };

  return (
    <div className="container">
      {/* Path Bar */}
      <h1> Nisted List With PathBar </h1>
      <div className="path-bar">
        {selectedPath.length === 0 && <span>Root</span>}
        {selectedPath.map((id, index) => {
          const currentLevelItems = getCurrentLevel(nestedData, selectedPath.slice(0, index));
          const currentItem = currentLevelItems.find((item) => item.id === id);
          return (
            <React.Fragment key={id}>
              <span
                className="path-segment"
                onClick={() => handlePathClick(index)}
              >
                {currentItem?.label || "Unknown"}
              </span>
              {index < selectedPath.length - 1 && (
                <span className="path-separator">/</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Nested Lists */}
      <div className="lists-container">
        {[...Array(selectedPath.length + 1)].map((_, level) => {
          const currentLevelItems = getCurrentLevel(nestedData, selectedPath.slice(0, level));

          return (
            <ul key={level} className="list">
              {currentLevelItems.map((item) => (
                <li
                  key={item.id}
                  className={`list-item ${selectedPath[level] === item.id ? "active" : ""}`}
                  onClick={() => handleSelect(item.id, level)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default NestedList;
