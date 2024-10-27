CREATE TABLE boat(
  bid VARCHAR(3) NOT NULL,
  bname VARCHAR(45) DEFAULT NULL,
  color VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (bid)
);

CREATE TABLE sailor (
  sid VARCHAR(2) NOT NULL,
  sname VARCHAR(45) DEFAULT NULL,
  rating INTEGER DEFAULT NULL,
  age NUMERIC(10,2) DEFAULT NULL,
  PRIMARY KEY (sid)
);

CREATE TABLE reserve (
  sid VARCHAR(2) NOT NULL,
  bid VARCHAR(3) NOT NULL,
  day DATE DEFAULT NULL
);


ALTER TABLE reserve ADD confirm boolean;
\d tablename;
ALTER TABLE reserve drop confirm;

ALTER TABLE reserve ADD CONSTRAINT fk_sid FOREIGN KEY (sid) REFERENCES sailor(sid);
ALTER TABLE reserve ADD CONSTRAINT fk_bid FOREIGN KEY (bid) REFERENCES boat(bid);
ALTER TABLE reserve ADD CONSTRAINT pk_reserve PRIMARY KEY (sid, bid);
ALTER TABLE reserve ADD CONSTRAINT uc_combined UNIQUE (sid, bid);
ALTER TABLE sailor ADD PRIMARY KEY (sid);

INSERT INTO sailor VALUES 
('22','Dustin',7,45),
('29','Brutus',1,33),
('31','Lubber',8,55.5),
('32','Andy',8,25.5),
('58','Rusty',10,35),
('64','Horatio',7,35),
('71','Zorba',10,16),
('74','Horatio',9,35),
('85','Art',3,25.5),
('95','Bob',3,63.5);


INSERT INTO boat VALUES 
('101','Interlake','Blue'),
('102','Interlake','Red'),
('103','Clipper','Green'),
('104','Marine','Red');


INSERT INTO reserve VALUES 
('22','101','2010-10-14'),
('22','102','2010-10-14'),
('22','103','2010-08-14'),
('22','104','2010-07-14'),
('31','102','2011-10-14'),
('31','103','2011-06-14'),
('31','104','2011-12-14'),
('64','101','2009-05-14'),
('64','102','2009-08-14'),
('74','103','2009-08-14');


INSERT INTO reserve (sid, bid, day) VALUES (21, 105, '2009-08-14');

SELECT S.sname, S.age
FROM sailor S;


SELECT DISTINCT S.sname, S.age
FROM sailor S;

SELECT S.sname 
FROM sailor S, reserve R
WHERE S.sid = R.sid AND R.bid = 103;

SELECT S.sname 
FROM sailor S, reserve R
WHERE S.sid = R.sid AND R.bid = '103';

SELECT R.sid
FROM boat B, reserve R
WHERE R.bid = B.bid AND B.color = 'Red';

SELECT distinct R.sid
FROM boat B, reserve R
WHERE R.bid = B.bid AND B.color = 'Red';

SELECT S.sname
FROM sailor S, boat B, reserve R
WHERE S.sid = R.sid AND R.bid = B.bid AND B.color = 'Red';

SELECT B.color 
FROM sailor S, reserve R, boat B
WHERE S.sname = 'Lubber' AND S.sid = R.sid AND R.bid = B.bid;

SELECT S.sname
FROM sailor S, reserve R
WHERE S.sid = R.sid;

SELECT DISTINCT S.sname
FROM sailor S, reserve R
WHERE S.sid = R.sid;

SELECT S.sid
FROM sailor S, reserve R
WHERE S.sid = R.sid;

SELECT S.sname, S.age, S.age-1 AS age1, 2*S.age AS age2
FROM sailor S
WHERE S.sname LIKE 'B%';

SELECT S.sname, S.age, S.age-1 AS age1, 2*S.age AS age2
FROM sailor S
WHERE S.sname LIKE 'B_';

SELECT S.sname, S.age, S.age-1 AS age1, 2*S.age AS age2
FROM sailor S
WHERE S.sname LIKE 'B__';

SELECT S.sname, S.age, S.age-1 AS age1, 2*S.age AS age2
FROM sailor S
WHERE S.sname LIKE '%b';

SELECT S.sid,S.sname 
FROM sailor S, boat B, reserve R
WHERE S.sid = R.sid AND R.bid = B.bid AND (B.color = 'Red' OR B.color = 'Green');

