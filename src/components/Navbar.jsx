import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-200">
      <div className="mycontainer flex items-center justify-between px-6 py-0 h-12 text-sky-900">
        <div className="logo font-bold px-16 text-3xl">
          <span className="text-blue-700">&lt;</span>
          PASS
          <span className="text-blue-700">
            <span className="text-green-600">bot</span>/&gt;
          </span>
        </div>
        {/* <ul>
          <li className="gap-4 flex py-2">
            <a className="hover:font-bold" href="#">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              New
            </a>
          </li>
        </ul> */}
        <div className="text-sky-900 flex items-center px-32">
          <img
            className="invert w-8 h-8 transition-transform transform hover:scale-125 hover:drop-shadow-lg"
            src="github.png"
            alt="GitHub logo"
          /><span className="ml-2">GitHub</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
