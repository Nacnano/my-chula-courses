-- 4.1 Show the number of customers grouped by postal_code, sorted by the number of customers from highest to lowest.
SELECT POSTAL_CODE, COUNT(*) AS customer_count
FROM CUSTOMER
GROUP BY POSTAL_CODE
ORDER BY customer_count DESC;
