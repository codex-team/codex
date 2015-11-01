CREATE TABLE roles
(
  id serial NOT NULL,
  "name" varchar(32) NOT NULL,
  description text NOT NULL,
  CONSTRAINT roles_id_pkey PRIMARY KEY (id),
  CONSTRAINT roles_name_key UNIQUE (name)
);

CREATE TABLE roles_users
(
  user_id integer,
  role_id integer
);

CREATE TABLE users
(
  id serial NOT NULL,
  "name" varchar(254) NOT NULL,
  username varchar(254) NOT NULL,
  "password" varchar(64) NOT NULL,
  logins integer NOT NULL DEFAULT 0,
  last_login integer,
  register_date timestamp,
  fb_id varchar(254),
  vk_id varchar(254),
  od_id varchar(254),
  city varchar(254),
  email varchar(254),
  mail_comfirm integer,
  CONSTRAINT users_id_pkey PRIMARY KEY (id),
  CONSTRAINT users_logins_check CHECK (logins >= 0)
);

CREATE TABLE user_tokens
(
  id serial,
  user_id integer NOT NULL,
  user_agent varchar(64) NOT NULL,
  token character varying(64) NOT NULL,
  created integer NOT NULL,
  expires integer NOT NULL,
  CONSTRAINT user_tokens_id_pkey PRIMARY KEY (id),
  CONSTRAINT user_tokens_token_key UNIQUE (token)
);

CREATE INDEX user_id_idx ON roles_users (user_id);
CREATE INDEX role_id_idx ON roles_users (role_id);

ALTER TABLE roles_users
  ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  ADD CONSTRAINT role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE;

ALTER TABLE user_tokens
  ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

INSERT INTO roles (name, description) VALUES ('login', 'Login privileges, granted after account confirmation');
INSERT INTO roles (name, description) VALUES ('admin', 'Administrative user, has access to everything.');
