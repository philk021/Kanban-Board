import { useContext } from "react";
import AuthContext from "../../../../shared/context/AuthContext";
import { useParams } from "react-router-dom";
import "./BoardNav.css"
import DashboardContext from "../../context/DashboardContext";

export function BoardNav() {
  const { boardId } = useParams();
  const { userEmail } = useContext(AuthContext);
  const { boards } = useContext(DashboardContext);
  const boardTitle = boards.find((item) => item.board_id == boardId)?.board_title ?? 'Undefined';

  return (
    <>
      <div className="board-nav-wrap">
        <span className="board-nav-title">{boardTitle}</span>
        <span className="board-nav-email">{userEmail}</span>
      </div>
    </>
  );
}