import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const {login} = useContext(AuthContext);

  function validInput() {
    if (password !== confirmPassword || email == null 
            || password == null || confirmPassword == null) {
      return false;
    }
    if (!emailRegex.test(email)) {
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
      const response = await fetch(import.meta.env.VITE_API_URL_SIGNUP, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      });
      const data = await response.json();

      if (response.status == 201) {
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
        <p>Sign up today</p>

        <div className="form-control">
          <input 
            className="form-input" 
            type="text"
            required 
            placeholder="Email"
            maxLength={255}
            onChange={(e)=>{setEmail(e.target.value);}}/>

          <input 
            className="form-input" 
            type={showPassword ? "text" : "password"}
            required 
            placeholder="Password"
            maxLength={32}
            onChange={(e)=>{setPassword(e.target.value);}}/>

          <input 
            className="form-input" 
            type={showPassword ? "text" : "password"}
            required 
            placeholder="Confirm password"
            maxLength={32}
            onChange={(e)=>{setConfirmPassword(e.target.value);}}/>
        </div>
        
        <div className="form-control">
          <label>Show password</label>
          <input 
            className="checkbox"
            type="checkbox"
            onChange={()=>setShowPassword(prev => !prev)}/>
        </div>
        <p>{responseMessage}</p>
        <button className="login-form-btn">Sign up</button>
      </form>
    </main>
  );
}

export default Signup;