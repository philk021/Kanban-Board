const mysql2 = require('mysql2');

let db = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
}).promise();

async function getUserId(user) {
  const [result] = await db.query("SELECT * FROM project_management_db.users WHERE user_email = ?", 
    [user]);
  return result[0].user_id;
}

async function getBoardId(id) {
  const [result] = await db.query("SELECT * FROM project_management_db.boards WHERE board_id = ?", 
    [id]);
  return result[0].board_id;
}

async function createBoard(title, user, board_role) {
  const user_id = await getUserId(user);
  const [create_board_result] = await db.query("INSERT INTO project_management_db.boards(board_title, user_id) VALUES(?, ?)", 
    [title, user_id]);
  const board_id = create_board_result.insertId;
  const create_board_user_result = await createBoardUser(user_id, board_id, board_role);
  return create_board_user_result;
};

async function deleteBoard(id) {
  await db.query("DELETE FROM project_management_db.tasks WHERE board_id = ?", [id]);
  const [result] = await db.query("DELETE FROM project_management_db.boards WHERE board_id = ?",
    [id]);
  return result;
};

async function updateBoard(title, id) {
  const [result] = await db.query("UPDATE project_management_db.boards SET board_title = ? WHERE board_id = ?",
    [title, id]);
  return result;
};

async function getTasks(board_id) {
  const id = await getBoardId(board_id);
  const [result] = await db.query("SELECT * FROM project_management_db.tasks WHERE board_id = ?", 
    [id]);
  return result;
};

async function createTask(board_id, title, description, category, priority, date) {
  const [result] = await db.query(
    "INSERT INTO project_management_db.tasks(task_title, task_description, task_date, task_category, \
    task_priority, board_id) VALUES(?, ?, ?, ?, ?, ?)",
    [title, description, date, category, priority, board_id]);
  return result;
};

async function updateTask(id, name, description, date) {
  await db.query(
    "UPDATE project_management_db.tasks SET task_title = ?, task_description = ?, task_date = ? WHERE task_id = ?",
    [name, description, date, id]
  );
};

async function deleteTask(id) {
  await db.query("DELETE FROM project_management_db.tasks WHERE task_id = ?", 
    [id]);
};

async function createUser(email, password) {
  const [result] = await db.query(
    "INSERT INTO project_management_db.users(user_email, user_password) VALUES(?, ?)",
    [email, password]);
  return result;
};

async function loginUser(email) {
  const [result] = await db.query(
    "SELECT user_email, user_password FROM project_management_db.users WHERE user_email = ?",
    [email]);
  return result;
};

async function storeRefreshToken(token) {
  const [result] = await db.query(
    "INSERT INTO project_management_db.refresh_tokens(token) VALUES(?)", 
    token);
  return result;
}

async function createBoardUser(user_id, board_id, board_role) {
  const [result] = await db.query("INSERT INTO project_management_db.board_users (board_id, user_id, board_role) VALUES (?, ?, ?)",
    [board_id, user_id, board_role]);
  return result;
}

async function getBoards(user) {
  const user_id = await getUserId(user);
  const [result] = await db.query("SELECT b.board_id, b.board_title, bu.board_role \
                                 FROM project_management_db.boards b \
                                 JOIN project_management_db.board_users bu ON bu.board_id = b.board_id \
                                 WHERE bu.user_id = ?", 
                                [user_id]);
  return result;
}

module.exports = {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
  createBoardUser,
  getUserId,
  getTasks,
  createTask, 
  updateTask, 
  deleteTask, 
  createUser, 
  loginUser, 
  storeRefreshToken
};