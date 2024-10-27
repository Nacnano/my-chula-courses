CREATE TABLE organizations(
idx INT,
oid VARCHAR(100),
oname VARCHAR(150),
website VARCHAR(300),
country VARCHAR(100),
description VARCHAR(150),
founded VARCHAR(100),
industry VARCHAR(100),
num_employees INT)

\copy organizations FROM '/hom/organizations-100.csv' DELIMITER ',' CSV HEADER;
