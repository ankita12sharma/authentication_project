//import "./Header.css";
// import "./HeaderTwo.css";

// import React, { useState, useRef, useEffect } from "react";

// function Header({ user, onLogout }) {
//   let inputRef = useState(0);
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);
//   return (
//     <header className="header">
//       <div>
//         <input ref={inputRef} type="text"></input>
//       </div>
//       <div className="header-right">
//         <span className="header-user">Welcome, {user}</span>
//         <button className="logout-btn" onClick={onLogout}>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Header;

// import "./HeaderTwo.css";
// import React, { useState, useRef, useEffect } from "react";

// function Header({ user, onLogout, toggleSidebar }) {
//   let inputRef = useRef(0);
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);
//   return (
//     <header className="header">
//       <div className="header-left">
//         <div className="hamburger" onClick={toggleSidebar}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <h3 className="header-title">Dashboard</h3>
//       </div>

//       <div className="header-right">
//         <span className="header-user">Welcome, {user}</span>
//         <input ref={inputRef} type="text"></input>

//         <button className="logout-btn" onClick={onLogout}>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Header;

import "./HeaderTwo.css";
import React, { useRef, useEffect } from "react";

function Header({ user, onLogout, toggleSidebar, sidebarOpen }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <header className="header">
      {/* LEFT SECTION */}
      <div className="header-left">
        <div
          className={`hamburger ${sidebarOpen ? "active" : ""}`}
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="header-input"
      />

      {/* RIGHT SECTION */}
      <div className="header-right">
        <span className="header-user">Welcome, {user}</span>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
