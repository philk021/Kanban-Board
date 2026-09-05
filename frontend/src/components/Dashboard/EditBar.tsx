import { useContext, useRef, useState } from "react";
import "./styles/editbar.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DashboardContext from "../../context/DashboardContext";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import useBoardTitle from "../../hooks/useBoardTitle";

function EditBar() {
  const {boardId} = useParams();
  const boardTitle = useBoardTitle(boardId);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const {token} = useContext(AuthContext);
  const {setBoards} = useContext(DashboardContext);
  const editDialogRef = useRef<HTMLDialogElement | null>(null);
  const inviteDialogRef = useRef<HTMLDialogElement | null>(null);
  const navigate = useNavigate();

  async function editBoard() {
    if (!newBoardTitle || newBoardTitle === boardTitle) {
      return;
    }

    const boardUpdate = {
      title: newBoardTitle
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_BOARDS}/${boardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(boardUpdate)
      });
            
      const data = await response.json();
      if (response.status == 200) {
        setBoards(data);
        editDialogRef.current?.close();
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

  async function inviteToBoard() {
    if (!inviteEmail) {
      return;
    }

    const invite = {
      email: inviteEmail
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_BOARDS}/${boardId}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(invite)
      });
            
      const data = await response.json();
      if (response.status == 201) {
        editDialogRef.current?.close();
      } else {
        console.log(data.message);
      }

    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div className="edit-bar">
      <dialog ref={editDialogRef} className="dialog">
        <form className="task-form">
          <h3>Edit Board</h3>
                    
          <input className="form-input" 
            type="text"
            placeholder={boardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />

          <div className="edit-buttons">
            <button type="button" className="edit-buttons-delete"
              onClick={() => deleteBoard()}>
                Delete
            </button>
            <button type="button" className="edit-buttons-save"
              onClick={() => editBoard()}>
                Save
            </button>
            <button type="button" className="edit-buttons-close" 
              onClick={(e) => {
                e.preventDefault();
                editDialogRef.current?.close();
              }}>
                Close
            </button>
          </div>
                
        </form>
      </dialog>

      <dialog ref={inviteDialogRef} className="dialog">
        <form className="task-form">
          <h3>Invite to Board</h3>
                    
          <input className="form-input" 
            type="text"
            placeholder="Email"
            onChange={(e) => setInviteEmail(e.target.value)}
          />

          <div className="invite-buttons">
            <button type="button" className="invite-buttons-invite"
              onClick={() => inviteToBoard()}>
                Invite
            </button>
            <button type="button" className="invite-buttons-close" 
              onClick={(e) => {
                e.preventDefault();
                inviteDialogRef.current?.close();
              }}>
                Close
            </button>
          </div>
                
        </form>
      </dialog>

      <div className="edit-search">
        <FaMagnifyingGlass/>
        <input className="edit-search-field" type="text" placeholder="Search board"/>
      </div>
      <div className="edit-utility-buttons">
        <button>Filter</button>
        <button type="button" onClick={() => inviteDialogRef.current?.showModal()}>Invite</button>
        <button type="button" onClick={() => editDialogRef.current?.showModal()}>Edit</button>
        <button>Export</button>
      </div>
    </div>
  );
}

export default EditBar;