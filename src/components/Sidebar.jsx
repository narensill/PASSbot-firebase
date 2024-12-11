import React, { useState } from "react";
import RandomPasswordGenerator from "./Pswdgen";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
        style={{ zIndex: 1000 }} // Ensures button stays on top of everything
      >
        <lord-icon
          src="https://cdn.lordicon.com/fgxwhgfp.json"
          trigger="in"
          delay="1000"
          stroke="bold"
          state="in-reveal"
          colors="primary:#121331,secondary:#242424"
        ></lord-icon>
      </button>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "300px", transition: "transform 0.3s ease" }}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-white"
          >
            &times; {/* Close icon */}
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Password Generator
          </h2>
          <RandomPasswordGenerator />
        </div>
      </div>

      {/* Sidebar Overlay (optional) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
