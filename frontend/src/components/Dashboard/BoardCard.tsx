import "./styles/boardcard.css";

function BoardCard({title, role} : {title: string, role: string}) {
  return (
    <div className="board-card">
      {title && role ? 
      <div className="board-card-info">
        <h1 className="board-card-title">{title}</h1>
        <h2 className="board-card-role">{role}</h2>
      </div> : 
      <h1>Untitled</h1>}
    </div>
  );
}

export default BoardCard;