CREATE DATABASE IF NOT EXISTS my_database
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE my_database;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birthday DATE NULL
);

INSERT INTO users (name, email, password, birthday) VALUES
('Ana Gomez', 'ana.gomez@example.com', '123456', '1995-02-14'),
('Bruno Perez', 'bruno.perez@example.com', '123456', '1993-07-30'),
('Carla Martinez', 'carla.martinez@example.com', '123456', '1998-11-20'),
('Diego Torres', 'diego.torres@example.com', '123456', '2000-04-05'),
('Elena Rodriguez', 'elena.rodriguez@example.com', '123456', '1997-03-12'),
('Fabian Lopez', 'fabian.lopez@example.com', '123456', '1994-10-01'),
('Gabriela Sanchez', 'gabriela.sanchez@example.com', '123456', '1999-08-22'),
('Hector Ruiz', 'hector.ruiz@example.com', '123456', '1992-06-18'),
('Iris Morales', 'iris.morales@example.com', '123456', '1996-12-11'),
('Javier Alvarez', 'javier.alvarez@example.com', '123456', '1995-09-08');
