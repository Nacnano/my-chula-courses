-- 4.12 Show the number of orders that occurred between January 10, 2020, and January 15, 2020.
SELECT COUNT(*) AS order_count
FROM ORDERT
WHERE ORDER_DATE BETWEEN '2020-01-09' AND '2020-01-16';
