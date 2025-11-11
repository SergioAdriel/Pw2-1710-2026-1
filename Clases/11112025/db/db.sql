CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
);
INSERT INTO users (name, email) VALUES
('Ana Gomez', 'ana.gomez@example.com'),
('Bruno Perez', 'bruno.perez@example.com'),
('Carla Martinez', 'carla.martinez@example.com'),
('Diego Torres', 'diego.torres@example.com'),
('Elena Rodriguez', 'elena.rodriguez@example.com'),
('Fabian Lopez', 'fabian.lopez@example.com'),
('Gabriela Sanchez', 'gabriela.sanchez@example.com'),
('Hector Ruiz', 'hector.ruiz@example.com'),
('Iris Morales', 'iris.morales@example.com'),
('Javier Alvarez', 'javier.alvarez@example.com');

