CREATE TRIGGER before_users_update BEFORE UPDATE ON Users 
FOR EACH ROW
	SET NEW.dt_update = NOW()
	