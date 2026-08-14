import { createContext } from "react";
import type { DashboardContextType } from "../types/DashboardContextType";

const DashboardContext = createContext<DashboardContextType>({
    boards: [],
    setBoards: () => {}
});
export default DashboardContext;