SELECT S.sid, S.sname
FROM sailor S, boat B, reserve R
WHERE S.sid = R.sid AND R.bid = B.bid AND 
(B.color = 'Green' AND B.color = 'Red');

SELECT S.sid,S.sname 
FROM sailor S, boat B, reserve R
WHERE s.sid = R.sid AND R.bid = B.bid AND B.color = 'Red'
UNION
SELECT S.sid,S.sname 
FROM sailor S, boat B, reserve R
WHERE s.sid = R.sid AND R.bid = B.bid AND B.color = 'Green';


SELECT S.sid,S.sname 
FROM sailor S, boat B, reserve R
WHERE s.sid = R.sid AND R.bid = B.bid AND B.color = 'Red'
INTERSECT
SELECT S.sid,S.sname 
FROM sailor S, boat B, reserve R
WHERE s.sid = R.sid AND R.bid = B.bid AND B.color = 'Green';

SELECT S.sname 
FROM sailor S, boat B, reserve R
WHERE s.sid = R.sid AND R.bid = B.bid AND B.color = 'Red'
AND S.sid IN
(SELECT S.sid 
FROM sailor S, boat B, reserve R
WHERE s.sid = R.sid AND R.bid = B.bid AND B.color = 'Green');

SELECT S.sname 
FROM sailor S, boat B, reserve R
WHERE s.sid = R.sid AND R.bid = B.bid AND B.color = 'Green'
AND S.sid NOT IN
(SELECT S.sid 
FROM sailor S, boat B, reserve R
WHERE s.sid = R.sid AND R.bid = B.bid AND B.color = 'Red');

SELECT S.sid, S.sname
FROM sailor S, boat B, reserve R
WHERE S.sid = R.sid AND R.bid = B.bid AND B.color = 'Green'
EXCEPT
SELECT S.sid, S.sname
FROM sailor S, boat B, reserve R
WHERE s.sid = R.sid AND R.bid = B.bid AND B.color = 'Red';

====================
SELECT COUNT(*)
FROM sailor S;

SELECT COUNT(DISTINCT S.sname) 
FROM sailor S;

SELECT SUM(S.age) 
FROM sailor S
WHERE S.rating = 10;

SELECT AVG(S.age) 
FROM sailor S
WHERE S.rating = 10;

SELECT ROUND(AVG(S.age),2) 
FROM sailor S
WHERE S.rating = 10;


SELECT S.sname, MAX(S.age)
FROM sailor S;


SELECT S.sname, S.age
FROM sailor S
WHERE S.age = 
(SELECT MAX(S2.age)
 FROM sailor S2);

UPDATE sailor
SET age = 63.5
WHERE sid = '29';

SELECT sid,sname 
FROM sailor 
WHERE age BETWEEN 25 AND 35;

SELECT * 
FROM sailor
WHERE sname NOT BETWEEN 'Hansen' 
AND 'Perttersen';

SELECT * 
FROM sailor
WHERE sname LIKE 'A%';


============
BANKING
============
on PSQL Tools in pgAdmin4 GUI
\i banking.sql;

\copy branch FROM '/home/branch.csv' DELIMITER ',' CSV;

\copy customer FROM '/home/customer.csv' DELIMITER ',' CSV;

\copy account FROM '/home/account.csv' DELIMITER ',' CSV;

\copy loan FROM '/home/loan.csv' DELIMITER ',' CSV;

\copy depositor FROM '/home/depositor.csv' DELIMITER ',' CSV;

\copy borrower FROM '/home/borrower.csv' DELIMITER ',' CSV;


SELECT A.account_number
FROM account A, branch B
WHERE A.branch_name = B.branch_name AND 
B.branch_city = 'Riverside';

or

SELECT account_number 
FROM account  
WHERE branch_name IN
    (SELECT branch_name 
    FROM branch
    WHERE branch_city = 'Riverside');

SELECT account_number
  FROM account A
  WHERE 'Riverside' IN
	(SELECT branch_city
        FROM branch B
        WHERE A.branch_name = B.branch_name);

SELECT account_number
FROM account
WHERE branch_name IN ('A','B');

SELECT A.account_number
FROM account A
WHERE EXISTS (SELECT *
    FROM branch B
    WHERE B.branch_city = 'Riverside'
    AND B.branch_name = A.branch_name);


SELECT A.account_number
FROM account A 
WHERE NOT EXISTS (SELECT * 
    FROM branch B
    WHERE B.branch_city = 'Riverside'
    AND B.branch_name = A.branch_name);

