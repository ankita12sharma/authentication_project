import React from "react";
import { FaCartArrowDown, FaUser, FaElementor } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";
import "../components/SideBar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <ul>
        <div className="mylist-five">
          <Link to="employees">
            <FaUser />
            Employees
          </Link>
        </div>
      </ul>
    </div>
  );
}

export default SideBar;
