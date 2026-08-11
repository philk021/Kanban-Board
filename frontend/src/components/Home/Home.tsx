import { Link } from "react-router-dom";
import './styles/home.css';

function Home() {
    return (
        <main>
            {}
            <div>
                <div className="banner">A project management platform</div>
                <br/>
                <div className="sub-banner">
                    Create collaborative kanban boards to track project progress
                </div>
                <br/>
                <br/>
                <Link className="join-btn" to="/signup">Sign up for free</Link>
                <Link className="login-btn" to="/login">Login</Link>
            </div>
        </main>
    )
}

export default Home;