SELECT account
FROM account 
WHERE balance <= ALL(SELECT
    balance from account);


SELECT balance
FROM account 
WHERE balance <= ALL(SELECT
    balance from account);

SELECT balance
FROM account 
WHERE branch_name = ANY(SELECT B.branch_name
    FROM branch B
    WHERE branch_city = 'Riverside');


SELECT balance
FROM account
WHERE branch_name = SOME(SELECT B.branch_name
    FROM branch B
    WHERE branch_city = 'Riverside');


SELECT SUM(A.balance) AS total_amount
FROM account A, branch B
WHERE B.branch_city = 'Riverside' AND
    A.branch_name = B.branch_name;

SELECT COUNT(*) 
FROM account;

SELECT branch_name, SUM(balance)
FROM account
GROUP BY branch_name;


SELECT account_number, branch_name, SUM(balance)
FROM account
GROUP BY branch_name;
    

SELECT C.customer_name, SUM(A.balance)
FROM customer C, account A, depositor D
WHERE C.customer_name = D.customer_name AND
  D.account_number = A.account_number
GROUP BY C.customer_name;


SELECT C.customer_name, SUM(A.balance) AS sum_balance
FROM customer C, account A, depositor D
WHERE C.customer_name = D.customer_name AND
  D.account_number = A.account_number
GROUP BY C.customer_name
HAVING SUM(A.balance) > 100;


SELECT C.customer_name, SUM(A.balance) as sum_balance
FROM customer C, account A, depositor D
WHERE C.customer_name = D.customer_name AND
  D.account_number = A.account_number
GROUP BY C.customer_name
HAVING count(C.customer_name) > 1;

SELECT C.customer_name, SUM(A.balance) as sum_balance
FROM customer C, account A, depositor D
WHERE C.customer_name = D.customer_name AND
  D.account_number = A.account_number
GROUP BY C.customer_name
HAVING count(*) > 1;

SELECT C.customer_name, SUM(A.balance) as sum_balance
FROM customer C, account A, depositor D
WHERE C.customer_name = D.customer_name AND
  D.account_number = A.account_number
GROUP BY C.customer_name
HAVING count(C.customer_name) > 1
ORDER BY sum_balance DESC;

INSERT INTO account (account_number, branch_name, balance) VALUES (‘7', ‘X', '222');


SELECT * 
FROM account A JOIN branch B 
ON A.branch_name = B.branch_name;

SELECT * 
FROM account A, branch B
WHERE A.branch_name = B.branch_name;

SELECT *
FROM account NATURAL JOIN branch;


SELECT *
FROM account A LEFT OUTER JOIN branch B
ON A.branch_name = B.branch_name;

SELECT *
FROM account A LEFT JOIN branch B
ON A.branch_name = B.branch_name;

SELECT *
FROM account A LEFT JOIN branch B
ON A.branch_name = B.branch_name
WHERE B.branch_name is NULL;

SELECT *
FROM account A RIGHT JOIN branch B
ON A.branch_name = B.branch_name;

SELECT *
FROM account A RIGHT OUTER JOIN branch B
ON A.branch_name = B.branch_name;


SELECT *
FROM account A FULL OUTER JOIN branch B
ON A.branch_name = B.branch_name;


SELECT *
FROM account A LEFT JOIN branch B
ON A.branch_name = B.branch_name
UNION
SELECT *
FROM account A RIGHT JOIN branch B
ON A.branch_name = B.branch_name;

#===================
# auto-increment
#===================
CREATE TABLE PERSON(
  pid SERIAL PRIMARY KEY,
  pfname VARCHAR(45) DEFAULT NULL,
  plname VARCHAR(45) DEFAULT NULL
);

INSERT INTO PERSON(pfname, plname) VALUES('Padit', 'Jaidee');
INSERT INTO PERSON(pfname, plname) VALUES('Manee', 'Rakthai');

#=====================================
# auto-increment with starting value
#=====================================
-- Create a custom sequence
CREATE SEQUENCE order_number_seq START 1000;
-- Create the "orders" table with the custom sequence
CREATE TABLE orders (
  order_number INTEGER DEFAULT nextval('order_number_seq') PRIMARY KEY,
  customer_name VARCHAR(50),
  total_amount DECIMAL(10, 2)
);

INSERT INTO orders(customer_name, total_amount) VALUES('Prateep', 100.5);
INSERT INTO orders(customer_name, total_amount) VALUES('Sangtong', 25.8);

SELECT * FROM orders;
