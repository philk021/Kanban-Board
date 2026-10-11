import { loginUser, createUser, storeRefreshToken } from '../services/authService.js';
import { EMAIL_FORMAT } from '../constants.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  let user = [];
  
  if (!email || !password) res.status(500).json({ message: 'Missing email or password' });
  if (!EMAIL_FORMAT.test(email)) res.status(500).json({ message: "Invalid email" });
  
  try {
    user = await loginUser(email);
    if (!user[0]) return res.status(400).json({ message: 'Incorrect email or password' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };

  try {
    if (await bcrypt.compare(password, user[0].user_password)) {
      const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
      const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
      await storeRefreshToken(refreshToken);      
      res.cookie('refresh-token', refreshToken, { httpOnly: true }, { maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({ message: accessToken });
    } else res.status(400).json({ message: 'Incorrect email or password' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};

export const signup = async (req, res) => {
  const { email, password } = req.body;
  let user = [];
    
  if (!email || !password) res.status(500).json({ message: 'Invalid email or password' });
  if (!EMAIL_FORMAT.test(email)) res.status(500).json({ message: 'Invalid email' });
  
  try {
    user = await loginUser(email);
    if (user[0]) return res.status(400).json({ message: 'Email already in use' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(email, hashedPassword);
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }); 
    await storeRefreshToken(refreshToken);   
    res.cookie('refresh-token', refreshToken, { httpOnly: true }, { maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  };
};

export const refresh = (req, res) => {
};