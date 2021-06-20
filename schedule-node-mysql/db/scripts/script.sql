/* CREATE */

CREATE DATABASE schedulePetshop;

-- SHOW DATABASES;

USE schedulePetshop;

CREATE TABLE IF NOT EXIST attendance (
  id int NOT NULL AUTO_INCREMENT, 
  client VARCHAR(50) NOT NULL, 
  pet VARCHAR(20), service VARCHAR(20) NOT NULL, 
  status VARCHAR(20) NOT NULL, 
  comments text, 
  PRIMARY KEY(id)
);



