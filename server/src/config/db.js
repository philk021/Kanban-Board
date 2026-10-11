import mysql2 from 'mysql2';

export const db = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
}).promise();

export const getUserId = async (user) => {
  const [result] = await db.query(
    'SELECT * FROM project_management_db.users WHERE user_email = ?', 
  [user]);
  return result[0].user_id;
};