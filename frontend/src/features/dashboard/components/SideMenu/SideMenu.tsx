import { Link } from "react-router-dom";
import AuthContext from "../../../../shared/context/AuthContext";
import { useContext } from "react";
import { FaGear, FaFolder, FaRightFromBracket, FaPlus, FaBars } from "react-icons/fa6";
import "./SideMenu.css";

export function SideMenu() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="side-menu-wrap">
      <div className="side-menu">
        <div className="side-menu-logo">
          <button>
            <FaBars />
          </button>
          <h1>Logo</h1>
        </div>
        <Link className="side-menu-link" to="/boards/new">
          <button className="new-board-btn">
            <FaPlus/>
            <div>New Board</div>
          </button>
        </Link>
        <Link className="side-menu-link" to="/boards"><FaFolder/>Boards</Link>
        <Link className="side-menu-link" to="/boards/settings"><FaGear/>Settings</Link>
        <button className="logout-btn" onClick={logout}>
          <div>Logout</div>
          <FaRightFromBracket/>
        </button>
      </div>
    </div>
  );
}