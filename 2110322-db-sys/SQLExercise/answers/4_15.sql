-- 4.15 Delete all records of customer_id 10001 from the customer table and all related data of customer 10001 from all related tables. Then select * from the customer, order, and order_line tables to display.
DELETE FROM ORDER_LINE WHERE ORDER_ID IN (SELECT ORDER_ID FROM ORDERT WHERE CUSTOMER_ID = 10001);
DELETE FROM ORDERT WHERE CUSTOMER_ID = 10001;
DELETE FROM CUSTOMER WHERE CUSTOMER_ID = 10001;

SELECT * FROM CUSTOMER;
SELECT * FROM ORDERT;
SELECT * FROM ORDER_LINE;
