import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import "./styles/sidemenu.css";
import { FaGear, FaFolder, FaRightFromBracket } from "react-icons/fa6";

function SideMenu() {
    const {logout} = useContext(AuthContext);

    return (
        <div className="side-menu">
            <div className="side-menu-sub">
                <Link className="board-link" to="/boards"><h1>App Name</h1></Link>
                <Link className="board-link" to="/boards/new"><button className="new-board-btn">+ New Board</button></Link>
                <Link className="board-link" to="/boards"><FaFolder/>Boards</Link>
                <Link className="board-link" to="/settings"><FaGear/>Settings</Link>
                <button className="logout-btn" onClick={logout}><div>Logout</div><FaRightFromBracket/></button>
            </div>
        </div>
    )
}

export default SideMenu;