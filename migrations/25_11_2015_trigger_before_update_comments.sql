CREATE TRIGGER before_comments_update BEFORE UPDATE ON Comments 
FOR EACH ROW
	SET NEW.dt_update = NOW()
	