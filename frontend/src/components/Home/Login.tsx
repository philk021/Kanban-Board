import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const {login} = useContext(AuthContext);

  function validInput() {
    if (email == null || password == null) {
      return false;
    }
    return true;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!validInput()) {
      setResponseMessage("Email or password invalid.");
      return;
    }
    const user = {
      email: email, 
      password: password
    };
    try {
      const response = await fetch(import.meta.env.VITE_API_URL_LOGIN, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      });
      const data = await response.json();
           
      if (response.status == 200) {
        login(data.message, email);
      } else {
        setResponseMessage(data.message);
      }
        
    } catch (err: any) {
      console.log(err);
      setResponseMessage(err);
    }
  }

  return (
    <main>
      <form className="login-form" onSubmit={handleSubmit}>
        <p>Welcome back</p>

        <div className="form-control">
          <input 
            className="form-input" 
            type="text"
            required 
            placeholder="Email"
            onChange={(e)=>{setEmail(e.target.value);}}/>

          <input 
            className="form-input" 
            type={showPassword ? "text" : "password"}
            required 
            placeholder="Password"
            maxLength={32}
            onChange={(e)=>{setPassword(e.target.value);}}/>
        </div>
        
        <div className="form-control">
          <label>Show password</label>
          <input
            className="checkbox"
            type="checkbox"
            onChange={()=>setShowPassword(prev => !prev)}/>
        </div>
        <p>{responseMessage}</p>
        <button className="login-form-btn">Login</button>
      </form>
    </main>
  );
}

export default Login;