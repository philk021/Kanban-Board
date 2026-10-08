import { useEffect, useState } from "react";
import type { BoardInfo } from "../../../shared/types/BoardInfo";
import { getBoards } from "../api/dashboardApi";

export function useBoards() {
  const [boards, setBoards] = useState<BoardInfo[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await getBoards();
      const data = await response.data;
      if (response.status == 200) {
          setBoards(data);
      }
    }
    fetchBoards();
  }, []);

  return { boards, setBoards };
}