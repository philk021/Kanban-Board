import { useEffect, useState } from "react";
import type { BoardInfo } from "../../../../shared/types/BoardInfo";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../../../error/pages/PageNotFound";
import { fetchBoards } from "../../../../core/http";
import { Board } from "../../components/Board/Board";
import { SettingsPage } from "../../../settings/pages/SettingsPage/SettingsPage";
import { NewBoard } from "../../components/NewBoard/NewBoard";
import { Boards } from "../../components/Boards/Boards";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import DashboardContext from "../../../../shared/context/DashboardContext";
import "./DashboardPage.css";

export function DashboardPage() {
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
            <Route path="/" element={ <Boards /> }/>
            <Route path=":boardId" element={ <Board /> }/>
            <Route path='new' element={ <NewBoard /> }/>
            <Route path='settings' element={ <SettingsPage /> }/>
            <Route path='*' element={ <PageNotFound/> }/>
          </Routes>
        </div>
      </div>
    </DashboardContext>
  );
}