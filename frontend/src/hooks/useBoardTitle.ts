import { useContext, useEffect, useState } from "react";
import DashboardContext from "../context/DashboardContext";

export default function useBoardTitle(id: string | undefined) {
  const { boards } = useContext(DashboardContext);
  const [boardTitle, setBoardTitle] = useState("");  
  
  useEffect(() => {
    if (!id) setBoardTitle("Untitled");
    const title = boards.find((item) => item.board_id == id)?.board_title;
    
    if (title) {
      setBoardTitle(title);
    } else {
      setBoardTitle("Untitled");
    }
  });
  return boardTitle;
};