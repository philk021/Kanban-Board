import { Link } from "react-router-dom";
import "../../styles/home.css";

export function HomePage() {
  return (
    <main>
      <div className="home-page-wrap">
        <div className="home-page-banner">Kanban Board</div>
        <div className="home-page-sub-banner">
          Get started in seconds. Signing up is free.
        </div>
        <div>
          <Link className="join-btn" to="/signup">Sign up</Link>
        </div>
      </div>
    </main>
  );
}