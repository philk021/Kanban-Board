import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./styles/boardsnav.css";
import { useParams } from "react-router-dom";
import useBoardTitle from "../../hooks/useBoardTitle";

function BoardsNav() {
  const {boardId} = useParams();
  const boardTitle = useBoardTitle(boardId);
  const {userEmail} = useContext(AuthContext);

  return (
    <>
      <div className="dashboard-heading">
        <div><h1>{boardTitle}</h1></div>
        <div>{userEmail}</div>
      </div>
      <div className="divider"></div>
    </>
  );
}

export default BoardsNav;