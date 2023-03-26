-- Line to create ENUM datatype for the "role" column

CREATE TYPE role AS ENUM ('user', 'admin');

-- Line to create ENUM datatype for the "status" column

CREATE TYPE status AS ENUM ('Pending', 'Processing', 'Completed');



--To drop Table users and users_log if already existing in the database

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_log;


-- Command to create users table

CREATE TABLE users(
   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   firstname VARCHAR(50) NOT NULL,
   middlename VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(255) NOT NULL,
   confirm_password VARCHAR(255) NOT NULL,
);


-- Command to create users_log table

CREATE TABLE users_log(
   user_id INT NOT NULL,
   entry_date TEXT NOT NULL,
   action_performed VARCHAR(20),
   actor_username VARCHAR(50)
);



-- To drop Table users and users_log if already existing in the database

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_log;



-- Command to create todos table

CREATE TABLE todos(
   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   title VARCHAR(50) NOT NULL,
   user_id INT NOT NULL,
   status status NOT NULL,
   description VARCHAR(200) NOT NULL,
   CONSTRAINT fk_user
   	FOREIGN KEY (user_id)
   		REFERNECES users(id)
   
);



-- Command to create todos_log table

CREATE TABLE todos_log(
   user_id INT NOT NULL,
   entry_date TEXT NOT NULL,
   action_performed VARCHAR(20) NOT NULL,
   actor_username VARCHAR(50) NOT NULL
);


-- Command to create function to insert into todos table

CREATE OR REPLACE FUNCTION todoinsert() RETURNS TRIGGER AS $todos_log$
   BEGIN                                      
      INSERT INTO todos_log(user_id, entry_date, action_performed, actor_username) VALUES (new.ID, current_timestamp, 'insert', new.username);
      RETURN NEW;
   END;
$todos_log$ LANGUAGE plpgsql;



-- Command to create trigger to be executed upon INSERT into todos table

CREATE TRIGGER todos_insert_trigger AFTER INSERT ON todos
FOR EACH ROW EXECUTE PROCEDURE todoinsert();




-- Command to create function to update operation on the todos table

CREATE OR REPLACE FUNCTION todoupdate() RETURNS TRIGGER AS $todos_log$
   BEGIN                                      
      INSERT INTO todos_log(user_id, entry_date, action_performed, actor_username) VALUES (new.ID, current_timestamp, 'update', new.username);
      RETURN NEW;
   END;
$todos_log$ LANGUAGE plpgsql;


-- Command to create trigger to be executed upon UPDATE operation on todos table

CREATE TRIGGER todos_update_trigger AFTER UPDATE ON todos
FOR EACH ROW EXECUTE PROCEDURE todoupdate();




-- Command to create function to delete record todos table

CREATE OR REPLACE FUNCTION tododelete() RETURNS TRIGGER AS $todos_log$
   BEGIN                                      
      INSERT INTO todos_log(user_id, entry_date, action_performed, actor_username) VALUES (old.ID, current_timestamp, 'delete', old.username);
      RETURN NEW;
   END;
$todos_log$ LANGUAGE plpgsql;


-- Command to create trigger to be executed upon DELETE operation on todos table

CREATE TRIGGER todos_delete_trigger AFTER DELETE ON todos
FOR EACH ROW EXECUTE PROCEDURE tododelete();






-- Command to create function to insert into users table

CREATE OR REPLACE FUNCTION userinsert() RETURNS TRIGGER AS $users_log$
   BEGIN                                      
      INSERT INTO todos_log(user_id, entry_date, action_performed, actor_username) VALUES (new.ID, current_timestamp, 'insert', new.username);
      RETURN NEW;
   END;
$users_log$ LANGUAGE plpgsql;


-- Command to create trigger to be executed upon INSERT into users table

CREATE TRIGGER users_insert_trigger AFTER INSERT ON users
FOR EACH ROW EXECUTE PROCEDURE userinsert();




-- Command to create function to update operation on the users table

CREATE OR REPLACE FUNCTION userupdate() RETURNS TRIGGER AS $users_log$
   BEGIN                                      
      INSERT INTO users_log(user_id, entry_date, action_performed, actor_username) VALUES (new.ID, current_timestamp, 'update', new.username);
      RETURN NEW;
   END;
$users_log$ LANGUAGE plpgsql;


-- Command to create trigger to be executed upon UPDATE operation on todos table

CREATE TRIGGER users_update_trigger AFTER UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE userupdate();




-- Command to create function to delete record users table

CREATE OR REPLACE FUNCTION userdelete() RETURNS TRIGGER AS $users_log$
   BEGIN                                      
      INSERT INTO users_log(user_id, entry_date, action_performed, actor_username) VALUES (old.ID, current_timestamp, 'delete', old.username);
      RETURN NEW;
   END;
$users_log$ LANGUAGE plpgsql;


-- Command to create trigger to be executed upon DELETE operation on users table

CREATE TRIGGER users_delete_trigger AFTER DELETE ON users
FOR EACH ROW EXECUTE PROCEDURE userdelete();

























