import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <div className="logo">
                <Link to="/">App name</Link>
            </div>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;