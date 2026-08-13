import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles/newboard.css";

function NewBoard() {

    const [title, setTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e: any) {
        e.preventDefault();
        const board = {
            boardTitle: title
        }
        
        try {
            const response = await fetch(import.meta.env.VITE_API_URL_BOARDS_NEW, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(board)
            });
            const data = await response.json();
           
            if (response.status == 201) {
                navigate('/boards');
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
                onChange={(e)=>setTitle(e.target.value)}/>
            <button className="new-board-create-btn">Create</button>
        </form>
    )
}

export default NewBoard;