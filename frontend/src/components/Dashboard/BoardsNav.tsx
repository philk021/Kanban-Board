import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./styles/boardsnav.css";

function BoardsNav() {
    const {userEmail} = useContext(AuthContext);
    
    return (
        <>
            <div className="dashboard-heading" >
                <div>{userEmail}</div>
            </div>
            <div className="divider"></div>
        </>
    )
}

export default BoardsNav;