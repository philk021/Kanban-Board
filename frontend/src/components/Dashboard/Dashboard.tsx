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
import DashboardContext from "../../context/DashboardContext";

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
      <DashboardContext value={{boards, setBoards}}>
        <div className="dashboard-container">
          <SideMenu />
          <div className="dashboard">
            <Routes>
              <Route path="/" element={ <Boards/> }/>
                <Route path=":boardId"
                  element={ 
                    <>
                      <BoardsNav title={"title"} />
                      <Board />
                    </> 
                  }
                />
              <Route path='new' element={ <NewBoard/> }/>
              <Route path='*' element={ <PageNotFound/> }/>
            </Routes>
          </div>
        </div>
      </DashboardContext>
    )
}

export default Dashboard;