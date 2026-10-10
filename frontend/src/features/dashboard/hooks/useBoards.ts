import { useEffect, useState } from "react";
import type { Board } from "../../../shared/types/Board";
import { getBoards } from "../api/dashboardApi";

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);

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