import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./styles/boardsnav.css";

function BoardsNav({title} : {title: string}) {
    const {userEmail} = useContext(AuthContext);

    return (
        <>
            <div className="dashboard-heading">
                <div><h1>{title}</h1></div>
                <div>{userEmail}</div>
            </div>
            <div className="divider"></div>
        </>
    )
}

export default BoardsNav;