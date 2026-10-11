CREATE DATABASE kanban_db;

CREATE TABLE users(
  user_id BINARY(16) PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(64) NOT NULL,
  created_at VARCHAR(64) NOT NULL
);

CREATE TABLE refresh_tokens(
  token_id INT PRIMARY KEY AUTO_INCREMENT,
  token TEXT NOT NULL
);

CREATE TABLE boards(
  board_id BINARY(16) PRIMARY KEY,
  board_title VARCHAR(255) NOT NULL,
  user_id BINARY(16),
  CONSTRAINT fk_users
  FOREIGN KEY (user_id)
  REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE categories(
  category_id BINARY(16) PRIMARY KEY,
  category_title VARCHAR(255) NOT NULL,
  board_id BINARY(16),
  CONSTRAINT fk_boards 
  FOREIGN KEY (board_id) 
  REFERENCES boards(board_id) ON DELETE CASCADE
);

CREATE TABLE tasks(
  task_id BINARY(16) PRIMARY KEY,
  task_title VARCHAR(255) NOT NULL,
  task_description VARCHAR(255) NOT NULL,
  task_category VARCHAR(255),
  task_priority VARCHAR(255),
  created_at VARCHAR(64),
  category_id BINARY(16),
  CONSTRAINT fk_categories
  FOREIGN KEY (category_id)
  REFERENCES categories(category_id) ON DELETE CASCADE
);

CREATE TABLE board_users (
  board_id BINARY(16) REFERENCES boards(board_id) ON DELETE CASCADE,
  user_id BINARY(16) REFERENCES users(user_id) ON DELETE CASCADE,
  board_role VARCHAR(255) DEFAULT 'VIEWER',
  PRIMARY KEY (board_id, user_id)
);