-- 4.9 Show the IDs and names of customers (without duplicates) who have placed orders from January 10, 2020, to January 15, 2020.
SELECT DISTINCT C.CUSTOMER_ID, C.CUSTOMER_NAME
FROM CUSTOMER C
JOIN ORDERT O ON C.CUSTOMER_ID = O.CUSTOMER_ID
WHERE O.ORDER_DATE BETWEEN '2020-01-10' AND '2020-01-15';
