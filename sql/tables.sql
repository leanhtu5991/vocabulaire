CREATE TABLE vocabulary.`user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `birthday` date DEFAULT NULL,
  `role` int(11) NOT NULL,
  `tel` varchar(100) DEFAULT NULL,
  `datesignup` date DEFAULT NULL,
  `civil` int(11) DEFAULT NULL,
   CONSTRAINT user_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE vocabulary.box (
	id int NOT NULL AUTO_INCREMENT,
	`time` date NOT NULL,
	description varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	CONSTRAINT box_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE vocabulary.word (
	id int NOT NULL AUTO_INCREMENT,
	word varchar(100) NOT NULL,
	`type` int NOT NULL,
	`translate` varchar(1000) NOT NULL,
	example1 varchar(1000) NOT NULL,
	example2 varchar(1000) NULL,
	iduser int NOT NULL,
	idbox int NOT NULL,
	validatetime date NULL,
	status int NULL,
	CONSTRAINT word_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE vocabulary.`role` (
	id int NOT NULL AUTO_INCREMENT,
	`role` varchar(100) NOT NULL,
	description varchar(100) NULL,
	CONSTRAINT role_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE vocabulary.`group` (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
	idmanager INT NOT NULL,
	datecreate DATETIME NULL,
	groupsize int NULL,
	status INT NULL,
	CONSTRAINT group_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

--FOREIGN KEY
ALTER TABLE vocabulary.`group` ADD CONSTRAINT group_user_fk FOREIGN KEY (idmanager) REFERENCES vocabulary.`user`(id);
ALTER TABLE vocabulary.word ADD CONSTRAINT word_user_fk FOREIGN KEY (iduser) REFERENCES vocabulary.`user`(id);
ALTER TABLE vocabulary.word ADD CONSTRAINT word_box_fk FOREIGN KEY (idbox) REFERENCES vocabulary.box(id);
ALTER TABLE vocabulary.`user` ADD CONSTRAINT user_role_fk FOREIGN KEY (`role`) REFERENCES vocabulary.`role`(id);