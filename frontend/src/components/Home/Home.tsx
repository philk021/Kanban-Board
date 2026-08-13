import { Link } from 'react-router-dom';
import './styles/home.css';

function Home() {
    return (
        <main>
            <div>
                <div className="banner">Free No-Signup Kanban Board</div>
                <div className="sub-banner">
                    Get started in seconds. Signing up is free and optional, if you want to save your progress.
                </div>
                <div>
                    <Link className="join-btn" to="/">Create a board</Link>
                </div>
            </div>
        </main>
    )
}

export default Home;