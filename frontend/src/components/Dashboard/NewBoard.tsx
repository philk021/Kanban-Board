import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/newboard.css";
import DashboardContext from "../../context/DashboardContext";
import { addBoard } from "../../core/http";

function NewBoard() {
  const {setBoards} = useContext(DashboardContext);
  const [title, setTitle] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
        
    try {
      const response = await addBoard(title);
      const data = await response.data;
           
      if (response.status == 201) {
        setBoards(data);
        navigate("/boards");
      } else {
        setResponseMessage(data.message);
      }
    } catch (err: any) {
      console.log(err);
      setResponseMessage(err);
    }
  }

  return (
    <form className="new-board-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>New Board</h3>
      <input 
        className="form-input" 
        type="text"
        required
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}/>
      <button className="new-board-create-btn">Create</button>
    </form>
  );
}

export default NewBoard;