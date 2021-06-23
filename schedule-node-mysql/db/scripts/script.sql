CREATE DATABASE schedulePetshop;

-- SHOW DATABASES;

USE schedulePetshop;

CREATE TABLE IF NOT EXISTS attendance (
  id int NOT NULL AUTO_INCREMENT, 
  client VARCHAR(50) NOT NULL, 
  pet VARCHAR(20), service VARCHAR(20) NOT NULL, 
  status VARCHAR(20) NOT NULL, 
  attendanceDate DATETIME NOT NULL,
  createdDate DATETIME NOT NULL,
  comments text, 
  PRIMARY KEY(id)
);

-- ALTER TABLE attendance 
--   ADD attendanceDate DATETIME NOT NULL, 
--   ADD createdDate DATETIME NOT NULL;



