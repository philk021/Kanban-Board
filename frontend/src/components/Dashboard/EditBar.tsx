import { useContext, useRef, useState } from "react";
import "./styles/editbar.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DashboardContext from "../../context/DashboardContext";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function EditBar({title} : {title: string}) {
    const {boardId} = useParams();
    const {token} = useContext(AuthContext);
    const {setBoards} = useContext(DashboardContext);
    const [newColumnTitle, setNewColumnTitle] = useState("");
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const navigate = useNavigate();

    async function editBoard() {
        if (newColumnTitle === title) {
            return
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_BOARDS}/${boardId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });  
            
            const data = await response.json();
            if (response.status == 200) {
                setBoards(data);
                navigate("/boards");
            } else {
                console.log(data.message);
            }

        } catch (err: any) {
            console.log(err);
        }
    }

    async function deleteBoard() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_BOARDS}/${boardId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });  
            
            const data = await response.json();
            if (response.status == 200) {
                setBoards(data);
                navigate("/boards");
            } else {
                console.log(data.message);
            }

        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <div className="edit-bar">
            <dialog ref={dialogRef} className="task-dialog">
                <form className="task-form">
                    <h3>Edit Board</h3>
                    
                    <input className="form-input" 
                        type="text"
                        placeholder={title}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                    />

                    <div className="task-btns">
                        <button type="button" className="delete-board-btn" 
                            onClick={() => deleteBoard()}>
                            Delete
                        </button>
                        <button type="button" className="create-task-btn" 
                            onClick={() => editBoard()}>
                            Save
                        </button>
                        <button type="button" className="close-btn" 
                            onClick={(e) => {
                                e.preventDefault();
                                dialogRef.current?.close()
                            }}>
                            Close
                        </button>
                    </div>
                
                </form>
            </dialog>

            <div className="board-info">
                <FaMagnifyingGlass/>
                <input className="search" type="text" placeholder="Search board"/>
            </div>
            <div className="edit-buttons">
                <button>Filter</button>
                <button>Invite</button>
                <button type="button" onClick={() => dialogRef.current?.showModal()}>Edit</button>
                <button>Export</button>
            </div>
        </div>
    )
}

export default EditBar;