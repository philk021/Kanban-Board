import { Link } from "react-router-dom";
import type { BoardInfo } from "../../types/BoardInfo";
import BoardCard from "./BoardCard";
import "./styles/boards.css";
import { useContext } from "react";
import DashboardContext from "../../context/DashboardContext";

function Boards() {
    const {boards} = useContext(DashboardContext);
    
    return (
        <div className="boards-container">
          {boards ? boards.map((item: BoardInfo)=> 
            <Link to={'/boards/' + item.board_id} key={item.board_id}>
              <BoardCard title={item.board_title} />
            </Link>)
          : <p>No Boards</p>}
        </div>
    )
}

export default Boards;