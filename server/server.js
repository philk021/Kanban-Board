require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/authRoutes');
const boardRouter = require('./routes/boardRoutes');
const {authenticateToken} = require('./middleware/auth');

app.use(cors({
  origin: process.env.API_URL,
  credentials: true
}));

app.use(express.json());
app.use('/auth', authRouter);
app.use(authenticateToken);
app.use('/boards', boardRouter);

app.use((req, res, next) => {
  res.status(404).json({message: "404 Error: Resource not Found."});
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});