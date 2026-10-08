import { useContext, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBar.css";
import DashboardContext from "../../../../shared/context/DashboardContext";
import { addUserToBoard, deleteBoard, updateBoard } from "../../api/dashboardApi";

export function EditBar() {
  const { boardId } = useParams();
  const { boards, setBoards } = useContext(DashboardContext);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const editDialogRef = useRef<HTMLDialogElement | null>(null);
  const inviteDialogRef = useRef<HTMLDialogElement | null>(null);
  const navigate = useNavigate();
  const boardTitle = boards.find((item) => item.board_id == boardId)?.board_title ?? 'Undefined';

  async function handleEdit() {
    if (!newBoardTitle || newBoardTitle === boardTitle) {
      return;
    }
    try {
      const response = await updateBoard(boardId, newBoardTitle);
      const data = await response.data;
      if (response.status == 200) {
        setBoards(data);
        editDialogRef.current?.close();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  async function handleDelete() {
    try {
      const response = await deleteBoard(boardId);          
      const data = await response.data;
      if (response.status == 200) {
        setBoards(data);
        navigate("/boards");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  async function handleInvite() {
    if (!inviteEmail) {
      return;
    }
    try {
      const response = await addUserToBoard(boardId, inviteEmail);      
      if (response.status == 201) {
        editDialogRef.current?.close();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="edit-bar-wrap">
      <dialog ref={editDialogRef} className="dialog">
        <form className="task-form">
          <h3>Edit board</h3>           
          <input 
            className="form-input" 
            type="text"
            placeholder={boardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
          <div className="edit-buttons">
            <button 
              type="button" 
              className="edit-buttons-delete"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
            <button 
              type="button" 
              className="edit-buttons-save"
              onClick={() => handleEdit()}
            >
              Save
            </button>
            <button 
              type="button" 
              className="edit-buttons-close" 
              onClick={(e) => {
                e.preventDefault();
                editDialogRef.current?.close();
              }}
            >
              Close
            </button>
          </div>   
        </form>
      </dialog>
      <dialog ref={inviteDialogRef} className="dialog">
        <form className="task-form">
          <h3>Invite to board</h3>               
          <input 
            className="form-input" 
            type="text"
            placeholder="Email"
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <div className="invite-buttons">
            <button 
              type="button" 
              className="invite-buttons-invite"
              onClick={() => handleInvite()}
            >
              Invite
            </button>
            <button 
              type="button" 
              className="invite-buttons-close" 
              onClick={(e) => {
                e.preventDefault();
                inviteDialogRef.current?.close();
              }}
            >
              Close
            </button>
          </div>       
        </form>
      </dialog>
      <div className="edit-bar-search-wrap">
        <FaMagnifyingGlass/>
        <input className="edit-bar-search-field" type="text" placeholder="Search board"/>
      </div>
      <div className="edit-bar-buttons-wrap">
        <button>Filter</button>
        <button type="button" onClick={() => inviteDialogRef.current?.showModal()}>Invite</button>
        <button type="button" onClick={() => editDialogRef.current?.showModal()}>Edit</button>
        <button>Export</button>
      </div>
    </div>
  );
}