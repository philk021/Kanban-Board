import { Link } from "react-router-dom";
import "./Nav.css";

export function Nav() {
  return (
    <nav>
      <div className="landing-page-logo">
        <Link to="/"><h1>Logo</h1></Link>
      </div>
      <ul>
        <li>
          <Link className="login-btn" to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}