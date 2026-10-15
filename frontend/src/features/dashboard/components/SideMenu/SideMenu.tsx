import { Link } from "react-router-dom";
import AuthContext from "../../../../shared/context/AuthContext";
import { useContext, useState } from "react";
import { FaGear, FaFolder, FaRightFromBracket, FaPlus, FaBars } from "react-icons/fa6";
import "./SideMenu.css";

export function SideMenu() {
  const [expanded, setExpanded] = useState(true);
  const { logout } = useContext(AuthContext);

  return (
    <div className={`side-menu-wrap ${expanded ? "side-menu--open" : "side-menu--closed"}`}>
      <div className="side-menu">
        <div className="side-menu-logo">
          <button
            onClick={() => setExpanded(prev => !prev)}
          >
            <FaBars />
          </button>
          {expanded && <h1>Kanban Board</h1>}
        </div>
        <div className="side-menu-link-wrap">
          <Link className="side-menu-link" to="/boards/new">
            <FaPlus className="side-menu-link-icon"/>
            {expanded && <div>New board</div>}
          </Link>
          <Link className="side-menu-link" to="/boards">
           <FaFolder className="side-menu-link-icon"/>
           {expanded && <span>Boards</span>}
          </Link>
          <Link className="side-menu-link" to="/boards/settings">
            <FaGear className="side-menu-link-icon"/>
            {expanded && <span>Settings</span>}
          </Link>
        </div>
        <div className="side-menu-logout-wrap">
          <button 
            className={`logout-btn ${expanded ? "logout-btn--open" : "logout-btn--closed"}`} 
            onClick={logout}
          >
            {expanded && <span>Logout</span>}
            <FaRightFromBracket className="side-menu-link-icon"/>
          </button>
        </div>
      </div>
    </div>
  );
}