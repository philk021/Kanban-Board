import "./styles/boardcard.css";

function BoardCard({title} : {title: string}) {
  return (
    <div className="board-card">
      {title ? <h1>{title}</h1> : <h1>Untitled</h1>}
    </div>
  );
}

export default BoardCard;