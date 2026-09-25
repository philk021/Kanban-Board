import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import type { BoardInfo } from "../../types/BoardInfo";
import { Route, Routes } from "react-router-dom";
import Boards from "./Boards";
import Board from "./Board";
import PageNotFound from "../Shared/PageNotFound";
import NewBoard from "./NewBoard";
import "./styles/dashboard.css";
import DashboardContext from "../../context/DashboardContext";
import Settings from "./Settings";
import { fetchBoards } from "../../core/http";

function Dashboard() {
  const [boards, setBoards] = useState<BoardInfo[]>([]);

  useEffect(()=>{
    getBoards();
  }, []);

  async function getBoards() {
    try {
      const response = await fetchBoards();
      const data = await response.data;  
      if (response.status == 200) {
        setBoards(data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <DashboardContext value={{boards, setBoards}}>
      <div className="dashboard-container">
        <SideMenu />
        <div className="dashboard">
          <Routes>
            <Route path="/" element={ <Boards/> }/>
            <Route path=":boardId" element={ <Board/> }/>
            <Route path='new' element={ <NewBoard/> }/>
            <Route path='settings' element={ <Settings/> }/>
            <Route path='*' element={ <PageNotFound/> }/>
          </Routes>
        </div>
      </div>
    </DashboardContext>
  );
}

export default Dashboard;