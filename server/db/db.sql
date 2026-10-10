CREATE DATABASE project_management_db;

CREATE TABLE users(
  user_id binary(16) PRIMARY KEY,
  user_email varchar(255) NOT NULL UNIQUE,
  user_password varchar(255) NOT NULL
);

CREATE TABLE refresh_tokens(
  token_id int PRIMARY KEY AUTO_INCREMENT,
  token text NOT NULL
);

CREATE TABLE boards(
  board_id binary(16) PRIMARY KEY,
  board_title varchar(255) NOT NULL,
  user_id binary(16),
  CONSTRAINT fk_users
  FOREIGN KEY (user_id)
  REFERENCES users(user_id)
);

CREATE TABLE tasks(
  task_id binary(16) PRIMARY KEY,
  task_title varchar(255) NOT NULL,
  task_description varchar(255) NOT NULL,
  task_date varchar(64),
  task_category varchar(255),
  task_priority varchar(255),
  board_id binary(16),
  CONSTRAINT fk_boards
  FOREIGN KEY (board_id)
  REFERENCES boards(board_id)
);

CREATE TABLE board_users (
  board_id binary(16) REFERENCES boards(board_id),
  user_id binary(16) REFERENCES users(user_id),
  board_role varchar(255) DEFAULT 'VIEWER',
  PRIMARY KEY (board_id, user_id)
);