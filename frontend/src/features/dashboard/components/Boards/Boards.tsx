import { Link } from "react-router-dom";
import type { BoardInfo } from "../../../../shared/types/BoardInfo";
import { useContext } from "react";
import { BoardCard } from "../BoardCard/BoardCard";
import DashboardContext from "../../../../shared/context/DashboardContext";
import "./Boards.css";

export function Boards() {
  const { boards } = useContext(DashboardContext);
    
  return (
    <div className="boards-container">
      {boards ? (
        boards.map((item: BoardInfo)=> 
          <Link to={'/boards/' + item.board_id} key={item.board_id}>
            <BoardCard title={item.board_title} role={item.board_role}/>
          </Link>) 
      ) : (
        <p>No Boards</p>
      )}
    </div>
  );
}