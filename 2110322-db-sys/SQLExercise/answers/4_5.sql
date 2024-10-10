-- 4.5 Show the customer ID, customer name, and the number of orders placed by each customer, sorted by the number of orders from highest to lowest.
SELECT C.CUSTOMER_ID, C.CUSTOMER_NAME, COUNT(O.ORDER_ID) AS order_count
FROM CUSTOMER C
JOIN ORDERT O ON C.CUSTOMER_ID = O.CUSTOMER_ID
GROUP BY C.CUSTOMER_ID, C.CUSTOMER_NAME
ORDER BY order_count DESC;
