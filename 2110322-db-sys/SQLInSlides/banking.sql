CREATE TABLE branch (
  branch_name varchar(20) NOT NULL,
  branch_city varchar(45) DEFAULT NULL,
  assets double DEFAULT NULL,
  PRIMARY KEY (branch_name)
);

CREATE TABLE customer (
  customer_name varchar(40) NOT NULL,
  customer_street varchar(45) DEFAULT NULL,
  customer_only varchar(1) DEFAULT NULL,
  PRIMARY KEY (customer_name)
);

CREATE TABLE account (
  account_number varchar(2) NOT NULL,
  branch_name varchar(45) DEFAULT NULL,
  balance double DEFAULT NULL,
  PRIMARY KEY (account_number)
);

CREATE TABLE loan (
  loan_number varchar(2) NOT NULL,
  branch_name varchar(45) DEFAULT NULL,
  amount double DEFAULT NULL,
  PRIMARY KEY (loan_number)
);

CREATE TABLE borrower (
  customer_name varchar(45) NOT NULL,
  loan_number varchar(2) NOT NULL,
  PRIMARY KEY (customer_name, loan_number)
);


CREATE TABLE depositor (
  customer_name varchar(45) NOT NULL,
  account_number varchar(2) NOT NULL,
  PRIMARY KEY (customer_name,account_number)
);
