import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <div className="landing-page-logo">
                <Link to="/"><h1>App name</h1></Link>
            </div>
            <ul>
                <li><Link className="login-btn" to="/login">Login</Link></li>
                <li><Link className="join-btn" to="/signup">Sign up</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;