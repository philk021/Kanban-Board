import "./styles/boardcard.css";

function BoardCard({title, role} : {title: string, role: string}) {
  return (
    <div className="board-card">
      {title && role ? 
      <div>
        <h1>{title}</h1>
        <h2>{role}</h2>
      </div> : 
      <h1>Untitled</h1>}
    </div>
  );
}

export default BoardCard;