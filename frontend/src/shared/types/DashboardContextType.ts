import type { Dispatch, SetStateAction } from "react";
import type { Board } from "./Board";

export type DashboardContextType =  {
  boards: Board[];
  setBoards: Dispatch<SetStateAction<Board[]>>;
}