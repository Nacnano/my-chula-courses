-- 4.8 Show the names of the customers with the top 3 highest number of orders and the total number of orders they have.
SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, COUNT(O.ORDER_ID) AS order_count
FROM CUSTOMER C
JOIN ORDERT O ON C.CUSTOMER_ID = O.CUSTOMER_ID
GROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME
ORDER BY order_count DESC
LIMIT 3;
