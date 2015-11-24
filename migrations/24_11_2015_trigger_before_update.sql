CREATE TRIGGER before_articles_update BEFORE UPDATE ON Articles 
FOR EACH ROW
	SET NEW.dt_update = NOW()
