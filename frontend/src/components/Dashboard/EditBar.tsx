import "./styles/editbar.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

function EditBar() {
    return (
        <div className="edit-bar">
            <div className="board-info">
                <FaMagnifyingGlass/>
                <input className="search" type="text" placeholder="Search board"/>
            </div>
            <div className="edit-buttons">
                <button>Invite</button>
                <button>Edit</button>
                <button>Export</button>
            </div>
        </div>
    )
}

export default EditBar;