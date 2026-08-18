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

async function getProjects(user) {
  const id = await getUserId(user);
  const [result] = await db.query("SELECT * FROM project_management_db.boards WHERE user_id = ?", 
    [id]);
  return result;
};

async function createProject(title, user) {
  const id = await getUserId(user);
  const [result] = await db.query("INSERT INTO project_management_db.boards(board_title, user_id) VALUES(?, ?)", 
    [title, id]);
  return result;
};

async function deleteProject(id) {
  await db.query("DELETE FROM project_management_db.tasks WHERE board_id = ?", [id]);
  const [result] = await db.query("DELETE FROM project_management_db.boards WHERE board_id = ?",
    [id]);
  return result;
};

async function updateProject(title, id) {
  const [result] = await db.query("UPDATE project_management_db.project SET project_title = ? WHERE project_id = ?", 
    [id]);
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
  const result = await db.query(
    "INSERT INTO project_management_db.refresh_tokens(token) VALUES(?)", 
    token);
  return result;
}

module.exports = { 
  db,
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  getTasks,
  createTask, 
  updateTask, 
  deleteTask, 
  createUser, 
  loginUser, 
  storeRefreshToken
};