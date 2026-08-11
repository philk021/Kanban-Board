import SideMenu from "./SideMenu";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import type { BoardInfo } from "../../types/BoardInfo";
import { Route, Routes } from "react-router-dom";
import Boards from "./Boards";
import Board from "./Board";
import PageNotFound from "../Shared/PageNotFound";
import NewBoard from "./NewBoard";
import "./styles/dashboard.css";
import BoardsNav from "./BoardsNav";

function Dashboard() {
    const [boards, setBoards] = useState<BoardInfo[]>([]);
    const {token} = useContext(AuthContext);

    useEffect(()=>{
      getBoards();
    }, []);

    async function getBoards() {
      try {
            const response = await fetch(import.meta.env.VITE_API_URL_BOARDS, {
              "headers": {
                "Authorization": `Bearer ${token}`
              }
            });
            const data = await response.json();
            
            if (response.status == 200) {
                setBoards(data);
            } else {
                console.log(data);
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <div className="dashboard-container">
          <SideMenu />
          <div className="dashboard">
            <Routes>
              <Route path="/" element={ <Boards boards={boards}/> }/>
              {
                boards && boards.map((item) => 
                  <Route key={item.board_id} path={"" + item.board_id}
                    element={ 
                      <>
                        <BoardsNav title={item.board_title} />
                        <Board id={item.board_id} />
                      </> 
                    } 
                  />)
              }
              <Route path='new' element={ <NewBoard/> }/>
              <Route path='*' element={ <PageNotFound/> }/>
            </Routes>
          </div>
        </div>
    )
}

export default Dashboard;