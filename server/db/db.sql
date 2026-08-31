CREATE DATABASE project_management_db;

CREATE TABLE users(
  user_id int PRIMARY KEY AUTO_INCREMENT,
  user_email varchar(255) NOT NULL UNIQUE,
  user_password varchar(255) NOT NULL
);

CREATE TABLE refresh_tokens(
  token_id int PRIMARY KEY AUTO_INCREMENT,
  token text NOT NULL
);

CREATE TABLE boards(
  board_id int PRIMARY KEY AUTO_INCREMENT,
  board_title varchar(255) NOT NULL,
  user_id int,
  CONSTRAINT fk_users
  FOREIGN KEY (user_id)
  REFERENCES users(user_id)
);

CREATE TABLE tasks(
  task_id int PRIMARY KEY AUTO_INCREMENT,
  task_title varchar(255) NOT NULL,
  task_description varchar(255) NOT NULL,
  task_date varchar(64),
  task_category varchar(255),
  task_priority varchar(255),
  board_id int,
  CONSTRAINT fk_boards
  FOREIGN KEY (board_id)
  REFERENCES boards(board_id)
);

CREATE TABLE board_users (
  board_id int REFERENCES boards(board_id),
  user_id int REFERENCES users(user_id),
  board_role varchar(255) DEFAULT 'VIEWER',
  PRIMARY KEY (board_id, user_id)
);