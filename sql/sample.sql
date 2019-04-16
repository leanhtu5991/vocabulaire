
--BOX
INSERT INTO vocabulary.box (`time`,description,name)
VALUES (1,'Level 1: Word appears after 1 days','BOX 1');
INSERT INTO vocabulary.box (`time`,description,name)
VALUES (2,'Level 2: Word appears after 2 days','BOX 2');
INSERT INTO vocabulary.box (`time`,description,name)
VALUES (5,'Level 3: Word appears after 5 days','BOX 3');

--ROLE
INSERT INTO vocabulary.`role` (`role`,description)
VALUES ('ADMIN','Administrator');
INSERT INTO vocabulary.`role` (`role`,description)
VALUES ('USER','User');

--USER
INSERT INTO vocabulary.`user`
(id, email, name, password, birthday, `role`, tel, datesignup, civil)
VALUES(1, 'admin@admin.com', 'Admin', '123456', NULL, 1, '0155224488', NULL, 1);

--WORD
INSERT INTO vocabulary.word
(word, `type`, `translate`, example1, example2, iduser, idbox, validatetime, status)
VALUES('hello', 1, 'bonjour', 'Hello !', 'Hello, how are you ?', 1, 1, NULL, 1);