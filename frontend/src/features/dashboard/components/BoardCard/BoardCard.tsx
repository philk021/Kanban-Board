import "./BoardCard.css"

export function BoardCard({ title, role } : { title: string, role: string }) {
  return (
    <div className="board-card">
        <div className="board-card-info">
          <h1 className="board-card-title">{title ?? 'Untitled'}</h1>
          <h2 className="board-card-role">{role}</h2>
        </div>
    </div>
  );
}