import type { Dispatch, SetStateAction } from "react";
import type { BoardInfo } from "./BoardInfo";

export type DashboardContextType =  {
  boards: BoardInfo[];
  setBoards: Dispatch<SetStateAction<BoardInfo[]>>;
}