import { Link } from 'react-router-dom';
import './styles/home.css';

function Home() {
  return (
    <main>
      <div>
        <div className="banner">Kanban Board</div>
        <div className="sub-banner">
          Get started in seconds. Signing up is free.
        </div>
        <div>
          <Link className="join-btn" to="/signup">Sign up</Link>
        </div>
      </div>
    </main>
  );
}

export default Home;