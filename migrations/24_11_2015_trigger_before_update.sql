CREATE TRIGGER before_articles_update BEFORE UPDATE ON Articles 
FOR EACH ROW
	SET NEW.dt_update = NOW()

CREATE TRIGGER before_comments_update BEFORE UPDATE ON Comments 
FOR EACH ROW
	SET NEW.dt_update = NOW()

CREATE TRIGGER before_users_update BEFORE UPDATE ON Users 
FOR EACH ROW
	SET NEW.dt_update = NOW()