import { Route, Routes } from "react-router-dom";
import PageNotFound from "../../../error/pages/PageNotFound";
import { SettingsPage } from "../../../settings/pages/SettingsPage/SettingsPage";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import DashboardContext from "../../../../shared/context/DashboardContext";
import { useBoards } from "../../hooks/useBoards";
import { BoardsPage } from "../BoardsPage/BoardsPage";
import { BoardPage } from "../BoardPage/BoardPage";
import { NewBoardPage } from "../NewBoardPage/NewBoardPage";
import "./DashboardPage.css";

export function DashboardPage() {
  const { boards, setBoards } = useBoards();

  return (
    <DashboardContext value={{boards, setBoards}}>
      <div className="dashboard-container">
        <SideMenu />
        <div className="dashboard">
          <Routes>
            <Route path="/" element={ <BoardsPage /> }/>
            <Route path=":boardId" element={ <BoardPage /> }/>
            <Route path='new' element={ <NewBoardPage /> }/>
            <Route path='settings' element={ <SettingsPage /> }/>
            <Route path='*' element={ <PageNotFound/> }/>
          </Routes>
        </div>
      </div>
    </DashboardContext>
  );
}